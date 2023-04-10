const express = require('express');
const router = express.Router();

const postings = require('./index')

router.get('/postings', postings.postings)
router.get('/postings/:search_key', postings.postings_search)
router.get('/async/postings/get_postings_list',postings.get_postings_list)

module.exports = router;
