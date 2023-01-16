const LogEntry = require("../Structures/LogEntry.js")

module.exports = class GuildAuditLogEntryCreate{
    constructor(d, client) {
        client.emit("guildAuditLogEntryCreate", new LogEntry(d, client))
    }
}