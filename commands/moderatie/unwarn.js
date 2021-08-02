const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'unwarn',
    category: 'moderatie',
    description: 'Zo kan je iemands warn weghalen.',
    usage: `unwarn <@persoon> [reden]`,
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
            const member = message.mentions.members.first();

            const guildDB = await Guild.findOne({
                guildID: message.guild.id
            }, async (err, guild) => {
                if (err) console.error(err);

                if (!guild) {
                    const newGuild = new Guild({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        guildNaam: message.guild.name,
                        prefix: botConfig.prefix,
                        logKanaalID: null,
                        muteRol: null,
                        standaardRol: null,
                        welkomsKanaal: null,
                        totZiensKanaal: null,
                        bugKanaal: null,
                        suggestieKanaal: null,
                        ticketMap: null,
                        reviewKanaal: null,
                        blacklistRol: null,
                        filterLinks: false,
                        filterScheldwoorden: false,
                        Nederlands: false,
                        Engels: true
                    });

                    await newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            const logChannel = message.guild.channels.cache.get(guildDB.logKanaalID);
            if (!logChannel) return;

            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.channel.send('You have no rights to use this command.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send("I can't find the tagged person.").then(m => m.delete({ timeout: 5000 }));

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send("You can't unwarn someone who has a role that is higher than your role.").then(m => m.delete({ timeout: 5000 }));

            const userDB = await User.findOne({
                guildID: message.guild.id,
                userID: member.id
            }, async (err, user) => {
                if (err) console.error(err);

                if (!user) {
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        userID: member.id,
                        muteCount: 0,
                        warnCount: 0,
                        kickCount: 0,
                        banCount: 0
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        warnCount: user.warnCount - 1
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            const settings = await User.findOne({
                guildID: message.guild.id,
                userID: member.id
            }, async (err, user) => {
                if (err) console.error(err);

                if (!user) {
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        userID: member.id,
                        muteCount: 0,
                        warnCount: 0,
                        kickCount: 0,
                        banCount: 0,
                        mutePerson: false
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        warnCount: user.warnCount - 1
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            // Zo haal je data uit de DB van User.
            const warnCount = settings.warnCount
            let reason = 'No reason given';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`⚠You are \`unwarned\` in **${message.guild.name}** \n**Reason**: ${reason}. \n**Number of warns**: ${warnCount}`);
            message.channel.send(`${member} is **unwarned**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Person Unwarned')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Person', member.user.username)
                    .addField('ID person', member.id)
                    .addField('Unwarned by', message.author)
                    .addField('Reason', reason)
                    .addField("Number of warns:", warnCount);

                return logChannel.send(embed);
            };

        } else if (settings.Nederlands === true) {
            const member = message.mentions.members.first();

            const guildDB = await Guild.findOne({
                guildID: message.guild.id
            }, async (err, guild) => {
                if (err) console.error(err);

                if (!guild) {
                    const newGuild = new Guild({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        guildNaam: message.guild.name,
                        prefix: botConfig.prefix,
                        logKanaalID: null,
                        muteRol: null,
                        standaardRol: null,
                        welkomsKanaal: null,
                        totZiensKanaal: null,
                        bugKanaal: null,
                        suggestieKanaal: null,
                        ticketMap: null,
                        reviewKanaal: null,
                        blacklistRol: null,
                        filterLinks: false,
                        filterScheldwoorden: false,
                        Nederlands: false,
                        Engels: true
                    });

                    await newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            const logChannel = message.guild.channels.cache.get(guildDB.logKanaalID);
            if (!logChannel) return;

            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.channel.send('U heeft geen recht om deze commando te gebruiken.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send('Ik kan de getagte persoon niet vinden.').then(m => m.delete({ timeout: 5000 }));

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send('U kunt niet iemand een waarschuwing geven die een hogere rol dan u heeft.').then(m => m.delete({ timeout: 5000 }));

            const userDB = await User.findOne({
                guildID: message.guild.id,
                userID: member.id
            }, async (err, user) => {
                if (err) console.error(err);

                if (!user) {
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        userID: member.id,
                        muteCount: 0,
                        warnCount: 0,
                        kickCount: 0,
                        banCount: 0
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        warnCount: user.warnCount - 1
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            const settings = await User.findOne({
                guildID: message.guild.id,
                userID: member.id
            }, async (err, user) => {
                if (err) console.error(err);

                if (!user) {
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        userID: member.id,
                        muteCount: 0,
                        warnCount: 0,
                        kickCount: 0,
                        banCount: 0,
                        mutePerson: false
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        warnCount: user.warnCount - 1
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            // Zo haal je data uit de DB van User.
            const warnCount = settings.warnCount
            let reason = 'Geen reden gegeven';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`⚠Je bent \`geunwarned\` in **${message.guild.name}** \n**Reden**: ${reason}. \n**Aantal warns**: ${warnCount}`);
            message.channel.send(`${member} was **unwarned**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Persoon Geunwarned')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Persoon', member.user.username)
                    .addField('ID persoon', member.id)
                    .addField('Geunwarnd door', message.author)
                    .addField('Reden', reason)
                    .addField("Aantal warns:", warnCount);

                return logChannel.send(embed);
            };
        }
    }
}