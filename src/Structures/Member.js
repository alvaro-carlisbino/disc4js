const Role = require("./Role.js")
const User = require("./User.js")
module.exports = class Member{
    constructor(d, client) {
        this.nick = d.nick || null;
        this.avatar = d.avatar
        this.roles = []
        for(const role of d.roles)
        {
            this.roles.push(new Role(role))
        }
        this.user = new User(d.user, client) || null
        client.users.push(this.user)
        this.joined_at = d.joined_at;
        this.deaf = d.deaf;
        this.mute = d.mute;
        this.permissions = d.permissions;
    }

}