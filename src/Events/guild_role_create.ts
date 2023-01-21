import Role from '../Structures/Role';

export default class GuildRoleCreate {
  constructor(d, client) {
    const role = new Role(d, client);
    const guild = client.guilds.find((g) => g.id == d.guild_id);
    guild.roles.push(role);
    client.emit('guildRoleCreate', role);
  }
}
