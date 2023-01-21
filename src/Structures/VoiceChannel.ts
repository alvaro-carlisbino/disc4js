/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import Client from '../Client/Client';
import Channel from './ChannelGuild';
import Guild from './Guild';

export default class VoiceChannel {
  version: number;
  type: number;
  rtc_region: string;
  rate_limit_per_user: number;
  position: number;
  permissions: number;
  parent: Channel;
  nsfw: boolean;
  name: string;
  id: string;
  flags: number;
  bitrate: number;
  guild: Guild;
  _client: Client;
  constructor(d, client, guild) {
    this.version = d.version;
    this.type = d.type;
    this.rtc_region = d.rtc_region;
    this.rate_limit_per_user = d.rate_limit_per_user;
    this.position = d.position;
    this.permissions = d.permission_overwrites;
    this.parent = client.channels.find((c) => c.id == d.parent_id) || d.parent_id;
    this.nsfw = d.nsfw;
    this.name = d.name;
    this.id = d.id;
    this.flags = d.flags;
    this.bitrate = d.bitrate;
    this.guild = guild;
    this._client = client;
  }

  async join(mute?: boolean, deaf?: boolean): Promise<void> {
    if (mute && typeof mute !== 'boolean' || deaf && typeof deaf !== 'boolean') throw new Error('Invalid mute and deaf');
    this._client.ws.ws.send(JSON.stringify({
      op: 4,
      d: {
        channel_id: this.id,
        guild_id: this.guild.id,
        self_mute: mute || false,
        self_deaf: deaf || false,
      },
    }));
  }

  async delete(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest('DELETE', `channels/${this.id}`);
      if (response.status == 204) {
        return resolve(true);
      }
      return resolve(response);
    });
  }
}
