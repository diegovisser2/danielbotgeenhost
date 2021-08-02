const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild')

module.exports = {
    name: 'spelerinfo',
    aliases: ['whois'],
    category: 'info',
    description: 'Laat informatie over de getagte persoon zien.',
    usage: `spelerinfo <@persoon>`,
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
            const member = message.mentions.members.first();

            if (!member)
                return message.channel.send('You must tag a person to use this command.').then(m => m.delete({timeout: 5000}));
    
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(member.user.username)
                .setThumbnail(member.user.avatarURL())
                .setDescription(`Here is some information about ${member}`)
                .addField('User ID', member.user.id)
                .addField('Account created on', member.user.createdAt)
                .addField('Server joined on', member.joinedAt)
                // .addField('Laatste bericht', member.lastMessage.content)
                .addField('Highest role', member.roles.highest)
                .addField('All roles', member.roles.cache.map(r => `${r}`).join(' | '));
    
            return message.channel.send(embed).catch(err => console.error(err));
        } else if (settings.Nederlands === true) {
            const member = message.mentions.members.first();

            if (!member)
                return message.channel.send('Je moet een persoon taggen om van deze commando gebruik te kunnen maken.').then(m => m.delete({timeout: 5000}));
    
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(member.user.username)
                .setThumbnail(member.user.avatarURL())
                .setDescription(`Hier is wat informatie over ${member}`)
                .addField('Persoons ID', member.user.id)
                .addField('Account aangemaakt op', member.user.createdAt)
                .addField('Server gejoint op', member.joinedAt)
                // .addField('Laatste bericht', member.lastMessage.content)
                .addField('Hoogste rol', member.roles.highest)
                .addField('Alle rollen', member.roles.cache.map(r => `${r}`).join(' | '));
    
            return message.channel.send(embed).catch(err => console.error(err));
        }
    }
}