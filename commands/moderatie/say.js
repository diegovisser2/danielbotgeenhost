const { MessageEmbed } = require('discord.js');
const Guild = require("../../models/guild")

module.exports = {
    name: 'zeg',
    aliases: ['say'],
    category: 'moderatie',
    description: 'Bot herhaalt wat je wilt zeggen.',
    usage: `zeg <titel> | <bericht> | <kleur> | <#kanaal>`,
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
                    .setDescription(`Create a message using: \n ${settings.prefix}say title ${seperator} message ${seperator} color ${seperator} channel \n\n You can choose between these colors: \n - green \n - red \n - orange \n - purple \n - blue \n - yellow \n - white \n - grey \n - gold`);

                return message.channel.send(embed);

            }

            var argsList = args.join(" ").split(seperator);

            if (argsList[2] === "green") argsList[2] = "GREEN";
            if (argsList[2] === "yellow") argsList[2] = "YELLOW";
            if (argsList[2] === "purple") argsList[2] = "PURPLE";
            if (argsList[2] === "white") argsList[2] = "WHITE";
            if (argsList[2] === "orange") argsList[2] = "ORANGE";
            if (argsList[2] === "red") argsList[2] = "RED";
            if (argsList[2] === "grey") argsList[2] = "GREY";
            if (argsList[2] === "gold") argsList[2] = "GOLD";
            if (argsList[2] === "blue") argsList[2] = "BLUE";
            if (argsList[2] === undefined) argsList[2] = "RANDOM";
            if (argsList[2] === " green ") argsList[2] = "GREEN";
            if (argsList[2] === " yellow ") argsList[2] = "YELLOW";
            if (argsList[2] === " purple ") argsList[2] = "PURPLE";
            if (argsList[2] === " white ") argsList[2] = "WHITE";
            if (argsList[2] === " orange ") argsList[2] = "ORANGE";
            if (argsList[2] === " red ") argsList[2] = "RED";
            if (argsList[2] === " grey ") argsList[2] = "GREY";
            if (argsList[2] === " gold ") argsList[2] = "GOLD";
            if (argsList[2] === " blue ") argsList[2] = "BLUE";
            if (argsList[3] === undefined) {
                var tweedeembed = new MessageEmbed()
                    .setTitle("Usage")
                    .setColor("#ebb446")
                    .setDescription(`Create a message using: \n ${settings.prefix}say title ${seperator} message ${seperator} color ${seperator} channel \n\n You can choose between these colors: \n - green \n - red \n - orange \n - purple \n - blue \n - yellow \n - white \n - grey \n - gold`);

                return message.channel.send(tweedeembed);
            }

            var options = {

                titel: argsList[0],
                bericht: argsList[1] || "No content given",
                kleur: argsList[2].trim(),
                kanaal: argsList[3].trim()

            }

            var zegEmbed = new MessageEmbed()
                .setColor(options.kleur)
                .setDescription(`**${options.titel}** \n\n ${options.bericht} \n\n Made by ${message.author}_`)

            var channel = await message.mentions.channels.first();
            if (!channel) return message.reply("I can't find the tagged channel.")

            channel.send(zegEmbed);

            var controleEmbed = new MessageEmbed()
                .setDescription("✅ It is successfully sent to the chosen channel!")
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

            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet gebruiken.");

            var seperator = "|";

            if (args[1] == null) {

                var embed = new MessageEmbed()
                    .setTitle("Gebruik")
                    .setColor("#ebb446")
                    .setDescription(`Maak een bericht aan door gebruik te maken van: \n ${settings.prefix}zeg titel ${seperator} bericht ${seperator} kleur ${seperator} kanaal \n\n Je kan kiezen tussen deze kleuren: \n - groen \n - rood \n - oranje \n - paars \n - blauw \n - geel \n - wit \n - grijs \n - goud`);

                return message.channel.send(embed);

            }

            var argsList = args.join(" ").split(seperator);

            if (argsList[2] === "groen") argsList[2] = "GREEN";
            if (argsList[2] === "geel") argsList[2] = "YELLOW";
            if (argsList[2] === "paars") argsList[2] = "PURPLE";
            if (argsList[2] === "wit") argsList[2] = "WHITE";
            if (argsList[2] === "oranje") argsList[2] = "ORANGE";
            if (argsList[2] === "rood") argsList[2] = "RED";
            if (argsList[2] === "grijs") argsList[2] = "GREY";
            if (argsList[2] === "goud") argsList[2] = "GOLD";
            if (argsList[2] === "blauw") argsList[2] = "BLUE";
            if (argsList[2] === undefined) argsList[2] = "RANDOM";
            if (argsList[2] === " groen ") argsList[2] = "GREEN";
            if (argsList[2] === " geel ") argsList[2] = "YELLOW";
            if (argsList[2] === " paars ") argsList[2] = "PURPLE";
            if (argsList[2] === " wit ") argsList[2] = "WHITE";
            if (argsList[2] === " oranje ") argsList[2] = "ORANGE";
            if (argsList[2] === " rood ") argsList[2] = "RED";
            if (argsList[2] === " grijs ") argsList[2] = "GREY";
            if (argsList[2] === " goud ") argsList[2] = "GOLD";
            if (argsList[2] === " blauw ") argsList[2] = "BLUE";
            if (argsList[3] === undefined) {
                var tweedeembed = new MessageEmbed()
                    .setTitle("Gebruik")
                    .setColor("#ebb446")
                    .setDescription(`Maak een bericht aan door gebruik te maken van: \n ${settings.prefix}zeg titel ${seperator} bericht ${seperator} kleur ${seperator} kanaal \n\n Je kan kiezen tussen deze kleuren: \n - groen \n - rood \n - oranje \n - paars \n - blauw \n - geel \n - wit \n - grijs \n - goud`);

                return message.channel.send(tweedeembed);
            }

            var options = {

                titel: argsList[0],
                bericht: argsList[1] || "Geen inhoud meegegeven",
                kleur: argsList[2].trim(),
                kanaal: argsList[3].trim()

            }

            var zegEmbed = new MessageEmbed()
                .setColor(options.kleur)
                .setDescription(`**${options.titel}** \n\n ${options.bericht} \n\n _Aangemaakt door ${message.author}_`)

            var channel = await message.mentions.channels.first();
            if (!channel) return message.reply("Dit kanaal bestaat niet.")

            channel.send(zegEmbed);

            var controleEmbed = new MessageEmbed()
                .setDescription("✅ Het is succesvol verstuurd naar het gekozen kanaal!")
                .setColor("GREEN")
            return message.channel.send(controleEmbed)
        }
    }
}