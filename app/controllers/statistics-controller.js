const express = require('express');
const logger = require('winston');
const router = express.Router();
const musicDemandHelper = require('../models/music-demand');

router.get('/', function (req, res) {
    Promise.all([
        musicDemandHelper.findLastCreatedDemands(20),
        musicDemandHelper.findLastResolveddDemands(20),
        musicDemandHelper.countCreatedDemands(),
        musicDemandHelper.countResolvedDemands()
    ]).then(result => {
        res.json({
            lastCreatedDemands: result[0],
            lastResolvedDemands: result[1],
            numberOfCreatedDemands: result[2],
            numberOfResolvedDemands: result[3]
        });
        res.status(201);
    })
});

module.exports = router;