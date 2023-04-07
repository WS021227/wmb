const express = require('express');
const router = express.Router();

const members = require('./index')

router.get('/members', members.members)//外贸人详情页
router.get('/members/:search_key', members.members_search)//外贸人详情页

module.exports = router;
