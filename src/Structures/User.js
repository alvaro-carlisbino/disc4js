const ChannelDM = require("./ChannelDM.js")

module.exports = class User {
    constructor(d, client) {
        this.username = d.username || client.users.find((u) => u.id == d.id).username || "";
        this.id = d.id;
        this.bot = d.bot
        if(this.id == client.user.id){
            this.bot = true;
        }
        this.avatar = d.avatar;
        this.discriminator = d.discriminator;
        this.tag = this.username+"#"+this.discriminator;
        this.publicFlags = d.public_flags;
        this._client = client;
    }

    setPresence(presence){
        this.presence = presence;
    }


    async createDM(){
        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest(`POST`, `users/@me/channels`,{
                recipient_id: this.id
            })
            const channel = new ChannelDM(response)
            this._client.dmchannels.push(channel)
            return resolve( channel || response)
        })
    }

}