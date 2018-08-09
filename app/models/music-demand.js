"use strict";

const mongoose = require('mongoose');
const uuid = require('node-uuid');
const logger = require('winston');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    _id: {type: String, default: uuid.v4},
    artiste: String,
    fullDiscography: Boolean,
    album: String,
    year: String,
    genre: String,
    creation_date: Date
});
const musicModel = mongoose.model('MusicDemands', musicSchema);

class MusicDemand {

    static createNewMusicDemand(values) {
        let demand = new musicModel({
            artiste: values.artiste,
            fullDiscography: values.fullDiscography,
            album: values.album,
            year: values.year,
            genre: values.genre,
            creation_date: new Date()
        });

        return demand.save()
            .then(() => demand.id)
            .catch(() => logger.error("Can't create demand"));
    }

    static getAllMusicDemands() {
        return musicModel.find({})
            .then(result => result)
            .catch(err => err);

    }

    static getMusicDemandById(id) {
        return musicModel.findById(id)
            .then(result => result)
            .catch(err => err);
    }

}

module.exports = MusicDemand;