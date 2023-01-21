export default class VoiceServerUpdate {
  constructor(d, client) {
    client.emit('voiceServerUpdate', d);
  }
}
