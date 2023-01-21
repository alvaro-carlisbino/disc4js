/* eslint-disable no-async-promise-executor */
import { ContentMessage } from '../..';
import Client from '../Client/Client';
import Guild from './Guild';
import Invite from './Invite';
import Message from './MessageClass';

export default class Channel {
  version: number;
  type: number;
  position: number;
  permissions: number;
  parent: string;
  nsfw: boolean;
  name: string;
  id: string;
  lastMessage: string;
  private _client: Client;
  private _guild: Guild;
  messages: Message[];
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

  async sendMessage(content: ContentMessage): Promise<Message> {
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid content. Content must be a valid object.');
    }
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/messages`, content);
      resolve(new Message(response, this._client));
    });
  }

  async delete(): Promise<boolean | object> {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('DELETE', `channels/${this.id}`);
      if (response.status == 204) {
        return resolve(true);
      }
      return resolve(response);
    });
  }

  async bulkDelete(number: number): Promise<boolean | object> {
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

  async createInvite(invite: {
    max_age?: number;
    max_uses?: number;
    temporary?: boolean;
    unique?: boolean;
    target_user?: string;
    target_user_type?: number;
  }): Promise<Invite> {
    if (!invite || typeof invite !== 'object') throw new Error('Invalid invite');
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/invites`, invite);
      return resolve(new Invite(response, this._client) || response);
    });
  }

  async startTyping(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/typing`);
      if (response.status) {
        return resolve(true);
      }
      return resolve(response);
    });
  }

  async startThread(options: { name: string; auto_archive_duration: number; type: number }): Promise<Channel> {
    if (!options || typeof options !== 'object') throw new Error('Invalid options');
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', `channels/${this.id}/threads`, options);
      return resolve(new Channel(response, this._client, this._guild));
    });
  }
}
