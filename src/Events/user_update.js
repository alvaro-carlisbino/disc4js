const ClientUser = require("../Structures/ClientUser");

module.exports = class UserUpdate {
  constructor(d, client) {
    const user = new ClientUser(d);
    client.user = user;
    client.emit("clientUserUpdate", user);
  }
};
