const Role = require("./Role.js");
const User = require("./User.js");

module.exports = class Member {
  constructor(d, client, guild) {
    this.nick = d.nick || null;
    this.avatar = d.avatar;
    this.roles = [];
    for (const role of d.roles) {
      this.roles.push(guild.roles.find((r) => r.id == role));
    }
    this.user = new User(d.user, client) || null;
    client.users.push(this.user);
    this.joined_at = d.joined_at;
    this.deaf = d.deaf;
    this.mute = d.mute;
    this.permissions = d.permissions;
    this.voice;
    this._client = client;
    if (guild) {
      this._guild = guild;
    }
  }

  async modifyMember(modifyMember) {
    if (!modifyMember || typeof modifyMember !== "object")
      throw new Error("A modifyMember object is invalid");
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        "PATCH",
        `guilds/${this._guild.id}/members/${this.user.id}`,
        modifyMember
      );
      return resolve(true);
    });
  }
};
