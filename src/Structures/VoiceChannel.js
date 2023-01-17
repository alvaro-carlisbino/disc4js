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
    }

    async join(){

    }
}