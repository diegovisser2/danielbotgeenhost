const { MessageEmbed } = require('discord.js');
const discord = require("discord.js");
const Guild = require('../../models/guild');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'close',
    category: 'ticket',
    description: 'Hiermee kunt u de ticket sluiten.',
    usage: `close [reden]`,
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

            let question = message.content.split(`${guildDB.prefix}close `).join("") || "No subject given";

            const categoryID = guildDB.ticketMap;
            if (!categoryID) return message.channel.send("The ticket folder is not set by the owner.");
            const Logs = message.guild.channels.cache.get(guildDB.logKanaalID);
            if (!Logs) return;

            if (question === `${guildDB.prefix}close`) question = "*No reason given*";

            if (!message.member.roles.cache.find(r => r.name === 'Support Team'))
                return message.reply('Your role is not "Support Team". Note the capital letters if this role does exist.');

            if (message.channel.parentID == categoryID) {
                message.channel.delete();

                var closeTicketEmbed = new discord.MessageEmbed()
                    .setTitle("Ticket | " + message.channel.name)
                    .setDescription(`**Closed ticket**: ${message.channel.name}\n\n**Closed by**: ${message.author}\n\n **Reason**: ${question}`)
                    .setColor("#33e5e8")

                // var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
                // if (!logs) return message.reply(`Het kanaal ${logs} is niet gevonden!`);

                Logs.send(closeTicketEmbed);

                try {

                    var closeDMEmbed = new discord.MessageEmbed()
                        .setTitle(`Ticket closed in the server ${message.guild.name}`)
                        .setDescription(`By staff member: **${message.author}** \n\n **Reason:** ${question} \n **Name ticket:** Ticket | ` + message.channel.name)
                        .setColor("36a832")
                    // .setFooter("Gemaakt door @Daniël#5215 en met hulp van @MrBradley__#0001")

                    // userName.send(closeDMEmbed);
                    client.users.cache.get(message.channel.topic.split(" ")[3]).send(closeDMEmbed);

                } catch (error) {
                    message.reply("Something went wrong");
                }

            } else {

                message.reply("This command can only be used in a ticket.");

            }

            // console.log(message.channel.topic.split(" ")[3]);
            // client.users.cache.get(message.channel.topic.split(" ")[3]).send('test');

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

            let question = message.content.split(`${guildDB.prefix}close `).join("") || "Geen onderwerp meegegeven";

            const categoryID = guildDB.ticketMap;
            if (!categoryID) return message.channel.send("Het mapje waar tickets in moeten komen is niet door de owner ingesteld.");
            const Logs = message.guild.channels.cache.get(guildDB.logKanaalID);
            if (!Logs) return;

            if (question === `${guildDB.prefix}close`) question = "*geen reden opgegeven*";

            if (!message.member.roles.cache.find(r => r.name === 'Support Team')) return message.reply('Uw rol is niet "Support Team". Let op de hoofdletters mocht deze rol wel bestaan.');

            if (message.channel.parentID == categoryID) {
                message.channel.delete();

                var closeTicketEmbed = new discord.MessageEmbed()
                    .setTitle("Ticket | " + message.channel.name)
                    .setDescription(`**Afgesloten ticket**: ${message.channel.name}\n\n**Gesloten door**: ${message.author}\n\n **Reden**: ${question}`)
                    .setColor("#33e5e8")

                // var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
                // if (!logs) return message.reply(`Het kanaal ${logs} is niet gevonden!`);

                Logs.send(closeTicketEmbed);

                try {

                    var closeDMEmbed = new discord.MessageEmbed()
                        .setTitle(`Ticket afgesloten in de server ${message.guild.name}`)
                        .setDescription(`Door staff-lid: **${message.author}** \n\n **Reden:** ${question} \n **Naam ticket:** Ticket | ` + message.channel.name)
                        .setColor("36a832")
                    // .setFooter("Gemaakt door @Daniël#5215 en met hulp van @MrBradley__#0001")

                    // userName.send(closeDMEmbed);
                    client.users.cache.get(message.channel.topic.split(" ")[3]).send(closeDMEmbed);

                } catch (error) {
                    message.reply("Er is iets fout gelopen");
                }

            } else {

                message.reply("Je kunt deze command niet buiten een ticket gebruiken!");

            }

            // console.log(message.channel.topic.split(" ")[3]);
            // client.users.cache.get(message.channel.topic.split(" ")[3]).send('test');    
        }
    }
}