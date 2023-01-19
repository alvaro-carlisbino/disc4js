const ClientUser = require("../Structures/ClientUser.js");
const Guild = require("../Structures/Guild.js");
const Member = require("../Structures/Member.js");

module.exports = class Ready {
  constructor(d, client) {
    client.setUser(new ClientUser(d.user));
    client.emit("ready", null);
  }
};
