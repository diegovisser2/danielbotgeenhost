const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");


module.exports = {
    name: 'ban',
    category: 'moderatie',
    description: 'Banned de getagte persoon van uw server',
    usage: `ban <@persoon> [reden]`,
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
            if (!logChannel)
                return;

            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.channel.send('You have no rights to use this command.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send("I can't find the tagged person.").then(m => m.delete({ timeout: 5000 }));

            if (!member.bannable)
                return message.channel.send("You can't ban this person.").then(m => m.delete({ timeout: 5000 }));

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send("You can't ban someone who has a role that is higher than your role.").then(m => m.delete({ timeout: 5000 }));

            User.findOne({
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
                        banCount: 1,
                        mutePerson: false
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        banCount: user.banCount + 1
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            let reason = 'No reason given';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`🔨You are \`banned\` from **${message.guild.name}** \n**Reason**: ${reason}.`);
            member.ban({ reason: reason });
            message.channel.send(`${member} is **banned**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Person Banned')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Username', member.user.username)
                    .addField('ID person', member.id)
                    .addField('Banned by', message.author)
                    .addField('Reason', reason);

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
            if (!logChannel)
                return;

            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.channel.send('U hebt geen recht om deze commando te gebruiken.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send('Ik kan de getagte persoon niet vinden.').then(m => m.delete({ timeout: 5000 }));

            if (!member.bannable)
                return message.channel.send('Deze persoon kunt u niet bannen').then(m => m.delete({ timeout: 5000 }));

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send('U kunt niet iemand bannen die een rol heeft die hoger is dan uw rol.').then(m => m.delete({ timeout: 5000 }));

            User.findOne({
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
                        banCount: 1,
                        mutePerson: false
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        banCount: user.banCount + 1
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            let reason = 'Geen reden opgegeven';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`🔨Je bent \`gebanned\` van **${message.guild.name}** \n**Reden**: ${reason}.`);
            member.ban({ reason: reason });
            message.channel.send(`${member} is **gebanned**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Persoon Gebanned')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Gebruikersnaam', member.user.username)
                    .addField('ID persoon', member.id)
                    .addField('Gebanned door', message.author)
                    .addField('Reden', reason);

                return logChannel.send(embed);
            };
        }
    }
};