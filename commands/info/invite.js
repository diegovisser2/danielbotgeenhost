const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
    name: 'invite',
    category: 'info',
    description: 'Hier vindt u de link om deze bot te inviten in uw server.',
    usage: `invite`,
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
                .setColor("BLUE")
                .setDescription(`Click [here](https://discord.com/oauth2/authorize?client_id=720638338813526114&scope=bot&permissions=4228906239) to invite this bot.`);

            message.channel.send(embed);
        } else if (settings.Nederlands === true) {
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`Klik [hier](https://discord.com/oauth2/authorize?client_id=720638338813526114&scope=bot&permissions=4228906239) om deze bot te inviten.`);

            message.channel.send(embed);
        }
    }
}