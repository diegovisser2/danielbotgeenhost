const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildNaam: String,
    prefix: String,
    logKanaalID: String,
    muteRol: String,
    standaardRol: String,
    welkomsKanaal: String,
    totZiensKanaal: String,
    bugKanaal: String,
    suggestieKanaal: String,
    ticketMap: String,
    reviewKanaal: String,
    blacklistRol: String,
    filterLinks: Boolean,
    filterScheldwoorden: Boolean,
    Nederlands: Boolean,
    Engels: Boolean
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');