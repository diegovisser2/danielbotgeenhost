const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
    name: 'suggestie',
    aliases: ['suggestion'],
    category: 'info',
    description: 'Hiermee kunt u suggestie doen.',
    usage: `suggestie [de suggestie]`,
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

        const suggestieKanaal = message.guild.channels.cache.get(guildDB.suggestieKanaal);

        if (!suggestieKanaal) return message.channel.send("The channel for suggestions is not set by the owner.");

        //!bug verwijderen in de bug embed.
        let suggestie = message.content.split(`${settings.prefix}suggestion`).join("");

        // Kijk na als er een bug is meegegeven.
        if (!suggestie) return message.channel.send(`No suggestion given, please write the suggestion behind ${settings.prefix}suggestion`);

        // Maak het embed aan.
        var suggestieEmbed = new MessageEmbed()
            .setTitle("New suggestion:")
            .setColor("GREEN")
            .addFields(
                { name: "Suggestion:", value: suggestie },
                { name: "Submitted by:", value: `${message.author}` }
            )

        suggestieKanaal.send(suggestieEmbed).then(embedMessage => {
            embedMessage.react('👍');
            embedMessage.react('👎');
        });

        var botEmbed = new MessageEmbed()
            .setDescription("✅ Your suggestion has been successfully sent to the suggestion channel!")
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

        const suggestieKanaal = message.guild.channels.cache.get(guildDB.suggestieKanaal);

        if (!suggestieKanaal) return message.channel.send("Het kanaal voor suggesties is niet door de owner ingesteld.");

        //!bug verwijderen in de bug embed.
        let suggestie = message.content.split(`${settings.prefix}suggestie`).join("");

        // Kijk na als er een bug is meegegeven.
        if (!suggestie) return message.channel.send(`Geen suggestie opgegeven, gelieve de suggestie achter ${settings.prefix}suggestie te schrijven.`);

        // Maak het embed aan.
        var suggestieEmbed = new MessageEmbed()
            .setTitle("Nieuwe suggestie:")
            .setColor("GREEN")
            .addFields(
                { name: "Suggestie:", value: suggestie },
                { name: "Ingezonden door:", value: `${message.author}` }
            )

        suggestieKanaal.send(suggestieEmbed).then(embedMessage => {
            embedMessage.react('👍');
            embedMessage.react('👎');
        });

        var botEmbed = new MessageEmbed()
            .setDescription("✅ Je suggestie is succesvol naar het suggestie kanaal gestuurd!")
            .setColor("GREEN")

        return message.channel.send(botEmbed);

        }
    }
}