const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
    name: 'poll',
    category: 'moderatie',
    description: 'Hiermee kunt u uw eigen poll maken.',
    usage: `poll <eerste stelling> | <tweede stelling> | <#kanaal>`,
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

            if (!message.member.hasPermission("KICK_MEMBERS"))
                return message.reply("You have no rights to use this command.");

            var seperator = "|";

            if (args[1] == null) {

                var embed = new MessageEmbed()
                    .setTitle("Usage")
                    .setColor("#ebb446")
                    .setDescription(`Create a poll using:: \n ${settings.prefix}poll <first statement> ${seperator} <second statement> ${seperator} <#channel>`);

                return message.channel.send(embed);

            }
            var argsList = args.join(" ").split(seperator);

            if (argsList[2] === undefined) {
                var tweedeembed = new MessageEmbed()
                    .setTitle("Usage")
                    .setColor("#ebb446")
                    .setDescription(`Create a poll using:: \n ${settings.prefix}poll <first statement> ${seperator} <second statement> ${seperator} <#channel>`);

                return message.channel.send(tweedeembed);

            }
            var options = {

                eersteStelling: argsList[0],
                tweedeStelling: argsList[1] || "No content given",
                kanaal: argsList[2].trim(),

            }

            var aankondigingEmbed = new MessageEmbed()
                .setTitle("Poll")
                .setColor("#2ba3b3")
                .setDescription(`**First statement:** \n ${options.eersteStelling} \n\n **Second statement:** \n ${options.tweedeStelling} \n\n _Poll was created by ${message.author}_`)

            var channel = await message.mentions.channels.first();
            if (!channel) return message.channel.send("I can't find the tagged channel.")

            channel.send(aankondigingEmbed).then(embedMessage => {
                embedMessage.react('1️⃣');
                embedMessage.react('2️⃣');
            });

            var controleEmbed = new MessageEmbed()
                .setDescription("✅ The poll has been successfully sent to the chosen channel!")
                .setColor("GREEN")
            return message.channel.send(controleEmbed)
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

                    return message.channel.send('Deze server was niet in onze Database! We hebben uw server toegevoegd, typ astublieft het commando opnieuw.').then(m => m.delete({ timeout: 10000 }));
                }
            });

            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet gebruiken");

            var seperator = "|";

            if (args[1] == null) {

                var embed = new MessageEmbed()
                    .setTitle("Gebruik")
                    .setColor("#ebb446")
                    .setDescription(`Maak een poll aan door gebruik te maken van: \n ${settings.prefix}poll <eerste stelling> ${seperator} <tweede stelling> ${seperator} <#kanaal>`);

                return message.channel.send(embed);

            }
            var argsList = args.join(" ").split(seperator);

            if (argsList[2] === undefined) {
                var tweedeembed = new MessageEmbed()
                    .setTitle("Gebruik")
                    .setColor("#ebb446")
                    .setDescription(`Maak een poll aan door gebruik te maken van: \n ${settings.prefix}poll <eerste stelling> ${seperator} <tweede stelling> ${seperator} <#kanaal>`);

                return message.channel.send(tweedeembed);

            }
            var options = {

                eersteStelling: argsList[0],
                tweedeStelling: argsList[1] || "Geen inhoud meegegeven",
                kanaal: argsList[2].trim(),

            }

            var aankondigingEmbed = new MessageEmbed()
                .setTitle("Poll")
                .setColor("#2ba3b3")
                .setDescription(`**Eerste stelling:** \n ${options.eersteStelling} \n\n **Tweede stelling:** \n ${options.tweedeStelling} \n\n _Poll is aangemaakt door ${message.author}_`)

            var channel = await message.mentions.channels.first();
            if (!channel) return message.channel.send("Dit kanaal bestaat niet.")

            channel.send(aankondigingEmbed).then(embedMessage => {
                embedMessage.react('1️⃣');
                embedMessage.react('2️⃣');
            });

            var controleEmbed = new MessageEmbed()
                .setDescription("✅ De poll is succesvol verstuurd naar het gekozen kanaal!")
                .setColor("GREEN")
            return message.channel.send(controleEmbed)
        }
    }
}