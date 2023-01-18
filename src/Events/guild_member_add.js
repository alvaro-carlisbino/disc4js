const Member = require("../Structures/Member.js")

module.exports = class GuildMemberAdd{
    constructor(d, client) {
        const member = new Member(d, client, client.guilds.find((g) => g.id == d.guild_id))
        client.guilds.find((g) => g.id == d.guild_id).pushMember(member);
        client.emit("memberGuildAdd", member)
    }
}