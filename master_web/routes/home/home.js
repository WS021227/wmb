const express = require('express');
const async = require('async');
const tools = require('../../common/util.js')
const baseConfig = require("../../common/base_config");
const router = express.Router();
router.index = function (req, res) {
    tools.login_verify(res, 1, function (_user) {
        res.locals.wglobals.nav_active = 'datacenter'
        let results = {dc_active: "home", redirectUrl: req.query.redirectUrl};
        async.waterfall([
            function (callback) {
                tools.getMasterApiQuery('/user/info',
                    {}, req, res,
                    function (result) {
                        results.user = result;
                        callback(null, 1);
                    }
                )
            }
        ], function (err, _) {
            res.wrender('./home/home.ejs', {
                results: results
            });
        })
    })
}
/*权限明细*/
router.permissions_datails = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/permissions/details',
                        {}, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}

/*公司报告统计*/
router.company_report_stats = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/common/company/report/stats',
                        {}, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}

/*标签统计*/
router.tags_stats = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/common/tags/stats',
                        {}, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}

/*增值服务列表*/
router.add_service_list = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/payment/add-service/list',
                        {}, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                results.static = baseConfig.config.static
                res.send(results)
            }
        )
    })
}

/*平台公告*/
router.platform_notice_list = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        var data = req.query
        data['size'] = 10
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/tutorial/list',
                        data, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}

/*热门搜索词*/
router.recent_keys = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        let data = req.query;
        data['top_count'] = 5
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/company/search-log/recent/keys',
                        data, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}

/*公司搜索*/
router.company_search_list = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        var data = req.query
        data['size'] = 8
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/company/search/list',
                        data, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}


/*页面推送*/
router.recommend_mine = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        var data = req.query
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/line/recommend/master/mine',
                        data, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}

/*专属客服*/
router.employee = function (req, res) {
    tools.login_verify(res, 2, function (_user) {
        async.waterfall(
            [
                function (callback) {
                    tools.getMasterApiQuery('/user/employee',
                        {}, req, res,
                        function (result) {
                            callback(null, result)
                        }
                    )
                }
            ],
            function (err, results) {
                res.send(results)
            }
        )
    })
}

module.exports = router;