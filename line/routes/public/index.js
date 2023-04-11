const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

router.follow = function (req, res) {

    let uid = res.locals.wglobals.user.uid,
    user_id = res.locals.wglobals.user.user_id,
    curr_user_id = req.params.id
  // 是当前登录用户没开通则跳转到首页
  if (uid == curr_user_id && !user_id) {
    res.writeHead(302, {
      'Location': req.protocol + '://' + req.get('host') + tools.route_lang()
    });
    res.end();
    return
  }
  
    let id=req.body.user_id
    tools.postMasterApiQuery(`/line/follow/${id}`, req, res,
    function (result) {
        console.log(result,"关注")
        res.send(result)
    })
}

// 默认数据
router.get_active_recommend = function (req, res) {
  let search = req.query
  console.log(search,"969999696969696")
  tools.getMasterApiQuery('/line/users', search, req, res,
    function (result) {
      console.log(result,"发现人加载更多数据")
      res.send(result)
    }
  )
}

// search搜索 
router.search_person_or_post = function (req, res) {
  let search = req.query
  // tools.getMasterApiQuery('/line/users', search, req, res,
  //   function (result) {
  //     console.log(result,"人或者帖子数据")
  //     res.send(result)
  //   }
  // )
}

module.exports = router;