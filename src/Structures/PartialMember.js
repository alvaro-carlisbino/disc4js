module.exports = class PartialMember{
    constructor(d, client) {
        this.roles = d.roles ? d.roles : [] || [];
        this.nick = d.nick || null;
        this.mute = d.mute;
        this.joined_at = d.joined_at;
        this.deaf = d.deaf;
    }
}