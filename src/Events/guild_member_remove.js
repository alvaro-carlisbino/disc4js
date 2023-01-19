const Member = require("../Structures/Member.js");

module.exports = class GuildMemberRemove {
  constructor(d, client) {
    const guild = client.guilds.find((g) => g.id == d.guild_id);
    const member = guild.members.find((m) => m.user.id == d.user.id);
    guild.members.slice(guild.members.indexOf(member), 1);
    client.emit("memberGuildRemove", member);
  }
};
