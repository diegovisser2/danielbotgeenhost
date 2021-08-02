const { MessageEmbed } = require('discord.js');
const botConfig = require("../../botConfig.json")
const Guild = require('../../models/guild');

module.exports = {
    name: 'botinfo',
    category: 'info',
    description: 'Hiermee kunt u info over de bot zien.',
    usage: `botinfo`,
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
            var members = message.guild.members.cache;
            var embed = new MessageEmbed()
                .setTitle(`Information about Daniël Bot`)
                .setColor("DARK BLUE")
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`**Bot name:**`, client.user.username)
                .addField(`**ID:**`, client.user.id)
                .addField(`**Prefix:**`, settings.prefix)
                .addField(`**Made on:**`, client.user.createdAt)
                .addField(`**Created by:**`, "@Daniël#5215")
                .addField(`**Number of servers:**`, client.guilds.cache.size)
                .addField('**Number of users:**', client.users.cache.size)
                .addField("**Bot invite link 🤖**", `[Klik hier!](https://discord.com/oauth2/authorize?client_id=720638338813526114&scope=bot&permissions=4228906239)`)
                .addField('**Support Server:**', '[Klik hier!](https://discord.gg/2E5fhn3)')

            // .setTimestamp()
            // .setFooter(botConfig.footer)
            return message.channel.send(embed);
        } else if (settings.Nederlands === true) {
            var members = message.guild.members.cache;
            var embed = new MessageEmbed()
                .setTitle(`Informatie over Daniël Bot`)
                .setColor("DARK BLUE")
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`**Bot naam:**`, client.user.username)
                .addField(`**ID:**`, client.user.id)
                .addField(`**Prefix:**`, settings.prefix)
                .addField(`**Gemaakt op:**`, client.user.createdAt)
                .addField(`**Cemaakt door:**`, "@Daniël#5215")
                .addField(`**Aantal servers:**`, client.guilds.cache.size)
                .addField('**Aantal gebruikers:**', client.users.cache.size)
                .addField("**Bot invite linkje 🤖**", `[Klik hier!](https://discord.com/oauth2/authorize?client_id=720638338813526114&scope=bot&permissions=4228906239)`)
                .addField('**Support Server:**', '[Klik hier!](https://discord.gg/2E5fhn3)')

            // .setTimestamp()
            // .setFooter(botConfig.footer)
            return message.channel.send(embed);
        }
    }
}