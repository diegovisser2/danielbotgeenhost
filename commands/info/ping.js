const { MessageEmbed } = require('discord.js');
const Guild = require("../../models/guild")

module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Hiermee kunt u zien hoe snel de bot op dit moment is',
    usage: `ping`,
    run: async (client, message, args) => {

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildNaam: message.guild.name,
                    prefix: botConfig.prefix,
                    Nederlands: false,
                    Engels: true
                })

                newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                return message.channel.send('This server was not in our database. We have now added it. Please retype your command.').then(m => m.delete({ timeout: 10000 }));
            }
        });
        if (settings.Engels === true) {
            const msg = await message.channel.send('🏓 Pinging...');

            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('🏓 Pong!')
                .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(client.ws.ping)} ms**`);

            message.channel.send(embed);
        } else if (settings.Nederlands === true) {
            const msg = await message.channel.send('🏓 Pinging...');

            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('🏓 Pong!')
                .setDescription(`Bot reactie tijd is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI reactie tijd is **${Math.round(client.ws.ping)} ms**`);

            message.channel.send(embed);
        }
    }
}