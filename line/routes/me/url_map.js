const express = require('express');
const router = express.Router();

const me = require('./index')

router.get('/me', me.me)//外贸人详情页

module.exports = router;
