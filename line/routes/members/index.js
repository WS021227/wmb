const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

// 供求
router.members = function (req, res) {
    let result={}
    result.nav = 'members'
    res.wrender('./pages/members.ejs', {
        results: result
    })
}

module.exports = router;