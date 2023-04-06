const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const cm = require('../common.js')
const router = express.Router();
const multiparty = require("multiparty");

router.index = function (req, res) {
    /*圈子列表*/
    tools.getMasterApiQuery('/line/circle/home',
        {
            //  判断PC端返回数据，移动端返回数据
            top_count: 15,
            // top_count: res.locals.wglobals.device == 'pc'?8:4,
        },
        req, res,
        function (result) {
            let data = result.state == 0 ? result.data || {} : {}
            return res.wrender('./group/index.ejs', {
                results: {circle_list: data.list || [], nav: 'group'}
            });
        }
    )
}
router.detail = function (req, res) {

    let results = {circle: {}, nav: 'group'}
    async.series([

        function (cb) {
            // 圈子详情
            tools.getMasterApiQuery('/line/circle/' + req.params.id, {top_count: 6, has_leader: 1}, req, res,
                function (result) {
                    results.circle = result.data || {};
                    cb(null, 1)
                })
        },
        function (cb) {
            // 贴子列表
            cm.unity_topic_list(req, res, req.params.id, null, function (result) {
                results.topic = result.data || {};
                cb(null, 1)
            })
        },
        function (cb) {
            // 用户列表
            unity_member(req, res, req.params.id, 6, 1,1,function (result){
                results.member = result.data || {};
                cb(null, 1)
            })
        }
    ], function (err, _) {
        return res.wrender('./group/detail.ejs', {
            results: results
        });
    })
}
router.detail_bk = function (req, res) {
  let results = {circle: {}, nav: 'group'}
  async.series([

    function (cb) {
      // 圈子详情
      tools.getMasterApiQuery('/line/circle/' + req.params.id, {top_count: 6, has_leader: 1}, req, res,
        function (result) {
          results.circle = result.data || {};
          cb(null, 1)
        })
    },
    function (cb) {
      // 推荐贴子
      tools.getMasterApiQuery('/line/circle/topic/recommend/' + req.params.id,
        {top_count: 6}, req, res,
        function (result) {
          results.recommend_topic = result.data.list || {};
          cb(null, 1)
        }
      )
    },
    function (cb) {
      // 用户列表
      unity_member(req, res, req.params.id, 6, 1,1,function (result){
        results.member = result.data || {};
        cb(null, 1)
      })
    }
  ], function (err, _) {
    return res.wrender('./group/detail.ejs', {
      results: results
    });
  })
}
/**
 * 入驻小组
 * @param req
 * @param res
 * @returns {*}
 */
router.inbound_group = function (req, res) {
  let group_id = req.query.group_id;
  if (!group_id) return res.send({message: 'not group id'})
  tools.postMasterApiQuery('/line/circle/inbound/' + group_id, {}, req, res, function (result) {
    res.send(result)
  })
}
/**
 * 退出小组
 * @param req
 * @param res
 * @returns {*}
 */
router.exit_group = function (req, res){
  let group_id = req.query.group_id;
  if(!group_id) return res.send({message: 'not group id'})
  tools.deleteMasterApiQuery('/line/circle/exit/' + group_id, {}, req, res, function (result) {
    res.send(result)
  })
}

const member_size = 20
/***
 * 统一获取成员列表
 * @param req
 * @param res
 * @param group_id
 * @param size
 * @param sort
 * @param is_promote
 * @param callback
 */
function unity_member(req, res, group_id, size, sort, is_promote, callback) {
  let page = Number(req.query.page || 1), start = (page - 1) * size
  tools.getMasterApiQuery('/line/circle/users/' + group_id, {
    sort: sort,
    start: start,
    size: size,
    is_promote: is_promote
  }, req, res, function (result) {

    let list = (result.data || {}).list || [], total = list.length > 0 ? list[0].total_count : 0
    result.data.has_next = total > page * size ? 1 : 0
    callback(result)
  })
}
/**
 * 圈子成员
 * @param req
 * @param res
 */
router.member = function (req, res) {
    let results = {circle: {}, nav: 'group'}
    async.series([

        function (cb) {
            // 圈子详情
            tools.getMasterApiQuery('/line/circle/' + req.params.id, {top_count: 15, has_leader: 1}, req, res,
                function (result) {
                    results.circle = result.data || {};
                    cb(null, 1)
                })
        },
        function (cb) {
            // 用户列表
            unity_member(req, res, req.params.id, 15, 1, 1, function (result) {
                results.member = result.data || {};
                cb(null, 1)
            })
        }
        // function (cb) {
        //   // 用户列表
        //   unity_member(req, res, req.params.id, member_size, 2, 0,function (result){
        //     results.member = result.data;
        //     cb(null, 1)
        //   })
        // },
    ], function (err, _) {
        return res.wrender('./group/member.ejs', {
            results: results
        });
    })
}

/**
 * 成员列表
 * @param req
 * @param res
 */
router.member_list = function (req, res) {
  // 用户列表
  unity_member(req, res, req.query.group_id, member_size, req.query.sort || 2, req.query.rc || 0,
      function (result) {
        return res.wrender('./group/child/member.ejs', {
          results: {member: result.data}
        });
      })
}

router.topic = function (req, res) {
    return res.wabort()
    let results = {circle: {}, nav: 'group'}
    async.series([

        function (cb) {
            // 圈子详情
            tools.getMasterApiQuery('/line/circle/' + req.params.id, {top_count: 6, has_leader: 1}, req, res,
                function (result) {
                    results.circle = result.data || {};
                    cb(null, 1)
                })
        },
        function (cb) {
            // 贴子列表
            cm.unity_topic_list(req, res, req.params.id, null, function (result) {
                results.topic = result.data || {};
                cb(null, 1)
            })
        }
    ], function (err, _) {
        return res.wrender('./group/topic.ejs', {
            results: results
        });
    })
}
/**
 * 贴子列表
 * @param req
 * @param res
 */
router.topic_list = function (req, res) {

  // 贴子列表
  cm.unity_topic_list(req, res, req.query.group_id, req.query.user_id,function (result) {
    return res.wrender('./group/child/topic.ejs', {
      results: {topic: result.data}
    });
  })
}
/**
 * 贴子发布
 * @param req
 * @param res
 */
router.topic_add = function (req, res) {
    let form = new multiparty.Form();
    form.parse(req, function (err, fields) {
        tools.postMasterApiQuery('/line/circle/topic', {
            circle_id: fields.faget('circle_id'),
            contents: fields.faget('contents'),
            images: fields.faget('images'),
            video: fields.faget('video')
        }, req, res, function (result) {
            res.send(result)

        })
    })
}

/**
 * 贴子举报
 * @param req
 * @param res
 */
router.topic_report = function (req, res) {
  tools.postMasterApiQuery('/line/circle/topic/report/' + req.query.topic_id, {}, req, res,
      function (result) {
        res.send(result)
      }
  )
}
/**
 * 回复列表
 * @param req
 * @param res
 */
router.topic_reply = function (req, res) {
  let topic_id = req.query.topic_id, page = Number(req.query.page),
      _start = Math.max(0, Number(req.query.start)),
      size = 10, start = (Math.max(page, 1) - 1) * size + _start
  tools.getMasterApiQuery(
      '/line/circle/topic/reply/' + topic_id,
      {start: start, size: size}, req, res,
      function (result) {

        let list = result.data.list, total = list.length > 0 ? list[0].total_count : 0
        result.data.has_next = total > page * size ? 1 : 0
        return res.wrender('./group/child/topic_reply.ejs', {
          results: {reply: result.data}
        });
      }
  )
}

/**
 * 回复
 * @param req
 * @param res
 */
router.topic_reply_add = function (req, res) {
  let topic_id = req.body.topic_id
  tools.postMasterApiQuery('/line/circle/topic/reply/' + topic_id, {content: req.body.content}, req, res,
      function (result) {
        res.send(result)
      })
}

router.upload_topic_image = function (req, res) {
  // res.send({file_name: 'topic_1661940869.png'})
  // return
  tools.api_upload_file('/line/upload/image', req, res, {
    file_field: 'topic_image_file',
    params: {'base_name': 'topic', 'rewidth': 350},
    callback: function (resp) {
      if (resp.state != 0) {
        return res.wabortJson()
      }
      res.send({file_name:  resp.data.filename})
    }
  })
}

router.topic_detail = function (req, res) {
  let results = {circle: {}}
  async.waterfall([

    function (cb) {
      tools.getMasterApiQuery('/line/circle/topic/' + req.params.id, {}, req, res, function (result) {
        if(!result.data) return res.wabort()
        results.detail = result.data
        cb(null, 1)
      })
    },
    // function (_, cb) {
    //   // 圈子详情
    //   tools.getMasterApiQuery('/line/circle/' + results.detail.circle_id, {top_count: 6, has_leader: 1}, req, res,
    //       function (result) {
    //         results.circle = result.data || {};
    //         cb(null, 1)
    //       })
    // },
    function (_, cb) {
      // 浏览用户
      unity_views_users(req, res, req.params.id, 1, function (result){
        results.member = result.data || {};
        cb(null, 1)
      })
    }
  ], function (err, _) {
    return res.wrender('./group/topic_detail.ejs', {
      results: results
    });
  })
}
function unity_views_users(req, res, topic_id, page, callback) {
  page = Number(page)
  let size = 1, start = (Math.max(page, 1) - 1) * size

  tools.getMasterApiQuery('/line/circle/topic/views/' + topic_id, {start: start, size: size}, req, res,
      function (result) {
        let list = result.data.list, total = list.length > 0 ? list[0].total_count : 0
        result.data.has_next = total > page * size ? 1 : 0
        result.data.total = total
        callback(result)
      })
}

router.topic_views = function (req, res) {
  let page = req.query.page, topic_id = req.query.topic_id

  // 浏览用户
  unity_views_users(req, res, topic_id, page, function (result) {
    res.wrender('./group/child/member.ejs', {
      results: {member: result.data}
    });
  })
}

module.exports = router;
