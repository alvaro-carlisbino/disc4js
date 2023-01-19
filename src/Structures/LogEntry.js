module.exports = class LogEntry {
  constructor(d, client) {
    this.user = client.users.find((u) => u.id == u.user_id);
    this.target = d.target_id;
    this.changes = d.changes;
    this.guild = client.guilds.find((g) => g.id == d.guild_id);
  }
};
