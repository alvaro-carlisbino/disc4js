const ws = require("ws");
const fs = require("fs");

module.exports = class WebSocket {
  constructor(token, intents, client) {
    this._client = client;
    this._token = token;
    this._intents = intents;
    this.session_id = "";
    this.session_type = "";
    this._trace = "";
    this.ping = 0;
    this.heart = 0;
    this.ws = new ws("wss://gateway.discord.gg", {});
    this.ws.on("open", () => {
      this.ws.send(
        JSON.stringify({
          op: 2,
          d: {
            token: this._token,
            intents: this._intents,
            properties: {
              os: "linux",
              browser: "disc4js",
              device: "disc4js",
            },
          },
        })
      );
    });

    this.ws.on("close", async () => {
      console.log("[WEBSOCKET] Clossed");
    });

    this.ws.on("message", async (message) => {
      const json = JSON.parse(message.toString());
      const { t, s, op, d } = json;
      if (op == 10) {
        this.heart = d.heartbeat_interval;
        setInterval(() => {
          this.ws.send(
            JSON.stringify({
              op: 1,
              d: Date.now(),
            })
          );
          this.lastHello = Date.now();
        }, this.heart);
      } else if (op == 11) {
        // console.log(d)
        this.lastResponse = Date.now();
        this.ping = ~~(this.lastResponse - this.lastHello);
      } else if (op == 2) {
        // console.log(d)
      }
      // console.log(t, s, op);
      this._client.emit("raw", json);
      if (t) {
        new (require(`../Events/${t.toLowerCase()}.js`))(d, this._client);
      }
    });
  }
};
