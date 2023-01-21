import LogEntry from '../Structures/LogEntry.js';

export default class GuildAuditLogEntryCreate {
  constructor(d, client) {
    client.emit('guildAuditLogEntryCreate', new LogEntry(d, client));
  }
}
