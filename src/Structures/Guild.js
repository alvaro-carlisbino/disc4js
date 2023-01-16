const Emoji = require("./Emoji.js")
const Role = require("./Role.js")
const Member = require("./Member.js")
const Channel = require("./Channel.js")
module.exports = class Guild{
    constructor(d, client) {
        this.id = d.id;
        this.name = d.name;
        this.icon = d.icon;
        this.description = d.description;
        this.splash = d.splash;
        this.owner_id = d.owner_id;
        this.region = d.region;
        this.systemChannelId = d.systemChannelId;
        this.widgetEnabled = d.widget_enabled;
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
            const c = new Channel(channel, client, this)
            client.channels.push(c)
            this.channels.push(c)
        }

        for(const member of d.members){
            const m = new Member(member, client)
            this.members.push(m)
        }
    }

    pushMember(member){
        this.members.push(member);
    }
}