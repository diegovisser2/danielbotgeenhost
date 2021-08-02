const { MessageEmbed } = require('discord.js');
const Guild = require("../../models/guild")

module.exports = {
    name: 'review',
    category: 'info',
    description: 'Hiermee kunt u een review plaatsen.',
    usage: `review <aantal sterren> | <review>`,
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
    
            const reviewKanaal = message.guild.channels.cache.get(guildDB.reviewKanaal);
            if (!reviewKanaal) return message.channel.send("The channel for reviews is not set by the owner.");
    
            const settings = await Guild.findOne({
                guildID: message.guild.id
            }, (err, guild) => {
                if (err) console.error(err)
                if (!guild) {
                    const newGuild = new Guild({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        guildNaam: message.guild.name,
                        prefix: botConfig.prefix
                    })
    
                    newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
    
                    return message.channel.send('This server was not in our database. We have now added it. Please retype your command.').then(m => m.delete({ timeout: 10000 }));
                }
            });
    
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
            var seperator = "|";
    
            if (args[1] == null) {
    
                var embed = new MessageEmbed()
                    .setTitle("Usage")
                    .setColor("#00ee00")
                    .setDescription(`Create a review using: \n ${settings.prefix}review <number of stars> ${seperator} <review>`);
    
                return message.channel.send(embed);
    
            }
    
            var argsList = args.join(" ").split(seperator);
    
            var options = {
    
                sterren: argsList[0].trim(),
                bericht: argsList[1] || "-"
    
            }
    
            if (args[0] == "1") {
    
    
                var eensterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: New review made by ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Stars:", value: ":star:☆☆☆☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(eensterEmbed).then(embedMessage => {
                    embedMessage.react("🤬");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Your review has been successfully sent to the review channel!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
            } else if (args[0] == "2") {
    
                var tweesterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: New review made by ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Stars:", value: ":star::star:☆☆☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(tweesterEmbed).then(embedMessage => {
                    embedMessage.react("😔");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Your review has been successfully sent to the review channel!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
            } else if (args[0] == "3") {
    
                var driesterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: New review made by ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Stars:", value: ":star::star::star:☆☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(driesterEmbed).then(embedMessage => {
                    embedMessage.react("😏");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Your review has been successfully sent to the review channel!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
    
            } else if (args[0] == "4") {
    
                var viersterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: New review made by ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Stars:", value: ":star::star::star::star:☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(viersterEmbed).then(embedMessage => {
                    embedMessage.react("🤗");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Your review has been successfully sent to the review channel!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
    
            } else if (args[0] == "5") {
    
    
                var vijfsterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: New review made by ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Stars:", value: ":star::star::star::star::star:" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(vijfsterEmbed).then(embedMessage => {
                    embedMessage.react("😁");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Your review has been successfully sent to the review channel!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
            }
    
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
    
            const reviewKanaal = message.guild.channels.cache.get(guildDB.reviewKanaal);
            if (!reviewKanaal) return message.channel.send("Het kanaal voor reviews is niet door de owner ingesteld.");
    
            const settings = await Guild.findOne({
                guildID: message.guild.id
            }, (err, guild) => {
                if (err) console.error(err)
                if (!guild) {
                    const newGuild = new Guild({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        guildNaam: message.guild.name,
                        prefix: botConfig.prefix
                    })
    
                    newGuild.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
    
                    return message.channel.send('Deze server was niet in onze Database! We hebben uw server toegevoegd, typ astublieft het commando opnieuw.').then(m => m.delete({ timeout: 10000 }));
                }
            });
    
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
            var seperator = "|";
    
            if (args[1] == null) {
    
                var embed = new MessageEmbed()
                    .setTitle("Gebruik")
                    .setColor("#00ee00")
                    .setDescription(`Maak een review aan door gebruik te maken van: \n ${settings.prefix}review <aantal sterren> ${seperator} <review>`);
    
                return message.channel.send(embed);
    
            }
    
            var argsList = args.join(" ").split(seperator);
    
            var options = {
    
                sterren: argsList[0].trim(),
                bericht: argsList[1] || "-"
    
            }
    
            if (args[0] == "1") {
    
    
                var eensterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: Nieuwe review door ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Sterren:", value: ":star:☆☆☆☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(eensterEmbed).then(embedMessage => {
                    embedMessage.react("🤬");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Je review is succesvol naar het review kanaal gestuurd!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
            } else if (args[0] == "2") {
    
                var tweesterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: Nieuwe review door ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Sterren:", value: ":star::star:☆☆☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(tweesterEmbed).then(embedMessage => {
                    embedMessage.react("😔");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Je review is succesvol naar het review kanaal gestuurd!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
            } else if (args[0] == "3") {
    
                var driesterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: Nieuwe review door ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Sterren:", value: ":star::star::star:☆☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(driesterEmbed).then(embedMessage => {
                    embedMessage.react("😏");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Je review is succesvol naar het review kanaal gestuurd!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
    
            } else if (args[0] == "4") {
    
                var viersterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: Nieuwe review door ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Sterren:", value: ":star::star::star::star:☆" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(viersterEmbed).then(embedMessage => {
                    embedMessage.react("🤗");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Je review is succesvol naar het review kanaal gestuurd!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
    
    
            } else if (args[0] == "5") {
    
    
                var vijfsterEmbed = new MessageEmbed()
                    // ${(user.user.displayAvatarURL({ dynamic: true }))} 
                    .setTitle(`:star: Nieuwe review door ${message.author.username} :star:`)
                    .setColor("#ffde3b")
                    .addFields(
                        { name: "Review", value: `${options.bericht}` },
                        { name: "Sterren:", value: ":star::star::star::star::star:" }
                    )
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
                reviewKanaal.send(vijfsterEmbed).then(embedMessage => {
                    embedMessage.react("😁");
                });
    
                var botEmbed = new MessageEmbed()
                    .setDescription("✅ Je review is succesvol naar het review kanaal gestuurd!")
                    .setColor("#00ff00")
    
                return message.channel.send(botEmbed);
            }    
        }
    }
}