import Channel from './ChannelGuild';
import Emoji from './Emoji';
import Guild from './Guild';
import Member from './Member';
import Message from './MessageClass';
import User from './User';

export default class Reaction {
  emoji: Emoji;
  channel: Channel;
  message: Message;
  guild: Guild | undefined;
  member: Member | undefined;
  user: User;
  constructor(d, client) {
    this.emoji = client.emojis.find((e) => e.id == d.emoji.id) || d.emoji;
    this.channel = client.channels.find((c) => c.id == d.channel_id) || client.dmchannels.find((c) => c.id == d.channel_id);
    if (this.channel) {
      this.message = this.channel.messages.find((m) => m.id == d.message_id);
    }
    if (d.guild_id) {
      this.guild = client.guilds.find((g) => g.id == d.guild_id);
      this.member = this.guild?.members.find((m) => m.user.id == d.user_id);
    }
    this.user = client.users.find((u) => u.id == d.user_id);
  }
}
