const ChannelDM = require("../Structures/ChannelDM.js")
const Channel = require("../Structures/Channel.js")
const VoiceChannel = require("../Structures/VoiceChannel.js")
module.exports = class ChannelCreate {
    constructor(d, client) {
        if(d.type == 0){
            const guild = client.guilds.find((g) => g.id == d.guild_id)
            const channel = new Channel(d, client, guild)
            guild.channels.push(channel)
            client.channels.push(channel)
            client.emit("channelCreate", channel)
        } else if(d.type == 2){
            const guild = client.guilds.find((g) => g.id == d.guild_id)
            const channel = new VoiceChannel(d, client, guild)
            guild.channels.push(channel)
            client.channels.push(channel)
            client.emit("channelCreate", channel)
        } else {
            const channel = new ChannelDM(d, client)
            client.dmchannels.push(channel)
            client.emit("channelCreate", channel)
        }
    }
}