const express = require('express');
const router = express.Router();

const members = require('./index')

router.get('/members', members.members)//外贸人详情页

module.exports = router;
