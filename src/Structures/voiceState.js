module.exports = class voiceState{
    constructor(d, client, member) {
        this.member = member;
        this.session = d.session_id;
        this.supress = d.supress;
        this.self_video = d.self_video;
        this.self_mute = d.self_mute;
        this.self_deaf = d.self_deaf;
        this.mute = d.mute;
        this.guild = client.guilds.find((g) => g.id == d.guild_id)
        this.deaf = d.deaf;
        this.channel = client.channels.find((c) => c.id == d.channel_id)
    }
}