const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const router = express.Router();

function user_topic(req, res, page, user_id, callback) {
  page = Math.max(1, page)
  let size = 10,
    start = (page - 1) * size
  tools.getMasterApiQuery('/line/circle/topic', {
      user_id: user_id,
      start: start,
      size: size
    },
    req, res,
    function (result) {

      let list = result.data.list,
        total = list.length > 0 ? list[0].total_count : 0
      result.data.has_next = total > page * size ? 1 : 0
      callback(result)
    })
}
router.index = function (req, res) {
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
  let results = {
    nav: 'members'
  }
  async.waterfall([
    function (cb) {
      tools.getMasterApiQuery('/line/info/' + curr_user_id, {}, req, res, function (result) {
        if (result.state != 0) return res.wabort()
        results.user = result.data
        cb(null, 1)
      })
    },
    function (err, cb) {
      async.series([
        function (fn) {
          user_topic(req, res, 1, curr_user_id, function (result) {
            results.topic = result.data
            fn(null, 1)
          })
        },
        function (fn) {
          tools.getMasterApiQuery('/line/circle/inbound', {
              start: 0,
              size: 3,
              has_all: 1,
              user_id: curr_user_id
            },
            req, res,
            function (result) {
              results.circles = result.data
              fn(null, 1)
            }
          )
        },
        function (fn) {
          tools.getMasterApiQuery('/line/personal/users/recommend/' + curr_user_id, {
              top_count: 3
            },
            req, res,
            function (result) {
              results.recommend_user = result.data
              fn(null, 1)
            }
          )
        }
      ], function (err, _) {
        cb(null, 1)
      })
    }
  ], function (err, _) {
    return res.wrender('./line/index.ejs', {
      results: results
    });
  })
}

router.follow = function (req, res) {
  tools.postMasterApiQuery('/line/follow/' + req.query.user_id, {}, req, res, function (result) {
    return res.send(result)
  })
}

router.unfollow = function (req, res) {
  tools.deleteMasterApiQuery('/line/follow/' + req.query.user_id, {}, req, res, function (result) {

    return res.send(result)
  })
}

function unity_users(req, res, page, callback) {
  page = Math.max(1, page)
  let size = 12,
    start = (page - 1) * size,
    sort = req.query.sort || 1,
    keyword = req.query.keyword || '',
    is_reload = req.query.is_reload || 0
  tools.getMasterApiQuery('/line/users', {
      start: start,
      size: size,
      sort: sort,
      keyword: keyword
    },
    req, res,
    function (result) {
      result.data.has_next = result.data.total > page * size ? 1 : 0
      result.is_reload = is_reload
      callback(result)
    })
}

router.members = function (req, res) {
  unity_users(req, res, 1, function (result) {
    result.nav = 'members'
    res.wrender('./line/members.ejs', {
      results: result
    });
  })
}

router.members_list = function (req, res) {
  let page = req.query.page || 2
  unity_users(req, res, page, function (result) {
    res.wrender('./line/child_members.ejs', {
      results: result
    });
  })
}

router.hot_keys = function (req, res) {
  let _user = tools.unity_merger_user(res),
    user_id = _user.uid || 0
  tools.getMasterApiQuery('/company/search-log/hot/keys', {
    top_count: 4,
    user_id: user_id,
    complete: 1
  }, req, res, function (result) {
    res.send(result)
  })
}

router.full_pop = function (req, res) {
  let _user = tools.unity_merger_user(res)
  // 未开通或者首次申请在审核状态下
  if (!_user.uid) return res.wabort()


  async.waterfall([
    function (cb) {
      if (_user.user_id) return cb(null, 1);
      if (_user.audit_status == 0) return res.wabort()
      return res.wabort()
      //已登录未开通 且不在审核期
      res.send({
        state: 0,
        mark: 'yq_open'
      });
    },
    function (_, cb) {
      if (!_user.user_id) return cb(null, 1)
      let _gi = tools.getCookie(req, '_LINE_GI')
      if (_gi) return cb(null, 1)
      tools.setCookie(req, res, '_LINE_GI', '1', 86400)
      tools.getMasterApiQuery('/line/circle/inbound/no/topic', {}, req, res,
        function (result) {
          if (result.state != 0) return cb(null, 1)
          res.wrender('./full_pop/inbound_circle.ejs', {
              results: result
            },
            function (err, str) {
              if (err) return cb(null, 1)
              return res.send({
                content: str,
                state: 0,
                mark: 'group_no_topic'
              })
            })
        })
    }
  ], function (err, _) {
    return res.send({});
  })
}

module.exports = router;