const express = require('express');
const router = express.Router();
const de = require('../../common/decorator');

const group = require('./group')
// 圈子
router.get('/group', group.index)
router.get('/group-:id?', group.detail)
router.get('/async/inbound/group', de.sign_required(), group.inbound_group)
router.get('/async/exit/group', de.sign_required(), group.exit_group)
// 圈子成员
router.get('/group-:id?/member', group.member)
router.get('/async/member', group.member_list)
// 贴子列表
router.get('/group-:id?/topic', group.topic)
router.get('/async/topic', group.topic_list)
router.post('/async/topic/add', group.topic_add)
router.get('/async/topic/report', group.topic_report)
router.get('/async/topic/reply', group.topic_reply)
router.post('/async/topic/reply', de.sign_required(), group.topic_reply_add)
router.post('/async/upload/topic/image', de.sign_required(), group.upload_topic_image)



// 贴子
router.get('/topic/:id?', group.topic_detail)
router.get('/async/topic/views', group.topic_views)

module.exports = router;
