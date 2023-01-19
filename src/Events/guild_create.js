const Guild = require("../Structures/Guild.js");

module.exports = class GuildCreate {
  constructor(d, client) {
    const guild = new Guild(d, client);
    client.guilds.push(guild);
    client.emit("guildCreate", guild);
  }
};
