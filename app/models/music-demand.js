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

    static findLastCreatedDemands(lastDemandsNumber) {
        return musicModel.find()
            .sort({creation_date: 'desc'})
            .limit(lastDemandsNumber)
            .then(result => result)
            .catch(err => {
                logger.error("Could not find last " + lastDemandsNumber + " created demands: " + err);
            });
    }

    static findLastResolveddDemands(lastDemandsNumber) {
        let query = {resolveDate: {$exists: true}};
        return musicModel.find(query)
            .sort({resolveDate: 'desc'})
            .limit(lastDemandsNumber)
            .then(result => result)
            .catch(err => {
                logger.error("Could not find last " + lastDemandsNumber + " resolved demands: " + err);
            });
    }

    static countCreatedDemands() {
        return musicModel.count()
            .then(result => result)
            .catch(err => {
                logger.error("Could not find total number of created demands: " + err);
            });
    }

    static countResolvedDemands() {
        let query = {resolveDate: {$exists: true}};
        return musicModel.count(query)
            .then(result => result)
            .catch(err => {
                logger.error("Could not find total number of resolved demands: " + err);
            });
    }

}

module.exports = MusicDemand;