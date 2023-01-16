module.exports = class PartialMessage{
    constructor(d, client, channel) {
        this.id = d.id
        this.type = d.type;
        this.content = d.content;
        this.channel = channel
        this.author = client.users.find((u) => u.id == d.author.id)
        this.embeds = d.embeds;
        this.pinned = d.pinned;
        this.tts = d.tts;
        this.timestamp = d.timestamp;
        this.flags = d.flags;
    }
}