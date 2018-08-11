"use strict";

const mongoose = require('mongoose');
const uuid = require('node-uuid');
const logger = require('winston');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    demandId: {type: String, default: uuid.v4},
    artiste: String,
    fullDiscography: Boolean,
    album: String,
    year: String,
    genre: String,
    creation_date: Date,
    resolveDate: Date
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

        if (!demand.artiste) {
            return new Promise((resolve, reject) => {
                reject('Malformed request. Artiste or Album missing.');
            });
        }

        return demand.save()
            .then(() => demand)
            .catch(err => {
                logger.error("Could not save music demand : " + err);
            });
    }

    static resolveMusicDemand(demandId) {
        let query = {demandId: demandId, resolveDate: {$exists: false}};
        return musicModel.findOneAndUpdate(query, {resolveDate: new Date()}, {new: true})
            .then(result => result)
            .catch(err => {
                logger.error("Could not resolve music demand : " + err);
            });
    }

    static getAllMusicDemands() {
        return musicModel.find({})
            .then(result => result)
            .catch(err => {
                logger.error("Could not get all music demand : " + err);
            });

    }

    static getMusicDemandById(demandId) {
        let query = {demandId: demandId};
        return musicModel.findOne(query)
            .then(result => result)
            .catch(err => {
                logger.error("Could not get music demand by id: " + err);
            });
    }

}

module.exports = MusicDemand;