const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();
router.index = function (req, res) {
    var results = {
        nav: 'index',
        line_right_center_title:'供求信息'
    };
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
        function (cb) {
            /*供求信息*/
            tools.getMasterApiQuery('/line/topic/home/recommend', {
                top_count:3
                }, req, res,
                function (result) {
                    console.log(result,"首页推荐供求数据")
                    let data = result.state == 0 ? result.data || {} : {}
                    results.users_recommend_list = data.list || []
                    cb(null, 1)
                }
            )
        },
    ], function (err, _) {
        return res.wrender('./pages/index.ejs', {
            results: results
        });
    })
}

router.sign_out = function (req, res) {
    try {
        tools.setCookie(req, res, 'access_token', '', 0, false)
        tools.setCookie(req, res, 'su_token', '', 0, false)
        tools.setCookie(req, res, 'third', '', 0, false)
        tools.setCookie(req, res, '_LINE_GI', '', 0, false)
    } catch (e) {

    }
    res.send({})
}

// 导航统计 新消息等等
router.nav_notification = function (req, res) {
    tools.login_verify(res, 2, function () {
        tools.getMasterApiQuery('/line/nav/stats', {}, req, res, function (result) {
            res.send(result)
        })
    })
}

module.exports = router;
