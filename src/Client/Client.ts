/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import EventEmitter from 'events';
import WebSocket from '../ws/WebSocket';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import RequestHandler from '../Util/RequestHandler';

import User from '../Structures/UserClass';
import Invite from '../Structures/Invite';
import Guild from '../Structures/Guild';
import Emoji from '../Structures/Emoji';
import Channel from '../Structures/ChannelGuild';
import ClientUser from '../Structures/ClientUser';
import ChannelDM from '../Structures/ChannelDM';

export default class Client extends EventEmitter {
  ws: WebSocket;
  user: ClientUser | undefined;
  fetch: RequestHandler;
  emojis: Emoji[];
  guilds: Guild[];
  channels: Channel[];
  users: User[];
  dmchannels: ChannelDM[];
  constructor(token, options) {
    super({});
    this.ws = new WebSocket(token, options.intents, this);
    this.user = undefined;
    this.fetch = new RequestHandler(token);
    this.emojis = [];
    this.guilds = [];
    this.channels = [];
    this.users = [];
    this.dmchannels = [];
  }

  setUser(user) {
    this.user = user;
  }

  putEmoji(emoji) {
    this.emojis.push(emoji);
  }

  putGuild(guild) {
    this.guilds.push(guild);
  }

  /**
   * @param {string} id
   */
  async fetchUser(id: string): Promise<User> {
    if (!id || typeof id !== 'string') throw new Error('The id id needed');

    if (!/^[0-9]{17,19}$/.test(id)) throw new Error('This ID is INVALID');

    return new Promise(async (resolve, reject) => {
      const response = await this.fetch.makeRequest('GET', `users/${id}`);
      return resolve(new User(response, this) || response);
    });
  }

  /**
   * @param {string} id
   */
  async fetchChannel(id: string): Promise<Channel | ChannelDM> {
    if (!id || typeof id !== 'string') throw new Error('The id id needed');

    if (!/^[0-9]{17,19}$/.test(id)) throw new Error('This ID is INVALID');

    return new Promise(async (resolve, reject) => {
      const response = await this.fetch.makeRequest('GET', `channels/${id}`);
      return resolve(response);
    });
  }

  /**
   * @param {string} id
   */
  async fetchGuild(id: string): Promise<Guild> {
    if (!id || typeof id !== 'string') throw new Error('The id id needed');

    if (!/^[0-9]{17,19}$/.test(id)) throw new Error('This ID is INVALID');

    return new Promise(async (resolve, reject) => {
      const response = await this.fetch.makeRequest('GET', `guilds/${id}`);
      return resolve(response);
    });
  }

  async modifyUser(options: {
    username?: string;
    avatar?: string;
  }): Promise<User> {
    if (!options || typeof options !== 'object' || !options.username) { throw new Error('Options need username or avatar'); }

    return new Promise(async (resolve, reject) => {
      const response = await this.fetch.makeRequest(
        'PATCH',
        'users/@me',
        options,
      );
      return resolve(response);
    });
  }

  async getInvite(code: string): Promise<Invite> {
    if (!code || typeof code !== 'string') { throw new Error('Specify a valid code'); }
    return new Promise(async (resolve, reject) => {
      const response = await this.fetch.makeRequest('GET', `invites/${code}`);
      return resolve(new Invite(response, this) || response);
    });
  }

  async deleteInvite(code: string): Promise<Invite> {
    if (!code || typeof code !== 'string') { throw new Error('Specify a valid code'); }
    return new Promise(async (resolve, reject) => {
      const response = await this.fetch.makeRequest(
        'DELETE',
        `invites/${code}`,
      );
      return resolve(new Invite(response, this) || response);
    });
  }
}
