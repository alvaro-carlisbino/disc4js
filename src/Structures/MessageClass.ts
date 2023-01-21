/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import User from './User';
import Member from './Member';
import Channel from './ChannelGuild';
import Guild from './Guild';
import Client from '../Client/Client';
import Reaction from './Reaction';

export default class Message {
  type: number;
  tts: boolean;
  pinned: boolean;
  nonce: string;
  mentions: string[];
  referenced_message: string;
  guildID: string;
  guild: Guild;
  content: string;
  channel: Channel;
  id: string;
  _client: Client;
  reactions: Reaction[];
  components: object;
  attachments: {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    height: number;
    width: number;
  }[];
  user: User;
  member: Member | undefined;
  constructor(d, client) {
    this.type = d.type;
    this.tts = d.tts;
    this.pinned = d.pinned;
    this.nonce = d.nonce;
    this.mentions = d.mentions;
    this.referenced_message = d.referenced_message;
    this.guildID = d.guild_id;
    this.guild =
      client.guilds.find((g) => g.id == this.guildID) ||
      client.channels.find((c) => c.id == d.channel_id)._guild ||
      client.guilds.find((g) => g.id == d.message_reference.guild_id);
    this.content = d.content;
    this.channel = client.channels.find((c) => c.id == d.channel_id);
    this.id = d.id;
    this._client = client;
    this.reactions = [];
    this.components = d.components || [];
    this.attachments = d.attachments || [];
    if (d.author) {
      this.user =
        client.users.find((u) => u.id == d.author.id) ||
        new User(d.author, client);
      this.member = this.guild.members.find((m) => m.user.id == d.author.id);
    }
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

  async edit(content: {
    content?: string;
    embed?: object;
    flags?: number;
    allowed_mentions?: object;
  }): Promise<Message> {
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

  async startThread(options): Promise<Channel> {
    if (!options || typeof options !== 'object')
    {throw new Error('Invalid options');}
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        'POST',
        `channels/${this.channel.id}/messages/${this.id}/threads`,
        options
      );
      const channel = new Channel(response, this._client, this.guild);
      resolve(channel | response);
    });
  }
}
