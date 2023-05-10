const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

// 用户详情页面
router.user_xq = function (req, res) {
    let user_id=req.params.user_id

    let results={
        nav : 'members',
        line_right_center_title:'同行推荐',
        children:'members-detail'
    }

    async.series([//串行且无关 顺序执行
        function (cb) {
            // 当前用户数据
            tools.getMasterApiQuery(`/line/info/${user_id}`,{}, req, res,
                function (result) {
                    let data = result.state == 0 ? result.data || {} : {}
                    results.users_data = data || {}
                    cb(null, 1)
                }
            )
        },
        function (cb) {
            // 同行推荐
            tools.getMasterApiQuery(`/line/personal/users/recommend/${user_id}`, {
                top_count: 5
              },
              req, res,
              function (result) {
                console.log(result.data.list,"同行推荐数据")
                results.users_recommend_list = result.data.list
                cb(null, 1)
              }
            )
        },
        function (cb) {
            // 获取最新帖子
            let search_key={
                keyword:"",
                sort:2,
                start:0,
                size:10,
                has_reply:1,
                type_id:3,
                is_gq:1,
                has_follow:0,
                is_manage:0,
                user_id:user_id,
                exclude_id:0,
            }
            tools.getMasterApiQuery(`/line/topic/list`, search_key,
              req, res,
              function (result) {
                results.users_active_list = result.data.list
                results.total = result.data.total
                cb(null, 1)
              }
            )
        },
    ], function (err, _) {
        return res.wrender('./pages/member/children/detail.ejs', {
            results: results
        });
    })
}

router.get_new_or_hot=function(req,res){
    let search_key={
        keyword:"",
        sort:2,
        start:0,
        size:10,
        has_reply:1,
        type_id:3,
        is_gq:1,
        has_follow:0,
        is_manage:0,
        user_id:0,
        exclude_id:0,
    }
    let id=req.query.id,user_id=req.query.uid
    search_key.sort=parseInt(id)
    search_key.user_id=parseInt(user_id)
    tools.getMasterApiQuery(`/line/topic/list`, search_key,
              req, res,
              function (result) {
                console.log(result.data.list,"shuju")
                res.send(result)
        }
    )
}

module.exports = router;