/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import Client from '../Client/Client';
import Channel from './ChannelGuild';
import User from './UserClass';
import Message from './MessageClass';

export default class MessageDM {
  type: number;
  tts: boolean;
  pinned: boolean;
  nonce: string;
  mentions: string[];
  referenced_message: string;
  content: string;
  user: User;
  channel: Channel;
  id: string;
  _client: Client;
  constructor(d, client) {
    this.type = d.type;
    this.tts = d.tts;
    this.pinned = d.pinned;
    this.nonce = d.nonce;
    this.mentions = d.mentions;
    this.referenced_message = d.referenced_message;
    // this.guildID = d.guild_id;
    // this.guild = client.guilds.find((g) => g.id == this.guildID) || client.guilds.find((g) => g.id == d.message_reference.guild_id)
    this.content = d.content;
    this.user =
      client.users.find((u) => u.id == d.author.id) ||
      new User(d.author, client);
    this.channel = client.dmchannels.find((c) => c.id == d.channel_id);
    this.id = d.id;
    this._client = client;
    // this.member = this.guild.members.find((m) => m.user.id == d.author.id)
  }

  async pin(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        'PUT',
        `channels/${this.channel.id}/pins/${this.id}`
      );
      if (response.status == 204) {
        return resolve(true);
      }
      throw new Error(resolve);
    });
  }

  async unPin(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        'DELETE',
        `channels/${this.channel.id}/pins/${this.id}`
      );
      if (response.status == 204) {
        return resolve(true);
      }
      throw new Error(resolve);
    });
  }

  async edit(content): Promise<MessageDM> {
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid content. Content must be a valid object.');
    }
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        'PATCH',
        `channels/${this.channel.id}/messages/${this.id}`,
        content
      );
      if (response.content) {
        return resolve(new Message(response, this._client));
      }
      throw new Error(response);
    });
  }

  async delete(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        'DELETE',
        `channels/${this.channel.id}/messages/${this.id}`
      );
      if (response.status == 204) {
        this.channel.messages.slice(this.channel.messages.indexOf(this), 1);
        return resolve(true);
      }
      throw new Error(response);
    });
  }
}
