const { MessageEmbed, Message } = require('discord.js');
const Guild = require('../../models/guild');
const { stripIndents } = require('common-tags');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'commands',
    category: 'info',
    description: 'Laat zien een lijst met alle commands',
    usage: `commands`,
    run: async (client, message) => {

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
            }, (err, guild) => {
                if (err) console.error(err)
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

                    newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                }
            });

            const EngelsEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Command List")
                .setThumbnail(client.user.avatarURL())
                .setFooter("Made by @Daniël#5215")
                .setDescription("Here you can see all commands of the bot.")
                .addFields(
                    {
                        name: "Information",
                        value: `- \`${guildDB.prefix}botinfo\`\n- \`${guildDB.prefix}commands\`\n- \`${guildDB.prefix}help\`\n- \`${guildDB.prefix}invite\`\n- \`${guildDB.prefix}ping\`\n- \`${guildDB.prefix}profile-picture\`\n- \`${guildDB.prefix}serverinfo\`\n- \`${guildDB.prefix}whois\``,
                        inline: true
                    },
                    {
                        name: "Ticket",
                        value: `- \`${guildDB.prefix}add\`\n- \`${guildDB.prefix}blacklist\`\n- \`${guildDB.prefix}claim\`\n- \`${guildDB.prefix}close\`\n- \`${guildDB.prefix}remove\`\n- \`${guildDB.prefix}ticket\`\n- \`${guildDB.prefix}unblacklist\`\n- \`${guildDB.prefix}unclaim\``,
                        inline: true
                    },
                    {
                        name: "Moderation",
                        value: `- \`${guildDB.prefix}ban\`\n- \`${guildDB.prefix}clear\`\n- \`${guildDB.prefix}kick\`\n- \`${guildDB.prefix}mute\`\n- \`${guildDB.prefix}poll\`\n- \`${guildDB.prefix}say\`\n- \`${guildDB.prefix}unmute\`\n- \`${guildDB.prefix}unwarn\`\n- \`${guildDB.prefix}warn\`\n- \`${guildDB.prefix}warnings\``,
                        inline: true
                    },
                    {
                        name: "Settings",
                        value: `- \`${guildDB.prefix}blacklistrole\`\n- \`${guildDB.prefix}bugchannel\`\n- \`${guildDB.prefix}filterlinks\`\n- \`${guildDB.prefix}filter-swearwords\`\n- \`${guildDB.prefix}settings\`\n- \`${guildDB.prefix}language\`\n- \`${guildDB.prefix}modlog\`\n- \`${guildDB.prefix}muterole\`\n- \`${guildDB.prefix}prefix\`\n- \`${guildDB.prefix}reviewchannel\`\n- \`${guildDB.prefix}standardrole\`\n- \`${guildDB.prefix}suggestionchannel\`\n- \`${guildDB.prefix}ticketfolder\`\n- \`${guildDB.prefix}goodbyechannel\`\n- \`${guildDB.prefix}welcomechannel\``,
                        inline: true
                    },
                    {
                        name: "Others",
                        value: `- \`${guildDB.prefix}bug\`\n- \`${guildDB.prefix}review\`\n- \`${guildDB.prefix}suggestion\``,
                        inline: true
                    }
                )
            return message.channel.send(EngelsEmbed)

        } else if (settings.Nederlands === true) {

            const guildDB = await Guild.findOne({
                guildID: message.guild.id
            }, (err, guild) => {
                if (err) console.error(err)
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

                    newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                }
            });

            const NederlandsEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Commando Lijst")
                .setThumbnail(client.user.avatarURL())
                .setFooter("Gemaakt door @Daniël#5215")
                .setDescription(`Hier zie je alle commando's van de bot. Gebruik \`${guildDB.prefix}help <commandoNaam>\` zonder de \`<>\` om meer info te zien over het specifieke commando.`)
                .addFields(
                    {
                        name: "Informatie",
                        value: `- \`${guildDB.prefix}botinfo\`\n- \`${guildDB.prefix}commands\`\n- \`${guildDB.prefix}help\`\n- \`${guildDB.prefix}invite\`\n- \`${guildDB.prefix}ping\`\n- \`${guildDB.prefix}profielfoto\`\n- \`${guildDB.prefix}serverinfo\`\n- \`${guildDB.prefix}spelerinfo\``,
                        inline: true
                    },
                    {
                        name: "Ticket",
                        value: `- \`${guildDB.prefix}add\`\n- \`${guildDB.prefix}blacklist\`\n- \`${guildDB.prefix}claim\`\n- \`${guildDB.prefix}close\`\n- \`${guildDB.prefix}remove\`\n- \`${guildDB.prefix}ticket\`\n- \`${guildDB.prefix}unblacklist\`\n- \`${guildDB.prefix}unclaim\``,
                        inline: true
                    },
                    {
                        name: "Moderatie",
                        value: `- \`${guildDB.prefix}ban\`\n- \`${guildDB.prefix}clear\`\n- \`${guildDB.prefix}kick\`\n- \`${guildDB.prefix}mute\`\n- \`${guildDB.prefix}poll\`\n- \`${guildDB.prefix}zeg\`\n- \`${guildDB.prefix}unmute\`\n- \`${guildDB.prefix}unwarn\`\n- \`${guildDB.prefix}warn\`\n- \`${guildDB.prefix}warnings\``,
                        inline: true
                    },
                    {
                        name: "Instellingen",
                        value: `- \`${guildDB.prefix}blacklistrol\`\n- \`${guildDB.prefix}bugkanaal\`\n- \`${guildDB.prefix}filterlinks\`\n- \`${guildDB.prefix}filter-scheldwoorden\`\n- \`${guildDB.prefix}instellingen\`\n- \`${guildDB.prefix}taal\`\n- \`${guildDB.prefix}modlog\`\n- \`${guildDB.prefix}muterol\`\n- \`${guildDB.prefix}prefix\`\n- \`${guildDB.prefix}reviewkanaal\`\n- \`${guildDB.prefix}standaardrol\`\n- \`${guildDB.prefix}suggestiekanaal\`\n- \`${guildDB.prefix}ticketmapje\`\n- \`${guildDB.prefix}totzienskanaal\`\n- \`${guildDB.prefix}welkomkanaal\``,
                        inline: true
                    },
                    {
                        name: "Overig",
                        value: `- \`${guildDB.prefix}bug\`\n- \`${guildDB.prefix}review\`\n- \`${guildDB.prefix}suggestie\``,
                        inline: true
                    }
                )
            return message.channel.send(NederlandsEmbed)
        }
    }
}

// const settings = await Guild.findOne({
//     guildID: message.guild.id
// }, (err, guild) => {
//     if (err) console.error(err)
//     if (!guild) {
//         const newGuild = new Guild({
//             _id: mongoose.Types.ObjectId(),
//             guildID: message.guild.id,
//             guildNaam: message.guild.name,
//             prefix: botConfig.prefix,
//             Nederlands: false,
//             Engels: true
//         })

//         newGuild.save()
//             .then(result => console.log(result))
//             .catch(err => console.error(err));

//         return message.channel.send('This server was not in our database. We have now added it. Please retype your command.').then(m => m.delete({ timeout: 10000 }));
//     }
// });
// if (settings.Engels === true) {

//     await Guild.findOne({
//         guildID: message.guild.id
//     }, (err, guild) => {
//         if (err) console.error(err)
//         if (!guild) {
//             const newGuild = new Guild({
//                 _id: mongoose.Types.ObjectId(),
//                 guildID: message.guild.id,
//                 guildNaam: message.guild.name,
//                 prefix: botConfig.prefix,
//                 logKanaalID: null,
//                 muteRol: null,
//                 standaardRol: null,
//                 welkomsKanaal: null,
//                 totZiensKanaal: null,
//                 bugKanaal: null,
//                 suggestieKanaal: null,
//                 ticketMap: null,
//                 reviewKanaal: null,
//                 blacklistRol: null,
//                 filterLinks: false,
//                 filterScheldwoorden: false,
//                 Nederlands: false,
//                 Engels: true
//             });

//             newGuild.save()
//                 .then(result => console.log(result))
//                 .catch(err => console.error(err));
//         }
//     });

//     return getAll(client, message);

//     async function getAll(client, message) {
//         const guildDB = await Guild.findOne({
//             guildID: message.guild.id
//         });

//         const embed = new MessageEmbed()
//             .setColor("GREEN")
//             .setTitle('Command List')
//             .setThumbnail(client.user.avatarURL())
//             .setFooter('Created by Daniël#5215')

//         const commands = (category) => {
//             return client.commands
//                 .filter(cmd => cmd.category === category)
//                 .map(cmd => `- \`${(guildDB.prefix) + cmd.name}\``)
//                 .join('\n');
//         }

//         const info = client.categories
//             .map(cat => stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}** \n${commands(cat)}`)
//             .reduce((string, category) => `${string}\n${category}`);

//         return message.channel.send(embed.setDescription('Use `' + (`${guildDB.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n${info}`)));
//     }
// } else if (settings.Nederlands === true) {
//     await Guild.findOne({
//         guildID: message.guild.id
//     }, (err, guild) => {
//         if (err) console.error(err)
//         if (!guild) {
//             const newGuild = new Guild({
//                 _id: mongoose.Types.ObjectId(),
//                 guildID: message.guild.id,
//                 guildNaam: message.guild.name,
//                 prefix: botConfig.prefix,
//                 logKanaalID: null,
//                 muteRol: null,
//                 standaardRol: null,
//                 welkomsKanaal: null,
//                 totZiensKanaal: null,
//                 bugKanaal: null,
//                 suggestieKanaal: null,
//                 ticketMap: null,
//                 reviewKanaal: null,
//                 blacklistRol: null,
//                 filterLinks: false,
//                 filterScheldwoorden: false,
//                 Nederlands: false,
//                 Engels: true
//             });

//             newGuild.save()
//                 .then(result => console.log(result))
//                 .catch(err => console.error(err));
//         }
//     });

//     return getAll(client, message);


//     async function getAll(client, message) {
//         const guildDB = await Guild.findOne({
//             guildID: message.guild.id
//         });

//         const embed = new MessageEmbed()
//             .setColor("GREEN")
//             .setTitle('Command List')
//             .setThumbnail(client.user.avatarURL())
//             .setFooter('Gemaakt door Daniël#5215')

//         const commands = (category) => {
//             return client.commands
//                 .filter(cmd => cmd.category === category)
//                 .map(cmd => `- \`${(guildDB.prefix) + cmd.name}\``)
//                 .join('\n');
//         }

//         const info = client.categories
//             .map(cat => stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}** \n${commands(cat)}`)
//             .reduce((string, category) => `${string}\n${category}`);

//         return message.channel.send(embed.setDescription('Gebruik `' + (`${guildDB.prefix}help <commandoNaam>\` zonder de \`<>\` om meer info te zien over het specifieke commando.\n\n${info}`)));

//     }
// }