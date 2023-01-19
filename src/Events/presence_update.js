const ClientUser = require("../Structures/ClientUser.js");
const Guild = require("../Structures/Guild.js");
const Member = require("../Structures/Member.js");
const Presence = require("../Structures/Presence.js");

module.exports = class PresenceUpdate {
  constructor(d, client) {
    const user = client.users.find((u) => u.id == d.user.id);
    if (user) {
      user.setPresence(new Presence(d));
      client.emit("presenceUpdate", user);
    }
  }
};
