const config = require('./../config.json');
const log_channel = config.log_channel;

module.exports = (client) => {
    // listen for the message event
    client.on("message", async msg => {
        if (msg.author.bot || msg.channel.type !== "text") return;

        client.channels.get(log_channel).send({embed: {
            color: 3447003,
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            title: `${msg.author.username} sent a message`,
            description: `Message sent to ${msg.channel}`,
            fields: [{
                name: "Message",
                value: msg.content
            }],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© RJHaytree"
            }
        }})
    })

    // listen for the messageUpdate event - occurs when a message is updated, and returns the old and new message
    client.on('messageUpdate', async (oldMsg, newMsg) => {
        if (oldMsg.author.bot || oldMsg.channel.type !== "text") return;

        client.channels.get(log_channel).send({embed: {
            color: 3447003,
            author: {
                name: oldMsg.author.username,
                icon_url: oldMsg.author.avatarURL
            },
            title: `${oldMsg.author.username} edited a message`,
            description: `Message edited in ${oldMsg.channel}`,
            timestamp: new Date(),
            fields: [{
                name: "Pre Edit",
                value: oldMsg.content
            }, {
                name: "Post Edit",
                value: newMsg.content
            }],
            footer: {
                icon_url: client.user.avatarURL,
                text: "© RJHaytree"
            }
        }})
    })

    // listen for the messageDelete event - occurs when a message is deleted and returns the deleted message
    client.on('messageDelete', async msg => {
        if (msg.author.bot || msg.channel.type !== "text") return;

        client.channels.get(log_channel).send({embed: {
            color: 3447003,
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            title: `${msg.author.username} deleted a message`,
            description: `Message deleted in ${msg.channel}`,
            timestamp: new Date(),
            fields: [{
                name: "Deleted Message",
                value: msg.content
            }],
            footer: {
                icon_url: client.user.avatarURL,
                text: "© RJHaytree"
            }
        }})
    })
}