const express = require('express');
const router = express.Router();

const detail = require('./index')

router.get('/detail/:user_id', detail.user_xq)//外贸人详情页
router.get('/async/get_new_or_hot',detail.get_new_or_hot)//最新、热门切换

module.exports = router;
