import ClientUser from '../Structures/ClientUser.js';

export default class Ready {
  constructor(d, client) {
    client.setUser(new ClientUser(d.user));
    client.emit('ready', null);
  }
}
