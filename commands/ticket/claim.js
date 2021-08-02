const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'claim',
    category: 'ticket',
    description: 'Hiermee kunt u een ticket claimen.',
    usage: `claim`,
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

            const categoryID = guildDB.ticketMap;
            if (!categoryID)
                return message.channel.send("The ticket folder is not set by the owner.");

            if (!message.member.roles.cache.find(r => r.name === 'Support Team'))
                return message.reply('Your role is not "Support Team". Note the capital letters if this role does exist.');

            if (message.channel.parentID != categoryID)
                return message.reply('This command can only be used in the set ticket folder.')

            const claimer = message.author

            var claimedEmbed = new MessageEmbed()
                // .setTitle("Gebruiker toegevoegd")
                .setDescription(`✅ Ticket is claimed by ${claimer}.`)
                .setColor("GREEN")
                .setFooter("This means that only you and the person who created the ticket can type. Do <prefix> unclaim to fix this.")
            // .addField("Toegevoegde gebruiker", `${addUser}`)
            // .addField("Toegevoegd door", message.author);

            message.channel.updateOverwrite(claimer, {
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                READ_MESSAGE_HISTORY: true,
                VIEW_CHANNEL: true,
                ADD_REACTIONS: true,
                MANAGE_CHANNELS: true
            });
            message.channel.updateOverwrite(message.guild.roles.cache.find(y => y.name === "Support Team"), {
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                CONNECT: false,
                READ_MESSAGE_HISTORY: true,
                VIEW_CHANNEL: true,
                ADD_REACTIONS: false,
                MANAGE_CHANNELS: false
            });

            message.channel.send(claimedEmbed)

        } else if (settings.Nederlands === true) {
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

            const categoryID = guildDB.ticketMap;
            if (!categoryID) return message.channel.send("Het mapje waar tickets in moeten komen is niet door de owner ingesteld.");

            if (!message.member.roles.cache.find(r => r.name === 'Support Team')) return message.reply('Uw rol is niet "Support Team". Let op de hoofdletters mocht deze rol wel bestaan.');

            if (message.channel.parentID != categoryID) return message.reply('Deze commando kan alleen gebruikt worden in het ingestelde ticket mapje.')

            const claimer = message.author

            var claimedEmbed = new MessageEmbed()
                // .setTitle("Gebruiker toegevoegd")
                .setDescription(`✅ Ticket is geclaimed door ${claimer}.`)
                .setColor("GREEN")
                .setFooter("Dit betekent dat alleen jij en degene die de ticket heeft aangemaakt, kan typen. Doe <prefix> unclaim om dit te herstellen.")
            // .addField("Toegevoegde gebruiker", `${addUser}`)
            // .addField("Toegevoegd door", message.author);

            message.channel.updateOverwrite(claimer, {
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                READ_MESSAGE_HISTORY: true,
                VIEW_CHANNEL: true,
                ADD_REACTIONS: true,
                MANAGE_CHANNELS: true
            });
            message.channel.updateOverwrite(message.guild.roles.cache.find(y => y.name === "Support Team"), {
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                CONNECT: false,
                READ_MESSAGE_HISTORY: true,
                VIEW_CHANNEL: true,
                ADD_REACTIONS: false,
                MANAGE_CHANNELS: false
            });

            message.channel.send(claimedEmbed)
        }
    }
}