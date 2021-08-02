const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'prefix',
    category: 'instellingen',
    description: 'Zet de prefix voor de server in',
    usage: `prefix <nieuwe prefix>`,
    run: async (client, message, args) => {
        message.delete();

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
            if (!message.member.hasPermission('MANAGE_GUILD')) {
                return message.channel.send('You have no rights to use this command.').then(m => m.delete({ timeout: 10000 }));
            };

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
                        logKanaalID: channel.id,
                        muteRol: member.id,
                        standaardRol: role.id,
                        welkomsKanaal: kanaal.id,
                        totZiensKanaal: totziens.id,
                        bugKanaal: bug.id,
                        suggestieKanaal: suggestie.id,
                        ticketMap: ticket.id,
                        reviewKanaal: review.id,
                        blacklistRol: blacklist.id,
                        filterLinks: false,
                        filterScheldwoorden: false,
                        Nederlands: false,
                        Engels: true
                    })

                    newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    return message.channel.send('This server was not in our database. We have now added it. Please retype your command.').then(m => m.delete({ timeout: 10000 }));
                }
            });

            if (args.length < 1) {
                return message.channel.send(`You need to type a prefix behind \`${settings.prefix}prefix\`. The current server prefix is \`${settings.prefix}\``).then(m => m.delete({ timeout: 10000 }));
            };

            await settings.updateOne({
                prefix: args[0]
            });

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Your server prefix has been changed to \`${args[0]}\``)

            return message.channel.send(embed);

        } else if (settings.Nederlands === true) {
            if (!message.member.hasPermission('MANAGE_GUILD')) {
                return message.channel.send('Je hebt geen recht om dit te doen.').then(m => m.delete({ timeout: 10000 }));
            };

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
                        logKanaalID: channel.id,
                        muteRol: member.id,
                        standaardRol: role.id,
                        welkomsKanaal: kanaal.id,
                        totZiensKanaal: totziens.id,
                        bugKanaal: bug.id,
                        suggestieKanaal: suggestie.id,
                        ticketMap: ticket.id,
                        reviewKanaal: review.id,
                        blacklistRol: blacklist.id,
                        filterLinks: false,
                        filterScheldwoorden: false,
                        Nederlands: false,
                        Engels: true
                    })

                    newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    return message.channel.send('Deze server was niet in onze Database! We hebben uw server toegevoegd, typ astublieft het commando opnieuw.').then(m => m.delete({ timeout: 10000 }));
                }
            });

            if (args.length < 1) {
                return message.channel.send(`U moet een prefix typen achter \`${settings.prefix}prefix\`. De huidige server prefix is \`${settings.prefix}\``).then(m => m.delete({ timeout: 10000 }));
            };

            await settings.updateOne({
                prefix: args[0]
            });

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Uw server prefix is gewijzigd naar \`${args[0]}\``)

            return message.channel.send(embed);

        }
    }
}