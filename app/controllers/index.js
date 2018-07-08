let express = require('express');
let router = express.Router();

router.use('/music', require('./music-demands-controller'));

module.exports = router;