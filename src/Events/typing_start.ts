export default class TypingStart {
  constructor(d, client) {
    const channel = client.channels.find((c) => c.id == d.channel_id) || client.dmchannels.find((c) => c.id == d.channel_id);
    const user = client.users.find((m) => m.id == d.user_id);
    client.emit('typingStart', (channel, user));
  }
}
