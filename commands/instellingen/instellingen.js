const { MessageEmbed } = require('discord.js');
const Guild = require("../../models/guild")

module.exports = {
    name: 'instellingen',
    aliases: ['settings'],
    category: 'instellingen',
    description: 'Hiermee kunt u al uw ingestelde functies zien.',
    usage: `instellingen`,
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
                        prefix: botConfig.token,
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
    
            const embed = new MessageEmbed()
                .addFields(
                    {
                        name: 'Log channel:',
                        value: guildDB.logKanaalID ? '✅' : '❌', 
                        inline: true
                    },
                    {
                        name: 'Mute role:',
                        value: guildDB.muteRol ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Standard rol:',
                        value: guildDB.standaardRol ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Welcome channel:',
                        value: guildDB.welkomsKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Good bye channel:',
                        value: guildDB.totZiensKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Bug channel:', 
                        value: guildDB.bugKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Suggestion channel:',
                        value: guildDB.suggestieKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Ticket folder:',
                        value: guildDB.ticketMap ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Review channel:',
                        value: guildDB.reviewKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Blacklist role:',
                        value: guildDB.blacklistRol ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Filter for links:',
                        value: guildDB.filterLinks ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Filter for swear words:',
                        value: guildDB.filterScheldwoorden ? '✅' : '❌',
                        inline: true
                    }
                )
                .setColor("GOLD")
                .setFooter("✅ = set | ❌ = not set")
            return message.channel.send(embed)
    
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
                        prefix: botConfig.token,
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

            const embed = new MessageEmbed()
                .addFields(
                    {
                        name: 'Log kanaal:',
                        value: guildDB.logKanaalID ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Mute rol:',
                        value: guildDB.muteRol ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Standaard rol:',
                        value: guildDB.standaardRol ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Welkoms kanaal:',
                        value: guildDB.welkomsKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Tot ziens kanaal:',
                        value: guildDB.totZiensKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Bug kanaal:',
                        value: guildDB.bugKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Suggestie kanaal:',
                        value: guildDB.suggestieKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Ticket mapje:',
                        value: guildDB.ticketMap ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Review kanaal:',
                        value: guildDB.reviewKanaal ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Blacklist rol:',
                        value: guildDB.blacklistRol ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Filter voor links:',
                        value: guildDB.filterLinks ? '✅' : '❌',
                        inline: true
                    },
                    {
                        name: 'Filter voor scheldwoorden:',
                        value: guildDB.filterScheldwoorden ? '✅' : '❌',
                        inline: true
                    }
                )
                .setColor("GOLD")
                .setFooter("✅ = ingesteld | ❌ = niet ingesteld")
            return message.channel.send(embed)

        }
    }
}