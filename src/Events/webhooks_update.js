module.exports = class WebhookUpdate{
    constructor(d, client) {
        const guild = client.guilds.find((g) => g.id == d.guild_id)
        const channel = guild.channels.find((c) => c.id == d.channel_id)
        client.emit("webhookUpdate", (guild, channel))
    }
}