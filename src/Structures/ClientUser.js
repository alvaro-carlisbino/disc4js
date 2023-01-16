module.exports = class ClientUser{
    constructor(d) {
        this.verified = d.verified;
        this.username = d.username;
        this.id = d.id;
        this.flags = d.flags;
        this.email = d.email;
        this.discriminator = d.discriminator;
        this.tag = this.username + "#" + this.discriminator;
        this.bot = d.bot;
        this.avatar = d.avatar;
    }
}