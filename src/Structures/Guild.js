const Emoji = require("./Emoji.js")
const Role = require("./Role.js")
const Member = require("./Member.js")
const Channel = require("./Channel.js")
const VoiceChannel = require("./VoiceChannel.js")
module.exports = class Guild{
    constructor(d, client) {
        this.id = d.id;
        this.name = d.name;
        this.icon = d.icon;
        this.description = d.description;
        this.splash = d.splash;
        this.owner_id = d.owner_id;
        this.region = d.region;
        this.systemChannelId = d.system_channel_id;
        this.max_members = d.max_members;
        this.explicitContentFilter = d.explicit_content_filter;
        this.premium_tier = d.premium_tier;
        this.roles = [];
        this.preferredLocale = d.preferred_locale;
        this.rulesChannelId = d.rules_channel_id;
        this.nsfw = d.nsfw;
        this.embed_enabled = d.embed_enabled;
        this.emojis = []
        this.members = []

        this.channels = []
        for(const emoji of d.emojis){
            const e = new Emoji(emoji)
            client.putEmoji(e);
            this.emojis.push(e);
        }

        for(const role of d.roles){
            this.roles.push(new Role(role));
        }

        for(const channel of d.channels){
            if(channel.type != 2) {
                const c = new Channel(channel, client, this)
                client.channels.push(c)
                this.channels.push(c)
            }else {
                const c = new VoiceChannel(channel, client, this)
                client.channels.push(c)
                this.channels.push(c)
            }
        }

        for(const member of d.members){
            const m = new Member(member, client)
            if(m.user && m.user.id == this.owner_id){
                this.owner = m;
            }
            this.members.push(m)
        }
        this.invites = [];
        this._client = client;
    }

    pushMember(member){
        this.members.push(member);
    }

    async banMember(member, options){
        if(!member || typeof member !== "string" && !options || typeof options !== "object") throw new Error("To ban a member specify a ID and specify a options")
        if(options.delete_message_seconds < 0 || options.delete_message_seconds > 604800) throw new Error("Invalid Options")
        if(options.delete_message_days < 0 || options.delete_message_days > 7) throw new Error("Invalid Options");
        const mem = this.members.find((m) => m.user.id == member)
        if(!mem) throw new Error("Invalid ID");
        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest(`PUT`, `guilds/${this.id}/bans/${member}`, options)
            if(response.status == 204){
                this.members.splice(this.members.indexOf(mem), 1)
                return resolve(true);
            }else {
                throw new Error(response)
            }
        })
    }

    async removeBan(id){
        if(!id || typeof id !== "string") throw new Error("The id id needed")

        if(!/^[0-9]{17,19}$/.test(id)) throw new Error("This ID is INVALID")

        return new Promise(async (resolve, reject) => {
            const response = await this._client.fetch.makeRequest("DELETE", `guilds/${this.id}/bans/${id}`, {})
            if(response.status == 204){
                resolve(true)
            }else {
                throw new Error(resolve)
            }
        })
    }
}