## Disc4js
A discord websocket package

# Hello to Disc4js

It's a simple discord library, if u need help or support, send message to me: ````719986033583849502````

Example ping command:

````js
const {Client} = require("disc4js")

const client = new Client("TOKEN", {
    intents: 3276799
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