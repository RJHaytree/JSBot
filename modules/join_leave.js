const discord = require('discord.js');
const config = require('./../config.json');
const join_channel = config.join_log_channel;
const log_channel = config.log_channel;

module.exports = (client) => {
    // listen for the guildMemberAdd event - fired when a user joins
    client.on("guildMemberAdd", async member => {
        const embed = new discord.RichEmbed()
            .setTitle("NEW MEMBER")
            .setAuthor(member.user.username, member.user.avatarURL)
            .setColor(0x46e11d)
            .setDescription(`${member.user.username} has joined the guild`)
            .setFooter("© RJHaytree", client.user.avatarURL)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL);
        
        // display embedded message in log and join channels
        client.channels.get(join_channel).send({embed})
        client.channels.get(log_channel).send({embed})
    })

    // listen for the guildMemberRemove event - fired when a user leaves or is kicked/banned
    client.on("guildMemberRemove", async member => {
        const embed = new discord.RichEmbed()
            .setTitle("MEMBER LEFT")
            .setAuthor(member.user.username, member.user.avatarURL)
            .setColor(0xe11d1d)
            .setDescription(`${member.user.username} has left the guild`)
            .setFooter("© RJHaytree", client.user.avatarURL)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL);

        // display embedded message in log and join channels
        client.channels.get(join_channel).send({embed})
        client.channels.get(log_channel).send({embed})
    })
}