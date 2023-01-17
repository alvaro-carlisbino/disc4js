module.exports = class TypingStart{
    constructor(d, client) {
        const guild = client.guilds.find((g) => g.id == d.guild_id)
        const channel = guild.channels.find((c) => c.id == d.channel_id)
        const member = guild.members.find((m) => m.user.id == d.user_id)

        client.emit("typingStart", (guild, channel, member))
    }
}