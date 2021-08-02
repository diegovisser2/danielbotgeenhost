const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');
const botConfig = require("../../botConfig.json");

module.exports = {
    name: 'help',
    category: 'info',
    description: 'Laat het help bericht van de bot zien.',
    usage: `help [commandoNaam]`,
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
            return;
        } else if (settings.Nederlands === true) {

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
                await Guild.findOne({
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
                            filterScheldwoorden: false
                        });

                        newGuild.save()
                            .then(result => console.log(result))
                            .catch(err => console.error(err));
                    }
                });

                if (args[0]) {
                    return getCMD(client, message, args[0]);
                } else {
                    return helpMSG(client, message);
                }

                async function helpMSG(client, message) {
                    const guildDB = await Guild.findOne({
                        guildID: message.guild.id
                    });

                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('Help')
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`For a full list of commands, please type \`${guildDB.prefix}commands\` \n\nTo see more info about a specific command, please type \`${guildDB.prefix}help <command>\` without the \`<>\``)
                        .addField('Links', "[Support Server](https://discord.gg/2E5fhn3)\n[Website](https://danielbots.ml)\n[Bot invite](https://discord.com/oauth2/authorize?client_id=720638338813526114&scope=bot&permissions=4228906239)\n[Youtube](https://www.youtube.com/channel/UCupmAwzLunFxILZ72zpaAIQ)")
                        .setFooter('Created by @Daniël#5215');
                    message.channel.send(embed);
                }

                async function getCMD(client, message, input) {
                    const guildDB = await Guild.findOne({
                        guildID: message.guild.id
                    });

                    const embed = new MessageEmbed()

                    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

                    let info = `No information found for command **${input.toLowerCase()}**`;

                    if (!cmd) {
                        return message.channel.send(embed.setColor('#ff0000').setDescription(info));
                    }

                    if (cmd.name) info = `**Command Name**: ${cmd.name}`
                    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
                    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
                    if (cmd.usage) {
                        info += `\n**Gebruik**: ${guildDB.prefix}${cmd.usage}`;
                        embed.setFooter('<> = REQUIRED | [] = OPTIONAL')
                    }
                    if (cmd.usage2) info += `\n**Usage 2**: ${guildDB.prefix}${cmd.usage2}`;

                    return message.channel.send(embed.setColor("GREEN").setDescription(info));
                }

            } else if (settings.Nederlands === true) {
                await Guild.findOne({
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
                            filterScheldwoorden: false
                        });

                        newGuild.save()
                            .then(result => console.log(result))
                            .catch(err => console.error(err));
                    }
                });

                if (args[0]) {
                    return getCMD(client, message, args[0]);
                } else {
                    return helpMSG(client, message);
                }
            }

            async function helpMSG(client, message) {
                const guildDB = await Guild.findOne({
                    guildID: message.guild.id
                });

                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle('Hulp')
                    .setThumbnail(client.user.avatarURL())
                    .setDescription(`Voor een lijst met alle commando's, typ alstublieft \`${guildDB.prefix}commands\` \n\nOm meer info van een specifieke commando te zien, typ astublieft \`${guildDB.prefix}help <command>\` zonder de \`<>\``)
                    .addField('Links', "[Support Server](https://discord.gg/2E5fhn3)\n[Website](https://danielbots.ml)\n[Bot invite](https://discord.com/oauth2/authorize?client_id=720638338813526114&scope=bot&permissions=4228906239)\n[Youtube](https://www.youtube.com/channel/UCupmAwzLunFxILZ72zpaAIQ)")
                    .setFooter('Gemaakt door @Daniël#5215');
                message.channel.send(embed);
            }

            async function getCMD(client, message, input) {
                const guildDB = await Guild.findOne({
                    guildID: message.guild.id
                });

                const embed = new MessageEmbed()

                const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

                let info = `Geen informatie gevonden over de commando **${input.toLowerCase()}**`;

                if (!cmd) {
                    return message.channel.send(embed.setColor('#ff0000').setDescription(info));
                }

                if (cmd.name) info = `**Commando Naam**: ${cmd.name}`
                // if (cmd.aliases) info += `\n**Afkorting**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
                if (cmd.description) info += `\n**Beschrijving**: ${cmd.description}`;
                if (cmd.usage) {
                    info += `\n**Gebruik**: ${guildDB.prefix}${cmd.usage}`;
                    embed.setFooter('<> = VERPLICHT | [] = OPTIONEEL')
                }
                if (cmd.usage2) info += `\n**Usage 2**: ${guildDB.prefix}${cmd.usage2}`;

                return message.channel.send(embed.setColor("GREEN").setDescription(info));
            }
        }
    }
}