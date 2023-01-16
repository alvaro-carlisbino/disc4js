module.exports = class RequestHandler {
    constructor(token) {
        this.token = token;
        this.requestQueue = [];
        this.requesting = false;
        this.rateLimit = {
            remaining: 1,
            resetAfter: 0,
        };
    }

    makeRequest(method, endpoint, body) {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({ method, endpoint, body, resolve, reject });
            this.processQueue();
        });
    }

    processQueue() {
        if (!this.requesting && this.requestQueue.length > 0) {
            this.requesting = true;
            const { method, endpoint, body, resolve, reject } = this.requestQueue.shift();
            if (this.rateLimit.remaining > 0) {
                this.sendRequest(method, endpoint, body)
                    .then((response) => {
                        this.requesting = false;
                        resolve(response);
                        this.processQueue();
                    })
                    .catch((error) => {
                        this.requesting = false;
                        reject(error);
                        this.processQueue();
                    });
            } else {
                this.requesting = false;
                const timeUntilReset = this.rateLimit.resetAfter * 1000 - Date.now();
                setTimeout(() => {
                    this.processQueue();
                }, timeUntilReset);
            }
        }
    }

    sendRequest(method, endpoint, body) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${this.token}`,
        };
        const options = { method, headers };
        if (body) {
            options.body = JSON.stringify(body);
        }
        return fetch(`https://discord.com/api/${endpoint}`, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                if(response.headers.get("Content-Type") &&
                    !response.headers.get("Content-Type").includes("application/json")){
                    return response;
                }
                this.rateLimit.remaining = response.headers.get('X-RateLimit-Remaining');
                this.rateLimit.resetAfter = response.headers.get('X-RateLimit-Reset-After');
                return response.json();
            }).catch((error) => {
                console.error(error);
                return error;
            });
    }
}