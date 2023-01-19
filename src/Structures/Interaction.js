module.exports = class Interaction {
  constructor(d, client) {
    this.version = d.version;
    this.type = d.type;
    this.token = d.token;
    if (d.guild_id) {
      this.guild = client.guilds.find((g) => g.id === d.guild_id) || null;
      this.member = this.guild.members.find((m) => m.id === d.member.user.id);
    }
    this.user = client.users.find((u) => u.id === d.user_id) || client.users.find((u) => u.id === d.member.user.id);
    this.id = d.id;
    this.data = d.data;
    this.channel = this.guild.channels.find((c) => c.id === d.channel_id) || client.dmchannels.find((c) => c.id == d.channel_id);
    this.application_id = d.application_id;
    this._client = client;
    if (d.message) {
      if (d.message.components) {
        this.channel.messages.find((m) => m.id === d.message.id).components = d.message.components;
      }
      this.message = this.channel.messages.find((m) => m.id === d.message.id);
    }
  }

  async reply(content) {
    return new Promise(async (resolve, reject) => {
      content = {
        type: 4,
        data: content,
      };
      const response = await this._client.fetch.makeRequest('POSt', `interactions/${this.id}/${this.token}/callback`, content);
      if (response.status == 204) {
        return resolve(true);
      }
      return resolve(response);
    });
  }
};
