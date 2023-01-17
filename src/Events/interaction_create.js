const Interaction = require("../Structures/Interaction");
module.exports = class InteractionCreate{
    constructor(d, client) {
        client.emit("interactionCreate", new Interaction(d, client))
    }
}