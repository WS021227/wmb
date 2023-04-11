const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

// 发现人
router.members = function (req, res) {
    let results={
        nav : 'members',
        line_right_center_title : '最新开通'
    }
    let search_key={
        start: 0,
        sort: 2,
        size: 10,
        is_home:0,
        is_gq:1,
        has_topic:1,
        keyword:"",
        country:""
    }
    async.series([//串行且无关 顺序执行
        function (cb) {
            // 默认外贸人列表
            tools.getMasterApiQuery('/line/users', search_key, req, res,
            function (result) {
                let data = result.state == 0 ? result.data || {} : {}
                results.users_list = data.list || []
                results.total=data.total
                cb(null, 1)
            }
        )
    },
    function (cb) {
        search_key.sort=3
        search_key.size=3
        /* 最新开通 */
        tools.getMasterApiQuery('/line/users', search_key, req, res,
            function (result) {
                let data = result.state == 0 ? result.data || {} : {}
                results.users_recommend_list = data.list || []
                cb(null, 1)
            }
        )
    },
    ], function (err, _) {
        return res.wrender('./pages/members.ejs', {
            results: results
        });
    })
}

// 供求搜索
router.members_search = function (req, res) {
    let results={
        nav : 'members',
        search_key:req.params.search_key || ""
    }
    async.series([//串行且无关 顺序执行
        function (cb) {
            /*活跃用户*/
            tools.getMasterApiQuery('/line/users', {
                    start: 0,
                    sort: 2,
                    size: 10,
                    is_home:1
                }, req, res,
                function (result) {
                    let data = result.state == 0 ? result.data || {} : {}
                    results.users_active_list = data.list || []
                    cb(null, 1)
                }
            )
        },
    ], function (err, _) {
        return res.wrender('./pages/members.ejs', {
            results: results
        });
    })
}

module.exports = router;