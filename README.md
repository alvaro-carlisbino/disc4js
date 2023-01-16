## Disc4js
A discord websocket package

# Hello to my package!

Example ping command:

````js
const {Client} = require("disc4js")

const client = new Client("TOKEN", {
    intents: 514
})

client.once("ready", () => {
    console.log("BOT ONLINE!")
})

client.on("message", async(message) => {
    if(message.content == "!ping") {
        message.channel.sendMessage(`Pong!`)
    }
})
````