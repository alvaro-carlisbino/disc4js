const WebSocket = require("../ws/WebSocket")
const EventEmitter = require("events")
const RequestHandler = require("../Util/RequestHandler.js")

const User = require("../Structures/UserClass.js")

module.exports = class Client extends EventEmitter{
    constructor(token, options){
        super({})
        this.ws = new WebSocket(token, options.intents, this)
        this.user;
        this.fetch = new RequestHandler(token);
        this.emojis = [];
        this.guilds = [];
        this.channels = [];
        this.users = [];
        this.dmchannels = []
    }

    setUser(user){
        this.user = user;
    }

    putEmoji(emoji){
        this.emojis.push(emoji);
    }

    putGuild(guild){
        this.guilds.push(guild);
    }

    async fetchUser(id){
        if(!id || typeof id !== "string") throw new Error("The id id needed")

        if(!/^[0-9]{17,19}$/.test(id)) throw new Error("This ID is INVALID")

        return new Promise(async (resolve, reject) => {
            const response = await this.fetch.makeRequest(`GET`, `users/${id}`)
            return resolve(new User(response) || response)
        })
    }
}