const Role = require("../Structures/Role");
module.exports = class GuildRoleDelete{
    constructor(d, client) {
        const role = new Role(d, client)
        const guild = client.guilds.find((g) => g.id == d.guild_id)
        guild.roles.slice(guild.roles.indexOf(role) || role.id, 1)
        client.emit("guildRoleDelete", role)
    }
}