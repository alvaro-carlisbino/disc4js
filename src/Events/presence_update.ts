import Presence from '../Structures/Presence.js';

export default class PresenceUpdate {
  constructor(d, client) {
    const user = client.users.find((u) => u.id == d.user.id);
    if (user) {
      user.setPresence(new Presence(d));
      client.emit('presenceUpdate', user);
    }
  }
}
