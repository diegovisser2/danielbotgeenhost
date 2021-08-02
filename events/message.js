const mongoose = require('mongoose');
const Guild = require('../models/guild');
const botConfig = require("../botConfig.json");

module.exports = async (client, message) => {
    if (message.author.bot) return;

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
            })

            newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

            return message.channel.send("Deze server was niet in de Database. We hebben het nu toegevoegd en alle bot commando's zouden nu moeten werken.").then(m => m.delete({ timeout: 10000 }));
        }
    });

    const prefix = settings.prefix;

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
};