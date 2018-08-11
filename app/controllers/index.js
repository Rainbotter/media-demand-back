let express = require('express');
let router = express.Router();

router.use('/stats', require('./statistics-controller'));
router.use('/music', require('./music-demands-controller'));

module.exports = router;