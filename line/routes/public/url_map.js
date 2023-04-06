const express = require('express');
const router = express.Router();

const public = require('./index')

router.post('/async/follow', public.follow)

module.exports = router;
