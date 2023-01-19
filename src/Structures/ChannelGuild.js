const { Invite } = require('../../index');
const Message = require('./MessageClass');

module.exports = class Channel {
  constructor(d, client, guild) {
    this.version = d.version;
    this.type = d.type;
    this.position = d.position;
    this.permissions = d.permission_overwrites;
    this.parent = client.channels.find((c) => c.id == d.parent_id) || d.parent_id;
    this.nsfw = d.nsfw;
    this.name = d.name;
    this.id = d.id;
    this.lastMessage = d.last_message_id;
    this._client = client;
    if (d.guild_id) {
      this._guild = client.guilds.find((g) => g.id == d.guild_id);
    } else if (guild) {
      this._guild = guild;
    }
    this.messages = [];
  }

  async sendMessage(content) {
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid content. Content must be a valid object.');
    }
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/messages`, content);
      resolve(new Message(response, this._client));
    });
  }

  async delete() {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('DELETE', `channels/${this.id}`);
      if (response.status == 204) {
        return resolve(true);
      }
      return resolve(response);
    });
  }

  async bulkDelete(number) {
    if (!number || typeof number !== 'number') throw new Error('Invalid number');
    if (number < 2) throw new Error('Delete more than 2 mensages');
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/messages/bulk-delete`, {
        messages: this.messages.slice(0, number).map((m) => m.id),
      });
      if (response.status == 204) {
        return resolve(true);
      }
      return resolve(response);
    });
  }

  async createInvite(invite) {
    if (!invite || typeof invite !== 'object') throw new Error('Invalid invite');
    return new Promies(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/invites`, invite);
      return resolve(new Invite(response) || response);
    });
  }

  async startTyping() {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/typing`);
      if (response.status) {
        return resolve(true);
      }
      return resolve(response);
    });
  }

  async startThread(options) {
    if (!options || typeof options !== 'object') throw new Error('Invalid options');
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.channel.id}/messages/${this.id}/threads`, options);
      return resolve(new Channel(response, this._client, this.guild));
    });
  }
};
