const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'unclaim',
    category: 'ticket',
    description: 'Hiermee kunt u een ticket unclaimen.',
    usage: `unclaim`,
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

            var unclaimedEmbed = new MessageEmbed()
                // .setTitle("Gebruiker toegevoegd")
                .setDescription(`✅ Ticket is unclaimed by ${claimer}.`)
                .setColor("ORANGE")
                .setFooter("This means everyone can type again.")
            // .addField("Toegevoegde gebruiker", `${addUser}`)
            // .addField("Toegevoegd door", message.author);

            message.channel.updateOverwrite(message.guild.roles.cache.find(y => y.name === "Support Team"), {
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                READ_MESSAGE_HISTORY: true,
                VIEW_CHANNEL: true,
                ADD_REACTIONS: true,
                MANAGE_CHANNELS: true
            });

            message.channel.send(unclaimedEmbed)

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

            var unclaimedEmbed = new MessageEmbed()
                // .setTitle("Gebruiker toegevoegd")
                .setDescription(`✅ Ticket is geunclaimed door ${claimer}.`)
                .setColor("ORANGE")
                .setFooter("Dit betekent dat weer iedereen in deze ticket kan typen.")
            // .addField("Toegevoegde gebruiker", `${addUser}`)
            // .addField("Toegevoegd door", message.author);

            message.channel.updateOverwrite(message.guild.roles.cache.find(y => y.name === "Support Team"), {
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                READ_MESSAGE_HISTORY: true,
                VIEW_CHANNEL: true,
                ADD_REACTIONS: true,
                MANAGE_CHANNELS: true
            });

            message.channel.send(unclaimedEmbed)
        }
    }
}