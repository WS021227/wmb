const express = require('express');
const router = express.Router();

const public = require('./index')

router.post('/async/follow', public.follow)

router.get('/async/get_active_recommend',public.get_active_recommend);

module.exports = router;
