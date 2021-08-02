const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");


module.exports = {
    name: 'mute',
    category: 'moderatie',
    description: 'De getagte persoon muten.',
    usage: `mute <@persoon> [reden]`,
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

            const muteRol = message.guild.roles.cache.get(guildDB.muteRol);
            if (!muteRol) return message.channel.send("The mute role is not set by the owner.");
            const logChannel = message.guild.channels.cache.get(guildDB.logKanaalID);
            if (!logChannel) return;


            if (!message.member.hasPermission("KICK_MEMBERS"))
                return message.reply("You have no rights to use this command.");

            if (!member)
                return message.reply("I can't find the tagged person.");

            if (!message.guild.me.hasPermission("KICK_MEMBERS"))
                return message.reply("I have not enough rights to use this command.");

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
                        muteCount: 1,
                        warnCount: 0,
                        kickCount: 0,
                        banCount: 0,
                        mutePerson: true
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        muteCount: user.muteCount + 1,
                        mutePerson: true
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            let reason = 'No reason given';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`👄You are \`muted\` in **${message.guild.name}** \n**Reason**: ${reason}.`);
            await (member.roles.add(muteRol));
            message.channel.send(`${member} is **muted**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Person Muted')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Person', member.user.username)
                    .addField('ID person', member.id)
                    .addField('Muted by', message.author)
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

            const muteRol = message.guild.roles.cache.get(guildDB.muteRol);
            if (!muteRol) return message.channel.send("De muterol is niet door de owner ingesteld.");
            const logChannel = message.guild.channels.cache.get(guildDB.logKanaalID);
            if (!logChannel) return;


            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("U heeft geen recht om deze commando te gebruiken.");

            if (!member) return message.reply("Er is geen gebruiker opgegeven.");

            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Ik kan dit niet doen.");

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send('U kunt niet iemand met een hogere rol dan u muten.').then(m => m.delete({ timeout: 5000 }));

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
                        muteCount: 1,
                        warnCount: 0,
                        kickCount: 0,
                        banCount: 0,
                        mutePerson: true
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        muteCount: user.muteCount + 1,
                        mutePerson: true
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            let reason = 'Geen reden opgegeven';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`👄Je bent \`gemuted\` in **${message.guild.name}** \n**Reden**: ${reason}.`);
            await (member.roles.add(muteRol));
            message.channel.send(`${member} is **gemuted**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Persoon Gemuted')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Persoon', member.user.username)
                    .addField('ID persoon', member.id)
                    .addField('Gemute door', message.author)
                    .addField('Reden', reason);

                return logChannel.send(embed);
            };
        }
    }
};