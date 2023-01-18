"use strict";

const Client = require("./src/Client/Client.js")

function Disc4js(token, options){
    return new Client(token, options)
}

module.exports = Disc4js;