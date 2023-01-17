const User = require("./User.js")
const Member = require("./Member.js")
module.exports = class Message{
    constructor(d, client) {
        this.type = d.type;
        this.tts = d.tts;
        this.pinned = d.pinned;
        this.nonce = d.nonce;
        this.mentions = d.mentions;
        this.guildID = d.guild_id;
        this.guild = client.guilds.find((g) => g.id == this.guildID) || client.guilds.find((g) => g.id == d.message_reference.guild_id)
        this.content = d.content;
        this.user = new User(d.author, client)
        this.channel = client.channels.find((c) => c.id == d.channel_id)
        this.id = d.id;
        this._client = client;
        this.member = this.guild.members.find((m) => m.user.id == d.author.id)
    }

    async pin(){
        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest(`PUT`, `channels/${this.channel.id}/pins/${this.id}`)
            if(response.status == 204){
                return resolve(true)
            }else {
                throw new Error(resolve)
            }
        })
    }

    async unPin(){
        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest(`DELETE`, `channels/${this.channel.id}/pins/${this.id}`)
            if(response.status == 204){
                return resolve(true)
            }else {
                throw new Error(resolve)
            }
        })
    }

    async sendMessage(content) {
        if (!content || typeof content !== 'object') {
            throw new Error('Invalid content. Content must be a valid object.');
        }
        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest("PATCH", `channels/${this.id}/messages/${this.id}`, content);
            console.log(response)
        })
    }
}