const WebSocket = require("../ws/WebSocket")
const EventEmitter = require("events")
const RequestHandler = require("../Util/RequestHandler.js")

const User = require("../Structures/UserClass.js")
const Guild = require("../Structures/Guild.js")
const Channel = require("../Structures/Channel");
const Invite = require("../Structures/Invite.js")
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
    /**
     * @param {string} id
     */
    async fetchUser(id){
        if(!id || typeof id !== "string") throw new Error("The id id needed")

        if(!/^[0-9]{17,19}$/.test(id)) throw new Error("This ID is INVALID")

        return new Promise(async (resolve, reject) => {
            const response = await this.fetch.makeRequest(`GET`, `users/${id}`)
            return resolve(new User(response, this) || response)
        })
    }
    /**
     * @param {string} id
     */
    async fetchChannel(id){
        if(!id || typeof id !== "string") throw new Error("The id id needed")

        if(!/^[0-9]{17,19}$/.test(id)) throw new Error("This ID is INVALID")

        return new Promise(async (resolve, reject) => {
            const response = await this.fetch.makeRequest(`GET`, `channels/${id}`)
            return resolve(response)
        })
    }

    /**
     * @param {string} id
     */
    async fetchGuild(id){
        if(!id || typeof id !== "string") throw new Error("The id id needed")

        if(!/^[0-9]{17,19}$/.test(id)) throw new Error("This ID is INVALID")

        return new Promise(async (resolve, reject) => {
            const response = await this.fetch.makeRequest(`GET`, `guilds/${id}`)
            return resolve(response)
        })
    }

    async modifyUser(options){
        if(!options || typeof options !== "object" || !options.username) throw new Error(`Options need username or avatar`)

        return new Promise(async (resolve, reject) => {
            const response = await this.fetch.makeRequest(`PATCH`, `users/@me`, options)
            return resolve(response)
        })
    }

    async getInvite(code){
        if(!code || typeof code != "string") throw new Error(`Specify a valid code`)
        return new Promise(async (resolve, reject) => {
            const response = await this.fetch.makeRequest(`GET`, `invites/${code}`)
            return resolve(new Invite(response, this) || response)
        })
    }

    async deleteInvite(code){
        if(!code || typeof code != "string") throw new Error(`Specify a valid code`)
        return new Promise(async (resolve, reject) => {
            const response = await this.fetch.makeRequest(`DELETE`, `invites/${code}`)
            return resolve(new Invite(response, this) || response)
        })
    }
}