module.exports = class VoiceChannel{
    constructor(d, client, guild) {
        this.version = d.version;
        this.type = d.type;
        this.rtc_region = d.rtc_region;
        this.rate_limit_per_user = d.rate_limit_per_user;
        this.position = d.position;
        this.permissions = d.permission_overwrites;
        this.parent = client.channels.find((c) => c.id == d.parent_id) || d.parent_id
        this.nsfw = d.nsfw;
        this.name = d.name;
        this.id = d.id;
        this.flags = d.flags;
        this.bitrate = d.bitrate;
        this.guild = guild;
        this._client = client;
    }

    async join(mute, deaf){
        if(mute && typeof mute !== "boolean" || deaf && typeof deaf !== "boolean") throw new Error(`Invalid mute and deaf`)
        this._client.ws.ws.send(JSON.stringify({
            op: 4,
            d: {
                channel_id: this.id,
                guild_id: this.guild.id,
                self_mute: mute || false,
                self_deaf: deaf || false
            }
        }))
    }
}