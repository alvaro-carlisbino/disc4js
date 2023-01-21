export default class WebhookUpdate {
  constructor(d, client) {
    const channel = client.channels.find((c) => c.id == d.channel_id) || client.dmchannels.find((c) => c.id == d.channel_id);
    client.emit('webhookUpdate', (channel));
  }
}
