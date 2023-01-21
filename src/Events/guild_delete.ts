import Guild from '../Structures/Guild';

export default class GuildDelete {
  constructor(d, client) {
    const guild = client.guilds.find((g) => g.id == d.id);
    client.guilds.splice(client.guilds.indexOf(guild), 1);
    client.emit('guildDelete', guild);
  }
}
