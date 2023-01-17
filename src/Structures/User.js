module.exports = class User{
    constructor(d, client) {
        this.username = d.username || client.users.find((u) => u.id == d.id).username || "";
        this.id = d.id;
        this.bot = d.bot ? d.bot : false;
        this.avatar = d.avatar;
        this.discriminator = d.discriminator;
        this.tag = this.username+"#"+this.discriminator;
        this.publicFlags = d.public_flags;
    }

    setPresence(presence){
        this.presence = presence;
    }
}