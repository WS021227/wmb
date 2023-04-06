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

module.exports = router;