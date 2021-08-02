const { MessageEmbed } = require('discord.js');
const Guild = require("../../models/guild")

module.exports = {
    name: 'serverinfo',
    category: 'info',
    description: 'Laat informatie zien over de server waar de bot inzit.',
    usage: `serverinfo`,
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
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle(message.guild.name)
                .setThumbnail(message.guild.iconURL())
                .setDescription('Here you can see some information about the server.')
                .addField('Server ID', message.guild.id)
                .addField('Server owner', `${(message.guild.owner.user.username)} *(${message.guild.ownerID})*`)
                .addField("Total members | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`)
                .addField('Text channels | Voice channels', `${message.guild.channels.cache.filter(channel => channel.type === 'text').size} | ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`)
                .addField('Roles', message.guild.roles.cache.size)
                .addField('Server created on', message.guild.createdAt);

            return message.channel.send(embed).catch(err => console.error(err));
        } else if (settings.Nederlands === true) {
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle(message.guild.name)
                .setThumbnail(message.guild.iconURL())
                .setDescription('Hier ziet u wat info van deze server.')
                .addField('Server ID', message.guild.id)
                .addField('Server owner', `${(message.guild.owner.user.username)} *(${message.guild.ownerID})*`)
                .addField("Totaal leden | mensen | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`)
                .addField('Tekst kanalen | spreek kanalen', `${message.guild.channels.cache.filter(channel => channel.type === 'text').size} | ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`)
                .addField('Rollen', message.guild.roles.cache.size)
                .addField('Server aangemaakt op', message.guild.createdAt);

            return message.channel.send(embed).catch(err => console.error(err));
        }
    }
}