const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');
const botConfig = require("../../botConfig.json");


module.exports = {
    name: 'taal',
    aliases: ['language'],
    category: 'instellingen',
    description: 'Hiermee kan je de taal van de bot instellen.',
    usage: `taal <nl> of <en>`,
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
                .setTitle('Language')
                .setDescription('**EN:** \n What language do you want the bot speaks? Type "nl" for Dutch and "en" for English.\n\n**NL:**\nWat voor taal wilt u dat de bot spreekt? Typ "nl" voor Nederlands en "en" voor Engels.')
                .setFooter('This message will expire after 30 seconds. || Na 30 seconden verloopt dit bericht.');

            message.channel.send(embedPrompt).then(async msg => {

                message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(async collected => {

                    if (collected.first().content.toLowerCase() == 'nl') {

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
                                    filterScheldwoorden: true,
                                    Nederlands: true,
                                    Engels: false

                                });

                                await newGuild.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu spreekt de bot Nederlands.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    Nederlands: true,
                                    Engels: false
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu spreekt de bot Nederlands.`)

                                return message.channel.send(embed);
                            }
                        })
                    } else if (collected.first().content.toLowerCase() == 'en') {

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
                                    .setDescription(`✅ From now on the bot speaks English.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    Nederlands: false,
                                    Engels: true
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ From now on the bot speaks English.`)

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
                .setTitle('Taal')
                .setDescription('**EN:** \n What language do you want the bot speaks? Type "nl" for Dutch and "en" for English.\n\n**NL:**\nWat voor taal wilt u dat de bot spreekt? Typ "nl" voor Nederlands en "en" voor Engels.')
                .setFooter('Na 30 seconden verloopt dit bericht.');

            message.channel.send(embedPrompt).then(async msg => {

                message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(async collected => {

                    if (collected.first().content.toLowerCase() == 'nl') {

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
                                    filterScheldwoorden: true,
                                    Nederlands: true,
                                    Engels: false

                                });

                                await newGuild.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu spreekt de bot Nederlands.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    Nederlands: true,
                                    Engels: false
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ Vanaf nu spreekt de bot Nederlands.`)

                                return message.channel.send(embed);
                            }
                        })
                    } else if (collected.first().content.toLowerCase() == 'en') {

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
                                    .setDescription(`✅ From now on the bot speaks English.`)

                                return message.channel.send(embed);
                            } else {
                                guild.updateOne({
                                    Nederlands: false,
                                    Engels: true
                                })
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));

                                const embed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`✅ From now on the bot speaks English.`)

                                return message.channel.send(embed);
                            }
                        })

                    } else {
                        message.reply("Geannuleerd");
                    }
                });
            })
        // } else {

        //     if (!message.member.hasPermission('MANAGE_GUILD'))
        //         return message.channel.send('Ask a moderator to set a language on the bot. | Vraag een moderator om een taal op de bot in te stellen.').then(m => m.delete({ timeout: 5000 }));

        //     var embedPrompt = new MessageEmbed()
        //         .setColor("GREEN")
        //         .setTitle('No language set | Geen taal ingesteld')
        //         .setDescription('**EN:** \n What language do you want the bot speaks? Type "nl" for Dutch and "en" for English.\n\n**NL:**\nWat voor taal wilt u dat de bot spreekt? Typ "nl" voor Nederlands en "en" voor Engels.')
        //         .setFooter('Na 30 seconden verloopt dit bericht.');

        //     message.channel.send(embedPrompt).then(async msg => {

        //         message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(async collected => {

        //             if (collected.first().content.toLowerCase() == 'nl') {

        //                 await Guild.findOne({
        //                     guildID: message.guild.id
        //                 }, async (err, guild) => {
        //                     if (err) console.error(err);
        //                     if (!guild) {
        //                         const newGuild = new Guild({
        //                             _id: mongoose.Types.ObjectId(),
        //                             guildID: message.guild.id,
        //                             guildNaam: message.guild.name,
        //                             prefix: botConfig.prefix,
        //                             logKanaalID: channel.id,
        //                             muteRol: member.id,
        //                             standaardRol: role.id,
        //                             welkomsKanaal: kanaal.id,
        //                             totZiensKanaal: totziens.id,
        //                             bugKanaal: bug.id,
        //                             suggestieKanaal: suggestie.id,
        //                             ticketMap: ticket.id,
        //                             reviewKanaal: review.id,
        //                             blacklistRol: blacklist.id,
        //                             filterLinks: false,
        //                             filterScheldwoorden: true,
        //                             Nederlands: true,
        //                             Engels: false

        //                         });

        //                         await newGuild.save()
        //                             .then(result => console.log(result))
        //                             .catch(err => console.error(err));

        //                         const embed = new MessageEmbed()
        //                             .setColor("GREEN")
        //                             .setDescription(`✅ Vanaf nu spreekt de bot Nederlands.`)

        //                         return message.channel.send(embed);
        //                     } else {
        //                         guild.updateOne({
        //                             Nederlands: true,
        //                             Engels: false
        //                         })
        //                             .then(result => console.log(result))
        //                             .catch(err => console.error(err));

        //                         const embed = new MessageEmbed()
        //                             .setColor("GREEN")
        //                             .setDescription(`✅ Vanaf nu spreekt de bot Nederlands.`)

        //                         return message.channel.send(embed);
        //                     }
        //                 })
        //             } else if (collected.first().content.toLowerCase() == 'en') {

        //                 await Guild.findOne({
        //                     guildID: message.guild.id
        //                 }, async (err, guild) => {
        //                     if (err) console.error(err);
        //                     if (!guild) {
        //                         const newGuild = new Guild({
        //                             _id: mongoose.Types.ObjectId(),
        //                             guildID: message.guild.id,
        //                             guildNaam: message.guild.name,
        //                             prefix: botConfig.prefix,
        //                             logKanaalID: channel.id,
        //                             muteRol: member.id,
        //                             standaardRol: role.id,
        //                             welkomsKanaal: kanaal.id,
        //                             totZiensKanaal: totziens.id,
        //                             bugKanaal: bug.id,
        //                             suggestieKanaal: suggestie.id,
        //                             ticketMap: ticket.id,
        //                             reviewKanaal: review.id,
        //                             blacklistRol: blacklist.id,
        //                             filterLinks: false,
        //                             filterScheldwoorden: false,
        //                             Nederlands: false,
        //                             Engels: true

        //                         });

        //                         await newGuild.save()
        //                             .then(result => console.log(result))
        //                             .catch(err => console.error(err));

        //                         const embed = new MessageEmbed()
        //                             .setColor("GREEN")
        //                             .setDescription(`✅ From now on the bot speaks English.`)

        //                         return message.channel.send(embed);
        //                     } else {
        //                         guild.updateOne({
        //                             Nederlands: false,
        //                             Engels: true
        //                         })
        //                             .then(result => console.log(result))
        //                             .catch(err => console.error(err));

        //                         const embed = new MessageEmbed()
        //                             .setColor("GREEN")
        //                             .setDescription(`✅ From now on the bot speaks English.`)

        //                         return message.channel.send(embed);
        //                     }
        //                 })

        //             } else {
        //                 message.reply("Geannuleerd");
        //             }
        //         });
        //     })
        }
    }
}