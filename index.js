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
//     //en code
// } else if (settings.Nederlands === true) {
//     //nl code
// }

const { Client, Collection } = require('discord.js');
const token = require("./botConfig.json");
const botConfig = require("./botConfig.json");
const { config } = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const client = new Client();
const Guild = require('./models/guild');
const User = require('./models/user');
const { MessageEmbed } = require('discord.js');
const { settings } = require('cluster');


client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./commands/');

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

client.on("ready", async () => {

    let activities = [`${client.guilds.cache.size} servers`, `${client.users.cache.size} members`, "Daniël Bots Support", "-help for help",]
    i = 0;
    setInterval(() => {
        client.user.setPresence({
            activity: {
                name: activities[i++ % activities.length],
                type: "WATCHING"
            }
        })
    }, 50000);

});

client.on("guildMemberAdd", async member => {

    const settings = await Guild.findOne({
        guildID: member.guild.id
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
            guildID: member.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
                    guildNaam: member.guild.name,
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

        const standaardRol = member.guild.roles.cache.find(r => r.id === guildDB.standaardRol)
        if (!standaardRol)
            return;
        const welkomsKanaal = member.guild.channels.cache.find(r => r.id === guildDB.welkomsKanaal)
        if (!welkomsKanaal)
            return;
        // var role = member.guild.roles.cache.get(standaardRol);
        if (!standaardRol) return;
        member.roles.add(standaardRol);

        if (!welkomsKanaal) return;

        welkomsKanaal.send({
            embed: {
                title: `WELCOME`,
                description: `Welcome <@!${member.id}> in ${member.guild.name}!\nThere are now **${member.guild.memberCount}** members in the server!`,
                color: "GREEN",
                // timestamp: new Date(),
                // thumbnail: {
                //    url: member.user.avatarURL({ dynamic: true }) ? member.user.avatarURL({ dynamic: true }) : null
                // },
                // footer: {
                //    text: "WELKOM"
                // }
            }
        });

        const userDB = await User.findOne({
            guildID: member.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
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

        if (!userDB.mutePerson) {
            return; // niet gemute
        } else if (userDB.mutePerson) {
            member.roles.add(guildDB.muteRol);
            return; // wel gemute
        }
    } else if (settings.Nederlands === true) {
        const guildDB = await Guild.findOne({
            guildID: member.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
                    guildNaam: member.guild.name,
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

        const standaardRol = member.guild.roles.cache.find(r => r.id === guildDB.standaardRol)
        if (!standaardRol)
            return;
        const welkomsKanaal = member.guild.channels.cache.find(r => r.id === guildDB.welkomsKanaal)
        if (!welkomsKanaal)
            return;
        // var role = member.guild.roles.cache.get(standaardRol);
        member.roles.add(standaardRol);

        welkomsKanaal.send({
            embed: {
                title: `WELKOM`,
                description: `Welkom <@!${member.id}> in ${member.guild.name}!\nEr zijn nu **${member.guild.memberCount}** leden in deze server!`,
                color: "GREEN",
                // timestamp: new Date(),
                // thumbnail: {
                //    url: member.user.avatarURL({ dynamic: true }) ? member.user.avatarURL({ dynamic: true }) : null
                // },
                // footer: {
                //    text: "WELKOM"
                // }
            }
        });

        const userDB = await User.findOne({
            guildID: member.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
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

        if (!userDB.mutePerson) {
            return; // niet gemute
        } else if (userDB.mutePerson) {
            member.roles.add(guildDB.muteRol);
            return; // wel gemute
        }
    }
});

client.on("guildMemberRemove", async (member) => {

    const settings = await Guild.findOne({
        guildID: member.guild.id
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
            guildID: member.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
                    guildNaam: member.guild.name,
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

        const totZiensKanaal = member.guild.channels.cache.find(r => r.id === guildDB.totZiensKanaal)
        if (!totZiensKanaal) return;

        totZiensKanaal.send({
            embed: {
                title: `GOOD BYE`,
                description: `<@!${member.id}> has unfortunately left the server!\nThere are now **${member.guild.memberCount}** members!`,
                color: "ORANGE",
                // timestamp: new Date(),
                // thumbnail: {
                //     url: member.user.avatarURL({ dynamic: true }) ? member.user.avatarURL({ dynamic: true }) : null
                // },
                // footer: {
                //     text: "TOT ZIENS"
                // }
            }
        });
    } else if (settings.Nederlands === true) {
        const guildDB = await Guild.findOne({
            guildID: member.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
                    guildNaam: member.guild.name,
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

        const totZiensKanaal = member.guild.channels.cache.find(r => r.id === guildDB.totZiensKanaal)
        if (!totZiensKanaal) return;

        totZiensKanaal.send({
            embed: {
                title: `TOT ZIENS`,
                description: `<@!${member.id}> heeft helaas de server verlaten!\nEr zijn nu nog **${member.guild.memberCount}** leden!`,
                color: "ORANGE",
                // timestamp: new Date(),
                // thumbnail: {
                //     url: member.user.avatarURL({ dynamic: true }) ? member.user.avatarURL({ dynamic: true }) : null
                // },
                // footer: {
                //     text: "TOT ZIENS"
                // }
            }
        });
    }
});

client.on("messageDelete", async (message) => {

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
        message.channel.messages.fetch({ limit: 100 });

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

        const logChannel = message.guild.channels.cache.get(guildDB.logKanaalID);
        if (!logChannel) return;

        const embed = new MessageEmbed()
            .setTitle("New message deleted!")
            .setDescription(`**${message.author.tag} deleted a message in <#${message.channel.id}>**`)
            .setColor("#ff0000")
            .addField(`Deleted message`, message.content || 'An embed deleted', true)
        logChannel.send(embed)
    } else if (settings.Nederlands === true) {
        message.channel.messages.fetch({ limit: 100 });

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

        const logChannel = message.guild.channels.cache.get(guildDB.logKanaalID);
        if (!logChannel) return;

        const embed = new MessageEmbed()
            .setTitle("Nieuw bericht verwijdert!")
            .setDescription(`**${message.author.tag} heeft een bericht verwijdert in <#${message.channel.id}>**`)
            .setColor("#ff0000")
            .addField(`Verwijderde bericht`, message.content || 'Kon tekst niet ophalen | Embed verwijderd', true)
        logChannel.send(embed)
    }
});

client.on("messageUpdate", async (oldMessage, newMessage) => {

    if (oldMessage.content == newMessage.content) return;

    const settings = await Guild.findOne({
        guildID: oldMessage.guild.id
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
        oldMessage.channel.messages.fetch({ limit: 100 });

        const guildDB = await Guild.findOne({
            guildID: newMessage.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: newMessage.guild.id,
                    guildNaam: newMessage.guild.name,
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
                    Nederlands: false,
                    Engels: true
                });

                await newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
            };
        });

        const logChannel = newMessage.guild.channels.cache.get(guildDB.logKanaalID);
        if (!logChannel) return;

        const veranderdembed = new MessageEmbed()
            .setTitle(`New message edited`)
            .setColor(`#9c1010`)
            .setDescription(
                `**${oldMessage.author.tag} edited a message in <#${oldMessage.channel.id}>**`
            )
            .addField(`Old message`, oldMessage.content || 'Could not get text', true)
            .addField(`New message`, newMessage.content || 'Could not get text', true)
        logChannel.send(veranderdembed)
    } else if (settings.Nederlands === true) {
        oldMessage.channel.messages.fetch({ limit: 100 });

        const guildDB = await Guild.findOne({
            guildID: newMessage.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: newMessage.guild.id,
                    guildNaam: newMessage.guild.name,
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
                    Nederlands: false,
                    Engels: true
                });

                await newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
            };
        });

        const logChannel = newMessage.guild.channels.cache.get(guildDB.logKanaalID);
        if (!logChannel) return;

        const veranderdembed = new MessageEmbed()
            .setTitle(`Nieuw bericht bewerkt`)
            .setColor(`#9c1010`)
            .setDescription(
                `**${oldMessage.author.tag} heeft een bericht bewerkt in <#${oldMessage.channel.id}>**`
            )
            .addField(`Oud bericht`, oldMessage.content || 'Kon tekst niet ophalen', true)
            .addField(`Nieuw bericht`, newMessage.content || 'Kon tekst niet ophalen', true)
        logChannel.send(veranderdembed)
    }
});

client.on('guildCreate', guild => {
    let channelID
    let channels = guild.channels.cache
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type
        if (channelType === "text") {
            channelID = c[0]
            break channelLoop
        }
    }
    let channel = client.channels.cache.get(guild.systemChannelID || channelID)

    var welkomEmbed = new MessageEmbed()
        // .setDescription("Hartstikke bedankt voor het toevoegen van **Daniël Bot** in uw server!\n\nWanneer u -help typt, ziet u hoe alles werkt. U kunt zelfs uw prefix veranderen! Wanneer u -commands typt, ziet u bij het kopje instellingen de kanalen en rollen die u kunt instellen. Dit is natuurlijk super belangrijk als u wilt dat de commando's zoals ticket en mute werken. U kunt checken of alles is ingesteld door -ingestelde-functies of -if te typen.\n\nBij vragen kunt u ze gerust stellen in de [Support Server](https://discord.gg/2E5fhn3).")
        .setTitle("Thanks for adding Daniël Bot")
        .addFields(
            {
                name: "Generally:",
                value: "**NL:**\nU kunt de taal aanpassen door `<prefix>taal` te typen. Standaard prefix is `-`.\n\n**EN:**\nYou can change the language by typing `<prefix>language`. Standard prefix is `-`.",
                inline: false
            },
            {
                name: "Nederlands:",
                value: "Wanneer u `-help` typt, ziet u hoe alles werkt. U kunt zelfs uw prefix veranderen! Wanneer u `-commands` typt, ziet u bij het kopje instellingen de kanalen en rollen die u kunt instellen. Dit is natuurlijk super belangrijk als u wilt dat de commando's zoals ticket en mute werken. U kunt checken of alles is ingesteld door `<prefix>instellingen` te typen.\n\nBij vragen kunt u ze gerust stellen in de [Support Server](https://discord.gg/2E5fhn3).",
                inline: false
            },
            {
                name: "English:",
                value: "When you type `-help`, you see how everything works. You can even change your prefix! When you type `-commands`, you will see the channels and roles that you can set under the settings heading. This is obviously super important if you want the commands like ticket and mute to work. You can check if everything is set up by typing `-settings`.\n\nIf you have any questions, feel free to ask them in the [Support Server](https://discord.gg/2E5fhn3).",
                inline: false
            })
        .setColor("ORANGE")
        .setFooter("Bot made by @Daniël#5215")
        .setThumbnail("https://media.discordapp.net/attachments/753991127371219107/869911617620541470/danielbot.png")
    channel.send(welkomEmbed)
})

var links = ["https://discord.gg/", "discord.gg/",];
var swearWords = ["kut", "kanker", "mongool", "tyfus", "tering", "kkr", "mongolen", "mogool", "mogolen", "tiefus", "fuck", "fack", "Fuck", "bitch", "asshole", "bastard",];

client.on("message", async message => {

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
                filterScheldwoorden: false
            });

            await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
        };
    });

    if (!guildDB.filterScheldwoorden) {
        return; // niet gemute
    } else if (guildDB.filterScheldwoorden) {
        var msg = message.content.toLowerCase();

        for (let i = 0; i < swearWords.length; i++) {
            if (msg.includes(swearWords[i])) {
                message.delete();
                if (settings.Engels === true) {
                    return message.channel.send(`<@!${message.author.id}>, Swearing is forbidden!`).then(msg => msg.delete({ timeout: 3000 }));
                } else if (settings.Nederlands === true) {
                    return message.channel.send(`<@!${message.author.id}>, Schelden is verboden!`).then(msg => msg.delete({ timeout: 3000 }));
                }
            }
        }
    }

    if (!guildDB.filterLinks) {
        return; // niet gemute
    } else if (guildDB.filterLinks) {
        var msg = message.content.toLowerCase();

        for (let i = 0; i < links.length; i++) {
            if (msg.includes(links[i])) {
                message.delete();
                if (settings.Engels === true) {
                    return message.channel.send(`<@!${message.author.id}>, Advertising is forbidden!`).then(msg => msg.delete({ timeout: 3000 }));
                } else if (settings.Nederlands === true) {
                    return message.channel.send(`<@!${message.author.id}>, Reclame is verboden!`).then(msg => msg.delete({ timeout: 3000 }));
                }
            }
        }
    }
})


client.mongoose.init();
client.login(process.env.token);