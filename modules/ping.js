const config = require('./../config.json');

module.exports = (client) => {

    // basic-ass ping-pong function + command
    client.on("message", async msg => {
        if (!msg.content.startsWith(config.prefix) || msg.author.bot || msg.channel.type !== "text") return;

        const args = msg.content.slice(config.prefix.length).trim().split(/ * /g);
        const command = args.shift().toLowerCase();

        if (command == "ping"){
            msg.channel.send({embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "PONG!",
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© RJHaytree"
                }
            }});
        }
    })

}