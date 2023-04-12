/*
 * @Description:
 * @Version: 1.0
 * @Autor: Cong
 * @Date: 2021-12-27 11:06:03
 * @LastEditors: Cong
 * @LastEditTime: 2021-12-27 17:43:53
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const bodyParser = require('body-parser')


const baseConfig = require("./common/base_config");
const translator = require("./common/translator");
const util = require("./common/util");
require("./common/extend")
const queryString = require('querystring')
const fs = require("fs");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 1.配置ejs模板引擎
app.set('view engine', 'ejs');
// 2.配置静态托管
app.use(express.static('public'));
app.use(cors()) //允许跨域
app.use(logger('dev'));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(cookieParser());

// 加载翻译数据
translator.init()


// 当不是登录页面及登录操作时,进行所有的拦截重定向到登录页面
app.use((req, res, next) => {
    util.init_wglobals(req, res)
    // 验证是否需要获取用户
    var access_user = util.request_access_user(req, res)
    if (access_user) return util.unity_user(req, res, false, next)
    next()
})

// 自定义一个next
// app.use((req, res, next) => {
//     try {
//         util.wIpArea(req, res, function (area) {
//             res.locals.wglobals.ip_area = area
//             next()
//         })
//     }catch (e){
//         next()
//     }
// })

// 加载路由管理模块
app.use('/', require('./routes/admin.js'));
app.use('/en', require('./routes/admin.js'));

// 获取版本号
try {
    console.log('正在读取版本号....')
    fs.readFile(baseConfig.config.version_path, 'utf-8', function (err, data) {
        let _json = JSON.parse(data)
        app.locals["VERSION"] = _json.static_version
        console.log('读取版本号【' + _json.static_version + '】完成....')
    })
} catch (e) {}
// 更新版本号
app.get('/update/version', function (req, res) {
    let token = req.query.token
    if (token != 't0LscDWwbMdFkmAV3ie8oMdb8wNFMKjif1Hh0CfNYkXst0') return res.wabort()

    fs.readFile(baseConfig.config.version_path, 'utf-8', function (err, data) {
        let _json = JSON.parse(data)
        _json.static_version = new Date().getTime()
        fs.writeFile('./global_config.json', JSON.stringify(_json), function (err) {
            if (err) return res.wabort()
            res.send({
                message: '修改成功'
            })
        })
    })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
//退出登录
// app.get("/async/login/out",(req,res)=>{
//    res.clearCookie("access_token")
// })
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // var error = new Error('502')
    res.locals.message = err.message;
    // console.log(error, req, res, next, req.app.get('env'))
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    let _wg = {}
    try {
        _wg = res.locals.wglobals
    } catch (e) {

    }
    try {
        console.error(req.protocol + '://' + req.hostname + req.originalUrl, _wg, err)
    } catch (e) {
        console.error('error 02:', _wg, err.message)
    }
    res.status(err.status || 500).render('error');
});

/**
 * res 扩展全局404或其他状态码方法
 * @param status
 * @param req
 */
app.response.wabort = function (status = 404, req, ext_err) {
    // if(req) console.error(req.protocol + '://' + req.get('host') + req.originalUrl, ' wabort ' + status, (ext_err|| ""))
    this.status(status).render('error');
    this.end();
}

// 判断PC引擎，移动端引擎
app.response.wrender = function (name, options, callback) {
    // if(this.locals.wglobals.device == 'mobile') name = name.replace('./', './mobile/')
    this.render(name, options, callback)
}


/**
 * res 扩展全局404或其他状态码方法 -- 返回json数据
 * @param status
 * @param req
 */
app.response.wabortJson = function (status = 404, req, ext_err) {
    // if(req) console.error(req.protocol + '://' + req.get('host') + req.originalUrl, ' wabortJson ' + status, (ext_err|| ""))
    this.status(status).send({
        state: 20000,
        'message': 'not found'
    });
    this.end();
}

// ejs 使用的全局变量
app.locals['url_stringify'] = util.url_stringify
app.locals['tag_url_stringify'] = util.url_stringify
app.locals['show_country'] = util.show_country
app.locals['node_thousand'] = util.node_thousand
app.locals['format'] = util.format

app.locals['translate'] = translator.ejs_translate
app.locals['keyreplace'] = translator.keyreplace
app.locals['VERIFY_AUTHORITY'] = util.ejs_verify_authority
app.locals['verify_vip_level'] = util.verify_vip_level
app.locals['ucfirst'] = util.ucfirst
app.locals['equal_real_vip'] = util.ejs_equal_real_vip
app.locals['verify_real_vip'] = util.ejs_verify_real_vip
app.locals['extended_auth'] = util.ejs_extended_auth
app.locals['MASTER_LANG'] = util.master_lang
app.locals['ROUTE_LANG'] = util.route_lang
app.locals['ROUTE_INDEX'] = util.route_index
app.locals["SHOW_TIME"] = util.show_time
app.locals["POS_SHOW"] = util.pos_show
app.locals["BR_SLICE"] = util.brSlice
app.locals["STATIC"] = baseConfig.config.static
app.locals["PLUGINS_STATIC"] = baseConfig.config.plugins_static
app.locals["IMAGES_PATH"] = baseConfig.config.images_path
app.locals["VERSION"] = baseConfig.config.version
app.locals["UTIL"] = util

app.locals['picture_format'] = util.picture_format
app.locals['gq_title_format'] = util.gq_title_format
app.locals['gq_date_format'] = util.gq_date_format
app.locals['picture_num'] = util.picture_num
app.locals['products_format'] = util.products_format
module.exports = app;