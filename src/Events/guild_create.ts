import Guild from '../Structures/Guild';

export default class GuildCreate {
  constructor(d, client) {
    const guild = new Guild(d, client);
    client.guilds.push(guild);
    client.emit('guildCreate', guild);
  }
}
