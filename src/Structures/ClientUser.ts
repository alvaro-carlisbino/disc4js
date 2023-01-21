export default class ClientUser {
  verified: boolean;
  username: string;
  id: string;
  flags: number;
  email: string;
  discriminator: string;
  tag: string;
  bot: boolean;
  avatar: string;
  bio: string;
  constructor(d) {
    this.verified = d.verified;
    this.username = d.username;
    this.id = d.id;
    this.flags = d.flags;
    this.email = d.email;
    this.discriminator = d.discriminator;
    this.tag = `${this.username}#${this.discriminator}`;
    this.bot = true;
    this.avatar = d.avatar;
    this.bio = d.bio;
  }
}
