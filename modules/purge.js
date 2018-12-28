const config = require('./../config.json');
const log_channel = config.log_channel;

module.exports = (client) => {
    // listen for the message event
    client.on("message", async msg => {
        // if message does not start with a bot prefix, or author is bot, or if the channel type isn't text, return 
        if (!msg.content.startsWith(config.prefix) || msg.author.bot || msg.channel.type !== "text") return;

        // slice input into command arguments
        const args = msg.content.slice(config.prefix.length).trim().split(/ * /g);
        // make all arguments lowercase
        const command = args.shift().toLowerCase();
    
        // if command is purge (!purge <amount>)
        if (command == "purge"){
            let amount = args[0];

            // if amount is a number
            if (!isNaN(amount)){
                // delete amount from selected channel
                msg.channel.bulkDelete(amount)
                .then(messages => {
                    client.channels.get(log_channel).send({embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: "Purged",
                    fields: [{
                        name: "Purge used",
                        value: `${messages.size} message(s) have been removed from ${msg.channel}`
                    }],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© RJHaytree"
                    }
                }})
            })
            .catch(console.error);
            } 
            // if amount is actually 'all', run this if statement
            else if (amount == "all"){
                // get amount of messages in channel (max 50)
                let messageList = msg.channel.fetchMessages()
                .then(messageList => {
                    // delete selected messages
                    msg.channel.bulkDelete(messageList)
                    .then(messages => {
                        client.channels.get(log_channel).send({embed: {
                            color: 3447003,
                            author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                            },
                            title: "Purged",
                            fields: [{
                                name: "Purge used",
                                value: `${messages.size} message(s) have been removed from ${msg.channel}`
                            }],
                            timestamp: new Date(),
                            footer: {
                                icon_url: client.user.avatarURL,
                                text: "© RJHaytree"
                            }
                        }})
                    })
                    .catch(console.error)
                })
                .catch(console.error)
            }
        }
    })
}