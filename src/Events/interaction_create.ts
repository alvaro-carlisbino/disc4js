import Interaction from '../Structures/Interaction';

export default class InteractionCreate {
  constructor(d, client) {
    client.emit('interactionCreate', new Interaction(d, client));
  }
}
