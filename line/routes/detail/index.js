const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

// 用户详情页面
router.user_xq = function (req, res) {
    let user_id=req.params.user_id

    let results={
        nav : 'members',
        title:'',
        search_key:req.params.user_id || "",
        children:'members-detail'
    }

    async.series([//串行且无关 顺序执行
        function (cb) {
            // 当前用户数据
            tools.getMasterApiQuery(`/line/info/${user_id}`, req, res,
                function (result) {
                    console.log(result,"用户详情数据")
                    let data = result.state == 0 ? result.data || {} : {}
                    results.users_active_list = data.list || []
                    cb(null, 1)
                }
            )
        },
        // function (cb) {
            // // right-top、同行推荐
            // tools.getMasterApiQuery('/line/users', {
            //         start: 0,
            //         sort: 2,
            //         size: 10,
            //         is_home:1
            //     }, req, res,
            //     function (result) {
            //         let data = result.state == 0 ? result.data || {} : {}
            //         results.users_active_list = data.list || []
            //         cb(null, 1)
            //     }
            // )
        // },
    ], function (err, _) {
        return res.wrender('./pages/detail.ejs', {
            results: results
        });
    })
}

module.exports = router;