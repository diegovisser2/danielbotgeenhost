const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");


module.exports = {
    name: 'blacklist',
    category: 'ticket',
    description: 'Hiermee kan je regelen dat iemand met de rol "Blacklist" geen ticket kan aanmaken.',
    usage: `blacklist <@persoon> [reden]`,
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
                        prefix: botConfig.token,
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
            if (!logChannel) return message.channel.send("The log channel is not set by the owner.");
            const Blacklisted = message.guild.roles.cache.get(guildDB.blacklistRol);
            if (!Blacklisted) return message.channel.send("The blacklist role is not set by the owner.")

            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.channel.send('You have no rights to use this command.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send("I can't find the tagged person.").then(m => m.delete({ timeout: 5000 }));

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send("You can't give someone a blacklist who has a role that is higher than your role.").then(m => m.delete({ timeout: 5000 }));


            let reason = 'No reason given';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`🎫You are \`blacklisted\` in **${message.guild.name}** \n**Reason**: ${reason}.`);
            await (member.roles.add(Blacklisted));
            message.channel.send(`${member} is **blacklisted**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Person Blacklisted')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Person', member.user.username)
                    .addField('ID person', member.id)
                    .addField('Blacklisted by', message.author)
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
                        prefix: botConfig.token,
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
            if (!logChannel) return message.channel.send("Het logkanaal is niet door de owner ingesteld.");
            const Blacklisted = message.guild.roles.cache.get(guildDB.blacklistRol);
            if (!Blacklisted) return message.channel.send("De blacklist rol is niet door de owner ingesteld.")

            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.channel.send('U hebt geen recht om deze commando te gebruiken.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send('Ik kan de getagte persoon niet vinden.').then(m => m.delete({ timeout: 5000 }));

            if (message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send('U kunt niet iemand bannen die een rol heeft die hoger is dan uw rol.').then(m => m.delete({ timeout: 5000 }));


            let reason = 'Geen reden opgegeven';

            if (args.length > 1) reason = args.slice(1).join(' ');

            member.send(`🎫Je bent \`geblacklist\` in **${message.guild.name}** \n**Reden**: ${reason}.`);
            await (member.roles.add(Blacklisted));
            message.channel.send(`${member} is **geblacklist**!`);
            if (!logChannel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Persoon Geblacklist')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Persoon', member.user.username)
                    .addField('ID persoon', member.id)
                    .addField('Geblacklist door', message.author)
                    .addField('Reden', reason);

                return logChannel.send(embed);
            };
        }
    }
};