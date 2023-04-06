const express = require('express');
const router = express.Router();

const line = require('./line')


router.get('/line/:id?', line.index)//外贸人详情页
router.get('/async/follow', line.follow)
router.get('/async/unfollow', line.unfollow)

router.get('/async/members', line.members_list)
router.get('/async/hot/key', line.hot_keys)

router.get('/async/full/pop', line.full_pop)

module.exports = router;
