const User = require("./User.js")
const Member = require("./Member.js")
module.exports = class Message{
    constructor(d, client) {
        this.type = d.type;
        this.tts = d.tts;
        this.pinned = d.pinned;
        this.nonce = d.nonce;
        this.mentions = d.mentions;
        this.referenced_message = d.referenced_message;
        this.guildID = d.guild_id;
        this.guild = client.guilds.find((g) => g.id == this.guildID) || client.channels.find((c) => c.id == d.channel_id)._guild || client.guilds.find((g) => g.id == d.message_reference.guild_id)
        this.content = d.content;
        //console.log(d)
        this.user = client.users.find((u) => u.id == d.author ? d.author.id : "0") || new User(d.author, client)
        this.channel = client.channels.find((c) => c.id == d.channel_id)
        this.id = d.id;
        this._client = client;
        this.reactions = [];
        this.components = d.components || [];
        this.attachments = d.attachments || [];
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

    async edit(content) {
        if (!content || typeof content !== 'object') {
            throw new Error('Invalid content. Content must be a valid object.');
        }
        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest("PATCH", `channels/${this.channel.id}/messages/${this.id}`, content);
            if(response.content){
                return resolve(new Message(response, this._client))
            }else {
                throw new Error(response)
            }
        })
    }

    async delete(){
        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest("DELETE", `channels/${this.channel.id}/messages/${this.id}`);
            if(response.status == 204){
                this.channel.messages.slice(this.channel.messages.indexOf(this), 1)
                return resolve(true)
            }else {
                throw new Error(response)
            }
        })
    }
}