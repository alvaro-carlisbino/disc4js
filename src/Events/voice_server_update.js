module.exports = class VoiceServerUpdate {
  constructor(d, client) {
    client.emit('voiceServerUpdate', d);
  }
};
