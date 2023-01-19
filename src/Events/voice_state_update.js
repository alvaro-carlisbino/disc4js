const voiceState = require('../Structures/voiceState.js');

module.exports = class VoiceStateUpdate {
  constructor(d, client) {
    const guild = client.guilds.find((g) => g.id == d.guild_id);
    const member = guild.members.find((m) => m.user.id == d.member.user.id);
    const state = new voiceState(d, client, member);
    member.voice = state;
    client.emit('voiceStateUpdate', (state));
  }
};
