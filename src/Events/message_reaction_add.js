const Reaction = require("../Structures/Reaction.js")

module.exports = class MessageReactionAdd{
    constructor(d, client) {
        const channel = client.channels.find((c) => c.id == d.channel_id)
        const message = channel.messages.find((m) => m.id == d.message_id)
        const reaction = new Reaction(d, client)
        message.reactions.push(reaction)
        client.emit("messageReaction", (reaction))
    }
}