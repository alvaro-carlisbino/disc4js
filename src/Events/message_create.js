const Message = require("../Structures/Message.js")

module.exports = class MessageCreate {
    constructor(d, client) {
        const m = new Message(d, client)
        m.channel.messages.push(m)
        client.emit("message", m)
    }
}