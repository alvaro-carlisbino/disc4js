import Member from '../Structures/Member';

export default class GuildMemberUpdate {
  constructor(d, client) {
    const guild = client.guilds.find((g) => g.id == d.guild_id);
    const oldMember = guild.members.find((m) => m.user.id == d.user.id);
    const newMember = new Member(d, client, guild);
    guild.members.slice(guild.members.indexOf(oldMember), 1);
    guild.members.push(newMember);
    client.emit('memberGuildUpdate', (oldMember, newMember));
  }
}
