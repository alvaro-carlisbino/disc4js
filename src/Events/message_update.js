const Message = require("../Structures/MessageClass.js")

module.exports = class MessageUpdate {
    constructor(d, client) {
        const channel = client.channels.find((c) => c.id == d.channel_id) || client.dmchannels.find((c) => c.id == d.channel_id)
        const mess = channel.messages.find((m) => m.id == d.id)
        const newMsg = new Message(d, client)
        if(channel) {
            channel.messages.splice(channel.messages.indexOf(mess), 1)
            channel.messages.push(newMsg)
            client.emit("messageUpdate", (mess, newMsg))
        }
    }
}