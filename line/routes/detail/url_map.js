const express = require('express');
const router = express.Router();

const detail = require('./index')

router.get('/detail/:user_id', detail.user_xq)//外贸人详情页

module.exports = router;
