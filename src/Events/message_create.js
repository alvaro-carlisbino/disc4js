const Message = require("../Structures/Message.js")
const MessageDM = require("../Structures/MessageDM.js")

module.exports = class MessageCreate {
    constructor(d, client) {
        if(d.guild_id) {
            const m = new Message(d, client)
            m.channel.messages.push(m)
            client.emit("message", m)
        }else {
            const m = new MessageDM(d, client)
            m.channel.messages.push(m)
            client.emit("message", m)
        }
    }
}