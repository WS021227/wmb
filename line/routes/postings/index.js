const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

// 供求
router.postings = function (req, res) {
    let result = {}
    result.nav = 'postings'
    res.wrender('./pages/postings.ejs', {
        results: result
    })
}

module.exports = router;