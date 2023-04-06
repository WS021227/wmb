const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

// 供求
router.me = function (req, res) {
    let result={}
    result.nav = 'me'
    res.wrender('./pages/me.ejs', {
        results: result
    })
}

module.exports = router;