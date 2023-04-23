const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

// 供求
router.postings = function (req, res) {
    let results={
        nav : 'postings',
    }
    let search_key={
        start:0,
        size:20,
        is_gq : 1
    }
    async.series([//串行且无关 顺序执行
        function (cb) {
            // 默认外贸人列表
            tools.getMasterApiQuery('/line/topic/list', search_key, req, res,
            function (result) {
                let data = result.state == 0 ? result.data || {} : {}
                results.users_list = data.list || []
                results.total=data.total
                cb(null, 1)
            }
        )
    },
    ], function (err, _) {
        return res.wrender('./pages/postings.ejs', {
            results: results
        });
    })
}

// 供求搜索
router.postings_search = function (req, res) {
    let results={
        nav : 'postings',
        search_key:req.params.search_key || ""
    }
    async.series([//串行且无关 顺序执行
        function (cb) {
            /*活跃用户*/
            tools.getMasterApiQuery('/line/users', {
                    start: 0,
                    sort: 2,
                    size: 10,
                    is_home:0,
                }, req, res,
                function (result) {
                    let data = result.state == 0 ? result.data || {} : {}
                    results.users_active_list = data.list || []
                    cb(null, 1)
                }
            )
        },
    ], function (err, _) {
        return res.wrender('./pages/postings.ejs', {
            results: results
        });
    })
}

router.get_postings_list=function (req, res) {
    let results={}
    let search=req.query
    // 默认外贸人列表
    tools.getMasterApiQuery('/line/topic/list', search, req, res,
    function (result) {
        console.log(result,"69696996969")
        let data = result.state == 0 ? result.data || {} : {}
        results.users_list = data.list || []
        results.static_url=result.static_url
        res.send(results)
    })
}

module.exports = router;