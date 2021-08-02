const mongoose = require('mongoose');
const Guild = require('../models/guild');
const botConfig = require("../botConfig.json");
const { Channel } = require('discord.js');

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildNaam: guild.name,
        prefix: botConfig.prefix,
        Nederlands: false,
        Engels: true
    });

    guild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

    console.log(`✅ Toegevoegd in: ${guild.guildNaam}`);

};