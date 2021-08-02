const { MessageEmbed } = require('discord.js');
const Guild = require("../../models/guild")

module.exports = {
    name: 'profielfoto',
    category: 'info',
    description: 'Hiermee kunt u de profielfoto van iemand zien.',
    usage: `profielfoto [@persoon]`,
    aliases: ['profile-picture'],
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
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(`${user.user.displayAvatarURL()}`)
            return message.channel.send(embed);
        } else if (settings.Nederlands === true) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(`${user.user.displayAvatarURL()}`)
            return message.channel.send(embed);
        }
    }
}