const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();
router.index = function (req, res) {
    var results = {
        nav: 'index'
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

// 获取活跃、推荐数据
router.get_active_recommend = function (req, res) {
    let search = req.query
    console.log(search,"8888")
    tools.getMasterApiQuery('/line/users', search, req, res,
      function (result) {
        console.log(result,"活跃、推荐数据")
        res.send(result)
      }
    )
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

router.nav_notification = function (req, res) {
    tools.login_verify(res, 2, function () {
        tools.getMasterApiQuery('/line/nav/stats', {}, req, res, function (result) {
            res.send(result)
        })
    })
}

function del_default_img(list){
    console.log(list,"用户数据-------------------用户数据")
}

module.exports = router;