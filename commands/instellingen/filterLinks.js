const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');
const botConfig = require("../../botConfig.json");


module.exports = {
    name: 'filterlinks',
    category: 'instellingen',
    description: 'Filter voor links instellen.',
    usage: `filterlinks`,
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

            if (!message.member.hasPermission('MANAGE_GUILD'))
                return message.channel.send('You have no rights to use this command.').then(m => m.delete({ timeout: 5000 }));

            var embedPrompt = new MessageEmbed()
                .setColor("GREEN")
                .setTitle('Filterlinks')
                .setDescription('Do you want that the filter for discord links works in your server? Type "yes" if you want and "no" if you do not want that the filter works anymore.')
                .setFooter('This message will expire after 30 seconds.');

            message.channel.send(embedPrompt).then(async msg => {

                message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(async collected => {

                    if (collected.first().content.toLowerCase() == 'yes') {

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
                                    filterLinks: true,
                                    filterScheldwoorden: false,
                                    Nederlands: false,
                                    Engels: true

                                });

                                await newGuild.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ From now on the filter for links works.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    filterLinks: true
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ From now on the filter for links works.`)

                                return message.channel.send(embed);
                            }
                        })
                    } else if (collected.first().content.toLowerCase() == 'no') {

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
                                    filterScheldwoorden: false

                                });

                                await newGuild.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ From now on the filter for links does not work anymore.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    filterLinks: false
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ From now on the filter for links does not work anymore.`)

                                return message.channel.send(embed);
                            }
                        })

                    } else {
                        message.reply("Cancelled");
                    }
                });
            })
        } else if (settings.Nederlands === true) {

            if (!message.member.hasPermission('MANAGE_GUILD'))
                return message.channel.send('U heeft geen recht om deze commando te gebruiken.').then(m => m.delete({ timeout: 5000 }));

            var embedPrompt = new MessageEmbed()
                .setColor("GREEN")
                .setTitle('Filterlinks')
                .setDescription('Wilt u dat de filter voor discord links werkt in uw server? Typ "ja" als u wilt laten werken en "nee" als u het niet meer wilt laten werken.')
                .setFooter('Na 30 seconden verloopt dit bericht.');

            message.channel.send(embedPrompt).then(async msg => {

                message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(async collected => {

                    if (collected.first().content.toLowerCase() == 'ja') {

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
                                    filterLinks: true,
                                    filterScheldwoorden: false,
                                    Nederlands: false,
                                    Engels: true

                                });

                                await newGuild.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu werkt de filter voor links.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    filterLinks: true
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu werkt de filter voor links.`)

                                return message.channel.send(embed);
                            }
                        })
                    } else if (collected.first().content.toLowerCase() == 'nee') {

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
                                    filterScheldwoorden: false

                                });

                                await newGuild.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu werkt de filter voor links niet meer.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    filterLinks: false
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu werkt de filter voor links niet meer.`)

                                return message.channel.send(embed);
                            }
                        })

                    } else {
                        message.reply("Geannuleerd");
                    }
                });
            })
        }
    }
}