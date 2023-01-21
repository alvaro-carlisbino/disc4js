import LogEntry from '../Structures/LogEntry';

export default class ChannelPinsUpdate {
  constructor(d, client) {
    const channel =
      client.channels.find((c) => c.id == d.channel_id) ||
      client.dmchannels.find((c) => c.id == d.channel_id);
    client.emit('channelPinsUpdate', channel);
  }
}
