/* eslint-disable @typescript-eslint/no-unused-vars */
import Client from '../Client/Client';
import Role from './Role';
import User from './User';
import Guild from './Guild';

export default class Member {
  nick: string;
  avatar: string;
  roles: Role[];
  user: User;
  joined_at: string;
  deaf: boolean;
  mute: boolean;
  permissions: string;
  voice;
  _client: Client;
  _guild: Guild;

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

  async modifyMember(modifyMember: {
    nick?: string;
    roles?: string[];
    mute?: boolean;
    deaf?: boolean;
    channel_id?: string;
  }): Promise<boolean> {
    if (!modifyMember || typeof modifyMember !== 'object')
    {throw new Error('A modifyMember object is invalid');}
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, _reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _response = await this._client.fetch.makeRequest(
        'PATCH',
        `guilds/${this._guild.id}/members/${this.user.id}`,
        modifyMember
      );
      return resolve(true);
    });
  }
}
