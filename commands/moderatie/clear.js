const { MessageEmbed } = require('discord.js');
const Guild = require("../../models/guild")

module.exports = {
    name: 'clear',
    category: 'moderatie',
    description: 'U kunt hiermee maximaal honderd berichten achter elkaar verwijderen.',
    usage: `clear <1-100>`,
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
            if (!message.member.hasPermission("KICK_MEMBERS"))
                return message.reply("You have no rights to use this command.");

            var aantal = args[0];

            if (!aantal) return message.reply("Give a number between 1 and 100.");

            if (Number.isInteger(parseInt(args[0]))) {

                var aantal = parseInt(args[0]) + 1;

                message.channel.bulkDelete(aantal).then(() => {

                    if (args[0] == 0) {

                        message.reply("I can't delete 0 messages.").then(msg => msg.delete({ timeout: 3000 }));

                    } else if (args[0] == 0) {

                        message.reply(`I deleted 1 message.`).then(msg => msg.delete({ timeout: 3000 }));

                    } else {

                        message.reply(`I have deleted ${args[0]} messages.`).then(msg => msg.delete({ timeout: 3000 }));

                    }

                });

            } else {
                return message.reply("Give a number between 1 and 100.");
            }
        } else if (settings.Nederlands === true) {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("U heeft geen perms daarvoor.");

            var aantal = args[0];

            if (!aantal) return message.reply("Geef een getal op tussen 1 en 100.");

            if (Number.isInteger(parseInt(args[0]))) {

                var aantal = parseInt(args[0]) + 1;

                message.channel.bulkDelete(aantal).then(() => {

                    if (args[0] == 0) {

                        message.reply(`Ik kan niet 0 berichten verwijderen.`).then(msg => msg.delete({ timeout: 3000 }));

                    } else if (args[0] == 0) {

                        message.reply(`Ik heb 1 bericht verwijdert.`).then(msg => msg.delete({ timeout: 3000 }));

                    } else {

                        message.reply(`Ik heb ${args[0]} berichten verwijdert.`).then(msg => msg.delete({ timeout: 3000 }));

                    }

                });

            } else {
                return message.reply("Geef een getal op tussen 1 en 100.");
            }
        }
    }
}