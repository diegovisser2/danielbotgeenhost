const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");


module.exports = {
    name: 'unmute',
    category: 'moderatie',
    description: 'unmute the mentioned user of your server.',
    usage: `unmute <@user> [reason]`,
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
                        banCount: 0,
                        mutePerson: false
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        mutePerson: false
                    })
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

            if (!member) return message.reply("I can't find the tagged person.");

            if (!message.guild.me.hasPermission("KICK_MEMBERS"))
                return message.reply("I have not enough rights to use this command.");

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send("You can't unmute someone who has a role that is higher than your role.").then(m => m.delete({ timeout: 5000 }));

            let reason = 'No reason given';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`👄You are \`unmuted\` in **${message.guild.name}** \n**Reason**: ${reason}.`);
            await (member.roles.remove(muteRol));
            message.channel.send(`${member} bent **geunmuted**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Person Unmuted')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Person', member.user.username)
                    .addField('ID person', member.id)
                    .addField('Unmuted by', message.author)
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
                        banCount: 0,
                        mutePerson: false
                    });

                    await newUser.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        mutePerson: false
                    })
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                };
            });

            const muteRol = message.guild.roles.cache.get(guildDB.muteRol);
            if (!muteRol) return message.channel.send("De muterol is niet door de owner ingesteld.");
            const logChannel = message.guild.channels.cache.get(guildDB.logKanaalID);
            if (!logChannel) return;


            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("U heeft geen recht om deze commando te gebruiken.");

            if (!member) return message.reply("Geen persoon opgegeven.");

            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Ik kan dit met mijn huidige perms niet doen.");

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send('U kunt niet iemand unmuten die een hogere rol heeft dan u.').then(m => m.delete({ timeout: 5000 }));

            let reason = 'Geen reden opgegeven';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`👄Je bent \`unmuted\` in **${message.guild.name}** \n**Reden**: ${reason}.`);
            await (member.roles.remove(muteRol));
            message.channel.send(`${member} bent **geunmuted**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Persoon geunmute')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Persoon', member.user.username)
                    .addField('ID persoon', member.id)
                    .addField('Geunmute door', message.author)
                    .addField('Reden', reason);

                return logChannel.send(embed);
            };
        }
    }
};