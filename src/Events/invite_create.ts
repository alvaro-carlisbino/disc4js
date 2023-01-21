import Invite from '../Structures/Invite';

export default class InviteCreate {
  constructor(d, client) {
    const invite = new Invite(d, client);
    client.guilds.find((g) => g.id === d.guild_id).invites.push(Invite);
    client.emit('inviteCreate', invite);
  }
}
