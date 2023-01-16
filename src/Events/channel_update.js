const Channel = require("../Structures/Channel");
module.exports = class ChannelUpdate{
    constructor(d, client) {
        const oldChannel = client.channels.find((c) => c.id == d.id) || undefined;
        const guild = client.guilds.find((g) => g.id == d.guild_id)
        const newChannel = new Channel(d, client, guild)
        client.channels.splice(client.channels.indexOf(oldChannel), 1)
        guild.channels.splice(guild.channels.indexOf(oldChannel), 1)
        client.channels.push(newChannel)
        guild.channels.push(newChannel)
        client.emit("channelUpdate", (oldChannel, newChannel))
    }
}