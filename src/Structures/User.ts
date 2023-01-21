/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import Client from '../Client/Client';
import ChannelDM from './ChannelDM';
import { Presence } from '../../index';
export default class User {
  username: string;
  id: string;
  bot: boolean;
  avatar: string;
  discriminator: string;
  tag: string;
  publicFlags: number;
  _client: Client;
  presence: Presence;
  constructor(d, client: Client) {
    this.username = d.username || client.users.find((u) => u.id == d.id)?.username || '';
    this.id = d.id;
    this.bot = d.bot;
    if (this.id == client.user?.id) {
      this.bot = true;
    }
    this.avatar = d.avatar;
    this.discriminator = d.discriminator;
    this.tag = `${this.username}#${this.discriminator}`;
    this.publicFlags = d.public_flags;
    this._client = client;
  }

  setPresence(presence: Presence): void {
    this.presence = presence;
  }

  async createDM(): Promise<ChannelDM> {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('POST', 'users/@me/channels', {
        recipient_id: this.id,
      });
      const channel = new ChannelDM(response);
      this._client.dmchannels.push(channel);
      return resolve(channel || response);
    });
  }
}
