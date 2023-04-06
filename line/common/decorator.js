/*-----------------------------------------------*
 *                                               *
 *                   装饰器                       *
 *                                               *
 ------------------------------------------------*/
const util = require("../common/util");


module.exports = {
    /**
     * 验证是否需要登陆  异步请求不能使用
     * ps: 后期加的，所以很多地方没有使用这个装饰器
     * @returns {(function(*, *, *): void)|*}
     */
    login_required: function (){
        return function (req, res, next){
            var access_token = util.getCookie(req, 'access_token')
            if (!access_token) {
                // /login?redirectUrl=https%3A%2F%2Fwww.52wmb.com%2Fcustoms-data%2Funited_states
                let redirectUrl = encodeURIComponent(util.completeUrl(req)),
                    loc = req.protocol + '://' + req.get('host') + '/login?redirectUrl=' + redirectUrl
                res.writeHead(302, {'Location': loc});
                res.end();
                return
            }
            next()

        }
    },
    sign_required: function (){
        return function (req, res, next){
            var access_token = util.getCookie(req, 'access_token')
            if (!access_token) {
              res.send({state: 600, message: 'sign'})
                return
            }
            next()

        }
    },

    /**
     * 只有英文
     * @returns {(function(*, *, *): (*|undefined))|*}
     */
    only_en: function () {
        return function only_en(req, res, next) {
            if (res.locals.wglobals.lang !== 'en') return res.status(404).render('error')
            next()
        }
    },
    /**
     * 只有中文
     * @returns {(function(*, *, *): (*|undefined))|*}
     */
    only_cn: function () {
        return function only_cn(req, res, next) {
            if (res.locals.wglobals.lang !== 'cn') return res.status(404).render('error')
            next()
        }
    },

    /**
     * 附加到req
     * @param params
     * @returns {function(*, *, *): *}
     */
    req_extend: function (params) {
        return function req_extend(req, res, next) {
            req.extend_params = params
            next()
        }
    },
    /**
     * 附加到 res 中的扩展参数, 这个基本是在ejs中调用
     * @param params
     * @returns {function(*, *, *): *}
     */
    res_extend: function (params) {
        return function res_extend(req, res, next) {
            res.locals.extend_params = params
            next()
        }
    }
}



