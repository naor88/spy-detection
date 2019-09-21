const path = require('path');
const express = require("express");
const favicon = require('express-favicon');
const router = express.Router();

const clientDir = path.join(__dirname, '..', 'client', 'build');

router.use(favicon(path.join(clientDir, 'favicon.ico')));
router.use(express.static(clientDir));

router.get('/*', function (req, res) {
    res.sendFile(path.join(clientDir, 'index.html'));
});



module.exports = router;