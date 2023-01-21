// eslint-disable-next-line @typescript-eslint/no-var-requires
const ClientUser = require('../Structures/ClientUser');

export default class UserUpdate {
  constructor(d, client) {
    const user = new ClientUser(d);
    client.user = user;
    client.emit('clientUserUpdate', user);
  }
}
