const WebSocket = require("../ws/WebSocket")
const EventEmitter = require("events")
const RequestHandler = require("../Util/RequestHandler.js")
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
}