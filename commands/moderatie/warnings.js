const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'warnings',
    category: 'moderatie',
    description: 'Hiermee kunt u zien hoeveel warns iemand heeft.',
    usage: `warnings <@persoon>`,
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

            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.channel.send('You have no rights to use this command.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send("I can't find the tagged person.").then(m => m.delete({ timeout: 5000 }));

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
                        banCount: 0,
                        mutePerson: false
                    });

                    await newUser.save()
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
                };
            });

            // Zo haal je data uit de DB van User.
            const warnCount = settings.warnCount

            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Warnings`)
                .setThumbnail(member.user.avatarURL())
                .addField('Person', member.user.username)
                .addField('ID person', member.id)
                .addField("Number of warns:", warnCount);

            return message.channel.send(embed)

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

            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.channel.send('U heeft geen recht om deze commando te gebruiken.').then(m => m.delete({ timeout: 5000 }));

            if (!member)
                return message.channel.send('Ik kan de getagte persoon niet vinden.').then(m => m.delete({ timeout: 5000 }));

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
                        banCount: 0,
                        mutePerson: false
                    });

                    await newUser.save()
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
                };
            });

            // Zo haal je data uit de DB van User.
            const warnCount = settings.warnCount

            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Warnings`)
                .setThumbnail(member.user.avatarURL())
                .addField('Persoon', member.user.username)
                .addField('ID persoon', member.id)
                .addField("Aantal warns:", warnCount);

            return message.channel.send(embed)

        }
    }
}