import Message from '../Structures/MessageClass.js';
import Reaction from '../Structures/Reaction.js';

export default class MessageReactionAdd {
  message: Message;
  constructor(d, client) {
    const channel =
      client.channels.find((c) => c.id == d.channel_id) ||
      client.dmchannels.find((c) => c.id == d.channel_id);
    if (channel) {
      this.message = channel.messages.find((m) => m.id == d.message_id);
    }
    const reaction = new Reaction(d, client);
    if (this.message) {
      this.message.reactions.push(reaction);
    }
    client.emit('messageReaction', reaction);
  }
}
