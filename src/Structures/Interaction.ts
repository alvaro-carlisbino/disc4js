/* eslint-disable no-async-promise-executor */
import Client from '../Client/Client';
import Channel from './ChannelGuild';
import Guild from './Guild';
import Member from './Member';
import Message from './MessageClass';
import User from './User';

export default class Interaction {
  version: number;
  type: number;
  token: string;
  guild: Guild;
  member: Member | undefined;
  user: User;
  id: string;
  data: object;
  channel: Channel;
  application_id: string;
  _client: Client;
  message: Message;
  constructor(d, client) {
    this.version = d.version;
    this.type = d.type;
    this.token = d.token;
    if (d.guild_id) {
      this.guild = client.guilds.find((g) => g.id === d.guild_id) || null;
      this.member = this.guild?.members?.find((m) => m.user.id === d.member.user.id);
    }
    this.user = client.users.find((u) => u.id === d.user_id) || client.users.find((u) => u.id === d.member.user.id);
    this.id = d.id;
    this.data = d.data;
    this.channel = this.guild?.channels?.find((c) => c.id === d.channel_id) || client.dmchannels.find((c) => c.id == d.channel_id);
    this.application_id = d.application_id;
    this._client = client;
    if (d.message) {
      if (d.message.components) {
        this.channel.messages?.find((m) => m.id === d.message.id).components = d.message.components;
      }
      this.message = this.channel.messages.find((m) => m.id === d.message.id);
    }
  }

  async reply(content): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise(async (resolve, reject) => {
      content = {
        type: 4,
        data: content,
      };
      const response = await this._client.fetch.makeRequest('POST', `interactions/${this.id}/${this.token}/callback`, content);
      if (response.status == 204) {
        return resolve(true);
      }
      return resolve(response);
    });
  }
}
