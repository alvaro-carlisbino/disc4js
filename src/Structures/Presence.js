module.exports = class Presence {
  constructor(d) {
    this.status = d.status;
    this.game = d.game;
    this.activities = d.activities;
    this.clientStatus = d.client_status;
  }
};
