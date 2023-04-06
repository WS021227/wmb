const express = require('express');
const router = express.Router();

// 公共
const public_url_map=require('./public/url_map');
router.use('/', public_url_map);

// 首页
const common = require('./index');
router.get('/', common.index);
router.get('/async/nav/notification', common.nav_notification);
router.get('/async/sign/out', common.sign_out);
// 活跃推荐用户
router.get('/async/get_active_recommend',common.get_active_recommend);

// 发现人
const members_url_map=require('./members/url_map');
router.use('/', members_url_map);


// 供应
const postings_url_map=require('./postings/url_map');
router.use('/', postings_url_map);

// 我的主页
const me_url_map=require('./me/url_map');
router.use('/', me_url_map);


// line
const line_url_map = require('./line/url_map');
router.use('/', line_url_map);


// 圈子
const group_url_map = require('./group/url_map');
router.use('/', group_url_map);


module.exports = router;
