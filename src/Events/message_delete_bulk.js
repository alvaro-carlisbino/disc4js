module.exports = class MessageDeleteBulk{
    constructor(d, client) {
        const channel = client.channels.find((c) => c.id == d.channel_id) || client.dmchannels.find((c) => c.id == d.channel_id);
        const messages = []
        for(const id of d.ids) {
            messages.push(channel.messages.find((m) => m.id == id))
            channel.messages.splice(channel.messages.indexOf(channel.messages.find((m) => m.id == id)), 1)
        }

        client.emit("messageDeleteBulg", messages)
    }
}