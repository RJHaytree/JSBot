const discord = require('discord.js');
const client = new discord.Client();
const mz = require('mz/fs');
const path = require('path');
const config = require('./config.json');

client.on("ready", () => {
    console.log('Client is ready');
})

let modules = mz.readdirSync("modules")
    .map (mod => `./modules/${mod}`) // turn modules into paths
    .map (mod => require(mod))  // require all modules
    .forEach(mod => mod(client)) // call their corresponding functions by passing the client object

client.login(config.token)