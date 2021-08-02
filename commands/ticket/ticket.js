const { MessageEmbed } = require('discord.js');
const discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
    name: 'ticket',
    category: 'ticket',
    description: 'Hiermee kunt u een ticket aanmaken.',
    usage: `ticket [reden] of new [reden]`,
    aliases: ['new'],
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

            // const blacklistRol = message.member.roles.cache.get(role => role.name === blacklistRol);
            const blacklistRol = message.member.roles.cache.get(guildDB.blacklistRol);
            if (blacklistRol) return message.channel.send("You have the blacklist role. That means you can't create a ticket");

            //!new verwijderen in de ticket embed. 
            // let question = message.content.split(`${guildDB.prefix}ticket`).join("") || "Geen onderwerp meegegeven";
            let command = [`${guildDB.prefix}ticket`, `${guildDB.prefix}new`];


            let question = message.content.split(" ")[1] || "No subject given";
            // let question = command.forEach(cmd => {
            //     message.content.slice(cmd)
            // }) || "Geen onderwerp meegegeven";
            // console.log(message.content);



            const categoryId = guildDB.ticketMap;
            if (!categoryId) return message.channel.send("The ticket folder is not set by the owner.");

            if (question === `${guildDB.prefix}ticket`) question = "No subject";

            const userName = message.author.username;
            // const ticketOwner = message.author

            var ticketExcists = false;
            message.guild.channels.cache.forEach(channel => {
                if (channel.name == "ticket-" + userName.toLowerCase()) {
                    ticketExcists = true;
                    message.channel.send("You already have a ticket open.");
                    return;
                }
            });
            if (ticketExcists) return;
            message.guild.channels.create("ticket-" + userName.toLowerCase(), { type: 'text', topic: `User id is ${message.author.id}` }).then(
                (createdChannel) => {
                    createdChannel.setParent(categoryId).then(
                        (settedParent) => {

                            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === "@everyone"), {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false
                            });
                            settedParent.updateOverwrite(message.author.id, {
                                CREATE_INSTANT_INVITE: false,
                                SEND_MESSAGES: true,
                                ATTACH_FILES: true,
                                CONNECT: true,
                                READ_MESSAGE_HISTORY: true,
                                VIEW_CHANNEL: true,
                                ADD_REACTIONS: true
                            });
                            settedParent.updateOverwrite(message.guild.roles.cache.find(y => y.name === "Support Team"), {
                                SEND_MESSAGES: true,
                                ATTACH_FILES: true,
                                CONNECT: true,
                                READ_MESSAGE_HISTORY: true,
                                VIEW_CHANNEL: true,
                                ADD_REACTIONS: true,
                                MANAGE_CHANNELS: true
                            });
                            settedParent.send({
                                embed: {
                                    title: `**Ticket van ${message.author.username}**`,
                                    description: `Hello ${message.author.username},\n\nYou can already send your question/complaint. The Support Team will help you as soon as possible. \n\n**Subject** \n${question}`,
                                    color: "BLUE"
                                }
                            });
                            message.channel.send({
                                embed: {
                                    // title: `Hallo ${message.author.username}!`,
                                    // description: `Uw ticket is aangemaakt! \n\n Ticket: ${settedParent}`,
                                    description: `You can find your ticket here: ${settedParent}`,
                                    color: "BLUE"
                                }
                            });
                        });
                }).catch(err => {
                    message.reply("Something went wrong.");
                });
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

            // const blacklistRol = message.member.roles.cache.get(role => role.name === blacklistRol);
            const blacklistRol = message.member.roles.cache.get(guildDB.blacklistRol);
            if (blacklistRol) return message.channel.send("Je hebt de blacklist rol. Daardoor kan je geen ticket aanmaken.");

            //!new verwijderen in de ticket embed. 
            // let question = message.content.split(`${guildDB.prefix}ticket`).join("") || "Geen onderwerp meegegeven";
            let command = [`${guildDB.prefix}ticket`, `${guildDB.prefix}new`];


            let question = message.content.split(" ")[1] || "Geen onderwerp meegegeven";
            // let question = command.forEach(cmd => {
            //     message.content.slice(cmd)
            // }) || "Geen onderwerp meegegeven";
            // console.log(message.content);



            const categoryId = guildDB.ticketMap;
            if (!categoryId) return message.channel.send("Het mapje waar tickets in moeten komen is niet door de owner ingesteld.");

            if (question === `${guildDB.prefix}ticket`) question = "geen onderwerp";

            const userName = message.author.username;
            // const ticketOwner = message.author

            var ticketExcists = false;
            message.guild.channels.cache.forEach(channel => {
                if (channel.name == "ticket-" + userName.toLowerCase()) {
                    ticketExcists = true;
                    message.channel.send("U hebt al een ticket openstaan.");
                    return;
                }
            });
            if (ticketExcists) return;
            message.guild.channels.create("ticket-" + userName.toLowerCase(), { type: 'text', topic: `Gebruikers id is ${message.author.id}` }).then(
                (createdChannel) => {
                    createdChannel.setParent(categoryId).then(
                        (settedParent) => {

                            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === "@everyone"), {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false
                            });
                            settedParent.updateOverwrite(message.author.id, {
                                CREATE_INSTANT_INVITE: false,
                                SEND_MESSAGES: true,
                                ATTACH_FILES: true,
                                CONNECT: true,
                                READ_MESSAGE_HISTORY: true,
                                VIEW_CHANNEL: true,
                                ADD_REACTIONS: true
                            });
                            settedParent.updateOverwrite(message.guild.roles.cache.find(y => y.name === "Support Team"), {
                                SEND_MESSAGES: true,
                                ATTACH_FILES: true,
                                CONNECT: true,
                                READ_MESSAGE_HISTORY: true,
                                VIEW_CHANNEL: true,
                                ADD_REACTIONS: true,
                                MANAGE_CHANNELS: true
                            });
                            settedParent.send({
                                embed: {
                                    title: `**Ticket van ${message.author.username}**`,
                                    description: `Goedendag ${message.author.username},\n\nU kunt alvast uw vraag/klacht sturen. Het Support Team zal u zo snel mogelijk helpen. \n\n**Onderwerp** \n${question}`,
                                    color: "BLUE"
                                }
                            });
                            message.channel.send({
                                embed: {
                                    // title: `Hallo ${message.author.username}!`,
                                    // description: `Uw ticket is aangemaakt! \n\n Ticket: ${settedParent}`,
                                    description: `U kunt uw ticket hier vinden: ${settedParent}`,
                                    color: "BLUE"
                                }
                            });
                        });
                }).catch(err => {
                    message.reply("Er is iets foutgelopen");
                });
        }
    }
}