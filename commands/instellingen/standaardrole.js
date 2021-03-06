const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');
const botConfig = require("../../botConfig.json");


module.exports = {
    name: 'standaardrol',
    aliases: ['standardrole'],
    category: 'instellingen',
    description: 'U stelt in welke rol iemand standaard krijgt bij joinen uw server.',
    usage: `standaardrol <@standaardrol>`,
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
            if (!message.member.hasPermission('MANAGE_GUILD'))
                return message.channel.send('You have no rights to use this command.').then(m => m.delete({ timeout: 5000 }));

            const role = message.mentions.roles.first();


            if (!role)
                return message.channel.send("I can't find the role.").then(m => m.delete({ timeout: 5000 }));

            await Guild.findOne({
                guildID: message.guild.id
            }, async (err, guild) => {
                if (err) console.error(err);
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

                    });

                    await newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`??? From now on the standard rol is ${role}`)

                    return message.channel.send(embed);
                } else {
                    guild.updateOne({
                        standaardRol: role.id
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`??? From now on the standard rol is ${role}`)

                    return message.channel.send(embed);
                };
            });
        } else if (settings.Nederlands === true) {
            if (!message.member.hasPermission('MANAGE_GUILD'))
                return message.channel.send('U heeft geen recht om deze commando te gebruiken.').then(m => m.delete({ timeout: 5000 }));

            const role = message.mentions.roles.first();


            if (!role)
                return message.channel.send('Ik kan de rol niet vinden.').then(m => m.delete({ timeout: 5000 }));

            await Guild.findOne({
                guildID: message.guild.id
            }, async (err, guild) => {
                if (err) console.error(err);
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

                    });

                    await newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`??? De standaard rol is vanaf nu ${role}`)

                    return message.channel.send(embed);
                } else {
                    guild.updateOne({
                        standaardRol: role.id
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`??? De standaard rol is vanaf nu ${role}`)

                    return message.channel.send(embed);
                };
            });
        }
    }
}