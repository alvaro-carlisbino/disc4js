const Invite = require("../Structures/Invite");

module.exports = class InviteDelete {
  constructor(d, client) {
    const invite = client.guilds
      .find((g) => g.id == d.guild_id)
      .invites.find((i) => i.code == d.code);
    client.guilds
      .find((g) => g.id === d.guild_id)
      .invites.slice(
        client.guilds.find((g) => g.id == d.guild_id).invites.indexOf(invite),
        1
      );
    client.emit("inviteDelete", invite);
  }
};
