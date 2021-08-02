const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
    name: 'bug',
    category: 'info',
    description: 'Hiermee kunt u een bug melden.',
    usage: `bug [de bug]`,
    run: async (client, message, args,) => {

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

            const bugKanaal = message.guild.channels.cache.get(guildDB.bugKanaal);

            if (!bugKanaal) return message.channel.send("The channel for bugs is not set by the owner.");

            //!bug verwijderen in de bug embed.
            let bug = message.content.split(`${settings.prefix}bug`).join("");

            // Kijk na als er een bug is meegegeven.
            if (!bug) return message.channel.send(`No bug specified, please write the bug behind ${settings.prefix}bug.`);

            // Maak het embed aan.
            var bugEmbed = new MessageEmbed()
                .setTitle("New bug:")
                .setColor("#ff0008")
                .addFields(
                    { name: "bug:", value: bug },
                    { name: "Submitted by:", value: `${message.author}` }
                )

            bugKanaal.send(bugEmbed)

            var botEmbed = new MessageEmbed()
                .setDescription("✅ Your bug has been successfully sent to the bug channel!")
                .setColor("GREEN")

            return message.channel.send(botEmbed);

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

            const bugKanaal = message.guild.channels.cache.get(guildDB.bugKanaal);

            if (!bugKanaal) return message.channel.send("Het kanaal voor bugs is niet door de owner ingesteld.");

            //!bug verwijderen in de bug embed.
            let bug = message.content.split(`${settings.prefix}bug`).join("");
            message.delete()

            // Kijk na als er een bug is meegegeven.
            if (!bug) return message.channel.send(`Geen bug opgegeven, gelieve de bug achter ${settings.prefix}bug te schrijven.`);

            // Maak het embed aan.
            var bugEmbed = new MessageEmbed()
                .setTitle("Nieuwe bug:")
                .setColor("#ff0008")
                .addFields(
                    { name: "bug:", value: bug },
                    { name: "Ingezonden door:", value: `${message.author}` }
                )

            bugKanaal.send(bugEmbed)

            var botEmbed = new MessageEmbed()
                .setDescription("✅ Je bug is succesvol naar het bug kanaal gestuurd!")
                .setColor("GREEN")

            return message.channel.send(botEmbed);

        }
    }
}