const baseConfig = require('./base_config');
const queryString = require('querystring');
const md5 = require('md5-node');
const {json} = require("express");
const crypto = require('crypto');
const FormData = require('form-data')
const request = require('request')
const multiparty = require("multiparty");
const path = require("path");
const fs = require("fs");
const translator = require("./translator");


const algorithm = 'aes-256-ctr';
const secretKey = 'a41glOcPKAzv037jwTh56BomJ5NU39CS';
const iv = crypto.randomBytes(16);
const langReg = new RegExp("/en")

module.exports = {

    /**
     * 统一获取用户信息
     * @param req
     * @param res
     * @param rsu
     * @param fn
     */
    unity_user: function (req, res, rsu, fn) {
        var access_token = this.getCookie(req, 'access_token')
        if (!access_token) return fn()
        let that = this

        that.getMasterApiQuery('/line/user',
            {}, req, res,
            function (result) {
                res.locals.wglobals.user = result.data || {}
                fn()
            }
        )
    },
    /**
     * 统一获取用户信息， 全量用户信息没有的情况下获取简单版用户信息
     * @param res
     * @returns {{}|{user_id, contact: (string|*), vip_level: *, token: *}|*}
     */
    unity_merger_user: function (res) {
        return res.locals.wglobals.user
    },
    /**
     * 统一修改功能参数接口
     * @param req
     * @param res
     * @param key 功能键
     * @param value 功能值
     * @param fn
     */
    change_functional: function (req, res, key, value, fn) {
        this.putMasterApiQuery(
            '/user/functional', {key: key, value: value},
            req, res, fn
        )
    },
    postMasterApiQuery: function (api, data, req, res, fn, options) {
        var url = baseConfig.config.master_api;
        try {
            this.wApi(url + api,
                'POST',
                data, req, res,
                function (_data) {
                    try {
                        fn != undefined && fn(_data);
                    } catch (e) {
                        if(baseConfig.config.api_error) console.error(' >>>>>> 数据处理异常，postMasterApiQuery >> ', api, e)
                        res.wabortJson(404, req, e)
                    }
                },
                options
            )
        } catch (e) {
            if(baseConfig.config.api_error) console.log('postMasterApiQuery', e)
        }
    },
    /**
     *
     * @param api
     * @param data
     * @param req
     * @param res
     * @param fn
     * @param options
     */
    putMasterApiQuery: function (api, data, req, res, fn, options) {
        var url = baseConfig.config.master_api;
        this.wApi(
            url + api,
            'PUT',
            data, req, res,
            function (_data) {
                try {
                    fn != undefined && fn(_data);
                } catch (e) {
                    if(baseConfig.config.api_error) console.error(' >>>>>> 数据处理异常，putMasterApiQuery >> ', api, e)
                    res.wabortJson(404, req, e)
                }
            },
            options
        )
    },
    deleteMasterApiQuery: function (api, data, req, res, fn, options) {
        var url = baseConfig.config.master_api;
        this.wApi(
            url + api,
            'DELETE',
            data, req, res,
            function (_data) {
                try {
                    fn != undefined && fn(_data);
                } catch (e) {
                    if(baseConfig.config.api_error) console.error(' >>>>>> 数据处理异常，deleteMasterApiQuery >> ', api, e)
                    res.wabortJson(404, req, e)
                }
            },
            options
        )
    },
    getMasterApiQuery: function (api, data, req, res, fn, options) {
        options = options || {}
        var url = baseConfig.config.master_api;
        this.wApi(
            url + api, 'GET', data, req, res,
            function (_data) {
                try {
                    fn != undefined && fn(_data);
                } catch (e) {
                    if(baseConfig.config.api_error) console.error(' >>>>>> 数据处理异常，getMasterApiQuery >> ', api, e)
                    res.wabortJson(404, req, e)
                }
            },
            options
        )
    },
    // 封装外贸邦api请求
    wApi: function (url, method, data, request, resp, fn, options) {
        options = options || {}
        options['has_login'] = options.has_login != null ? options.has_login : true
        //
        let headers = this.wApiHeaders(request, resp, options.has_login, {})
        this.httpQuery(url, method, data, fn, options, headers)
    },
    /**
     * 获取请求的IP
     * @param request  req
     * @param resp res
     * @param has_login 是否获取登录用户信息
     * @param headers
     * @returns {{"client-lang": *, "client-device": (string|*)}}
     */
    wApiHeaders: function (request, resp, has_login, headers) {
        console.log(resp.locals,"00000")
        headers['client-device'] = resp.locals.wglobals.device
        headers['client-lang'] = resp.locals.wglobals.lang
        headers['client-ip'] = resp.locals.wglobals.client_ip
        headers['client-port'] = resp.locals.wglobals.client_port
        headers['client-area'] = resp.locals.wglobals.ip_area || 'ZZ'
        // 校验code  可以不定期更换
        headers['auth-code'] = 'Wt4x{CZS=^h+8ry~735!FnT1EjfR6zM9'
        var access_token = this.getCookie(request, 'access_token')
        if (has_login && access_token) {
            headers["access-token"] = access_token
        }
        return headers
    },
    /**
     * 邦阅接口
     * @param api
     * @param data
     * @param req
     * @param res
     * @param fn
     * @param options
     */
    postYueApiQuery: function (api, data, req, res, fn, options) {
        options = options || {}
        var url = baseConfig.config.yue_api;
        data['code'] = baseConfig.config.yue_code
        let headers = {
            'WMBCLIENT': this.get_client_ip(req),
            'Connection': 'keep-alive'
        }

        if (api != 'wmb_login') {
            data['52by_token'] = this.getCookie(req, '52BY_TOKEN')
        }

        try {
            headers['WMBAGENT'] = req.headers['user-agent']
        } catch (e) {

        }

        this.httpQuery(url + api, 'POST', data, function (result) {
            try {
                fn != undefined && fn(result);
            } catch (e) {
                if(baseConfig.config.api_error) console.error(' >>>>>> 数据处理异常，postMasterApiQuery >> ', api, e)
                res.wabortJson(404, req, e)
            }
        }, options, headers)
    },
    /**
     * 封装http请求
     * @param url
     * @param method
     * @param data
     * @param fn
     * @param options
     * @param headers
     */
    httpQuery: function (url, method, data, fn, options, headers) {
        headers = headers || {}
        options = options || {}
        let is_json = options.is_json != null ? options.is_json : false
        let content, content_type;
        if (is_json) {
            content = JSON.stringify(data)
            content_type = 'application/json'
        } else {
            content = require('querystring').stringify(data);
            content_type = 'application/x-www-form-urlencoded'
        }
        var parse_u = require('url').parse(url, true);
        var isHttp = parse_u.protocol == 'http:';
        var http = require(isHttp ? 'http' : 'https');
        headers = Object.assign(headers, {
            'Content-Type': content_type,
            'Content-Length': Buffer.byteLength(content)
        })
        var _options = {
            host: parse_u.hostname,
            port: parse_u.port || (isHttp ? 80 : 443),
            path: parse_u.path + (method == 'GET' ? '?' + content : ''),
            method: method,
            headers: headers,
        };
        const req = http.request(_options, function (res) {
            res.setEncoding('utf8');
            var _data = '';
            res.on('data', function (chunk) {
                _data += chunk;
            });
            res.on('end', function () {
                let result = {state: 10000}
                if (this.statusCode == 200) {
                    try {
                        result = JSON.parse(_data)
                        if (result.state != 0 && baseConfig.config.api_error) console.error('《not error is info》 state != 0', result, url)
                    } catch (e) {
                        if(baseConfig.config.api_error) console.error('request JSON parse error', e, url)
                    }
                } else {
                    result['message'] = 'statusCode != 200 is ' + this.statusCode
                    if(baseConfig.config.api_error) console.error(result['message'])
                }
                fn != undefined && fn(result);
            });
        });
        req.on('error', (e) => {
            if (baseConfig.config.api_error) console.error(' on error', e, url)
            fn != undefined && fn({"state": 10000, "message": "error"});
        })
        req.on('timeout', (e) => {
            if (baseConfig.config.api_error) console.error(' on timeout', e, url)
            fn != undefined && fn({"state": 10001, "message": "error"});
        })
        req.write(content);
        req.end();
    },
    show_time: function (str_date) {
        // return ''
        let lang = this.wglobals.lang || 'cn'
        let date = new Date(str_date)
        let old_time = (new Date() - date) / 1000;
        // 大于 30 天
        if (old_time > 2592000) return date.date_format('yyyy-mm-dd') + translator.unity_translate(lang,'publish_expire_date');
        // 大于 7  天
        if (old_time > 86400) return Math.floor(old_time / 86400) + translator.unity_translate(lang,'publish_expire_day')
        // 小于一天
        if (old_time > 3600) return Math.floor(old_time / 3600) + translator.unity_translate(lang,'publish_expire_hour')
        // 小于 1小时
        if (old_time > 60) return Math.floor(old_time / 60) + translator.unity_translate(lang,'publish_expire_minute')
        return translator.unity_translate(lang,'publish_expire_now')
    },
    pos_show: function (data) {
        if (data.ip_country_name && data.ip_pro_name) return data.ip_country_name + ' ' + data.ip_pro_name
        return data.country
    },
    brSlice: function (str, end) {
        let real_str = ''
        if(!str) return _result()
        let reg_obj = new RegExp(/<br[^>|>]*>/gi)
        real_str = str.replace(reg_obj)
        function _result(html){
            html = html || str
            return {html: html, real_str: real_str}
        }
        if(str.length <= end) return _result()
        if(!reg_obj.test(str)) return _result(str.slice(0, end) + '...')

        let _str_list = str.split(reg_obj), new_str = '',  html = '',_end = end
        for (let i = 0; i < _str_list.length; i++) {
            new_str += _str_list[i]
            // 大于截取长度 则不需要添加br, 并且截取
            if(new_str.length > end){
                // html += _str_list[i].slice(0, _end)
                html += _str_list[i].slice(0, end)
                break
            }
            html += _str_list[i] + '<br/>'
            if(new_str.length == end) break
            end -= _str_list[i].length
            // _end -= _str_list[i].length
        }
        if(new_str.length != real_str.length) html += '...'
        return _result(html)
    },
    unity_send_email: function (req, res, api, title, content, address, cc, send_type, callback) {
        let params = {
            req: api,
            title: title,
            content: content,
            address: address,
            cc: cc,
            send_type: send_type
        }
        this.httpQuery(baseConfig.common.send_service, 'POST', params, function (result) {
            if (callback) callback(result)
        })
    },

    /**
     * 统一发送验证码，除修改绑定的验证码
     * @param req
     * @param res
     * @param type email / phone
     * @param params 参数
     * @param callback
     */
    unity_send_verify_code: function (req, res, type, params, callback) {
        this.postMasterApiQuery('/account/send/' + type + '/code',
            params, req, res,
            function (result) {
                try {
                    callback(result)
                } catch (e) {
                    res.wabort(404, req)
                }
            }
        )
    },

    getCookie: function (req, name, key) {
        if (!req.headers.cookie) return null

        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"),
            arr = req.headers.cookie.match(reg)

        if (arr != null && arr[2] != null && arr[2] != '') {
            var str_arr = decodeURIComponent(arr[2].replace('"', '').replace('"', ''))
            if (key != null) {
                var key_reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
                var value = str_arr.match(key_reg)[2]
                return value
            }
            if (arr != null) return (str_arr);
        }
        return "";
    },
    setCookie: function (req, res, key, value, expires, httponly) {
        var _domain = baseConfig.config.domain
        res.cookie(key, value, {
            maxAge: expires * 1000,
            path: '/',
            domain: _domain,
            httpOnly: httponly
        });
    },
    url_stringify: function (obj, not_keys) {
        if (not_keys != null) {

            not_keys.forEach(function (key) {
                delete obj[key]
            })
        }
        return queryString.stringify(obj)
    },
    tag_url_stringify: function (obj, not_keys) {
        if (not_keys != null) {

            not_keys.forEach(function (key) {
                delete obj[key]
            })
        }
        return queryString.stringify(obj)
    },
    show_country: function (country) {
        if (country == '' || country == null) return 'Other'
        var _country = {
            'taiwan': 'China Taiwan',
            'hong kong': 'China Hong kong',
            'macao': 'China Macao'
        }[country.toLowerCase()]
        return _country != null ? _country : country
    },
    /**
     * 数字超千位处理成 k
     * @param value
     * @returns {string|number}
     */
    node_thousand: function (value) {
        if (typeof value != "number") value = Number(value)
        if (value < 1000) return value
        return (value / 1000).toFixed(2) + 'K'

    },
    /**
     * 获取完整url
     * @param req
     * @returns {string}
     */
    completeUrl: function (req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    },
    /**
     * 获取当前路由对应的语言
     * @param req
     */
    wLang: function (req) {
        return langReg.test(req.path) ? 'en' : 'cn'
    },
    master_lang: function () {
        if (baseConfig.config.factory == 'development') {
            return 'http://' + (this.wglobals.lang == 'cn' ? 'www' : 'en') + '.wmb.com:3000'
        }
        return 'https://' + (this.wglobals.lang == 'cn' ? 'www' : 'en') + '.52wmb.com'
    },
    route_lang: function () {
        return this.wglobals.lang == 'cn' ? '' : '/en'
    },
    route_index: function () {
        return this.wglobals.lang == 'cn' ? '/' : '/en'
    },
    format: function (str, step, splitor) {
        str = str.toString();
        var len = str.length;
        if (len > step) {
            var l1 = len % step,
                l2 = parseInt(len / step),
                arr = [],
                first = str.substr(0, l1);
            if (first != '') {
                arr.push(first);
            }
            ;
            for (var i = 0; i < l2; i++) {
                arr.push(str.substr(l1 + i * step, step));
            }
            ;
            str = arr.join(splitor);
        }
        ;
        return str;

    },
    wPromote: function (req, res) {
        let promote = this.getCookie(req, 'promote')
        if (promote) return;
        let _complete_url = this.completeUrl(req).split('?')[0]
        if (_complete_url.indexOf('cookie/set') >= 0) return;
        promote = req.query.s || ''
        try {
            let url_pro = decodeURIComponent(promote)
            var parse_u = require('url').parse(url_pro, true);
            promote = parse_u.host ? parse_u.host : promote
        } catch (e) {
        }
        if (!promote) {
            let http_referer = req.headers.referer || ''
            try {
                if (http_referer) {
                    let ref_parse = require('url').parse(decodeURIComponent(http_referer), true),
                        ref_host = ref_parse.host ? ref_parse.host : ''

                    promote = ref_host ? (baseConfig.config.hosts.indexOf(ref_host) >= 0 ? 'auto' : ref_host) : 'auto'
                } else {
                    promote = 'auto'
                }
            } catch (e) {
                promote = 'auto'

            }
        }
        this.setCookie(req, res, 'promote', promote, 86400)

    },
    /**
     * 获取设备信息
     * @param req
     * @returns {{is_wechat: boolean, device: string}}
     */
    wDevice: function (req) {
        let deviceAgent = req.headers['user-agent'].toLowerCase()
        let _match = deviceAgent.match(/googlebot-mobile|android|avantgo|blackberry|blazer|elaine|hiptop|ip(hone|od)|kindle|midp|mmp|mobile|o2|opera mini|palm( os)?|pda|plucker|pocket|psp|smartphone|symbian|treo|up\.(browser|link)' + |vodafone|wap|windows ce; (iemobile|ppc)|xiino|maemo|fennec/)
        if (_match != null) {
            return {device: 'mobile', is_wechat: deviceAgent.indexOf('micromessenger') >= 0}
        }
        return {device: 'pc', is_wechat: false}
    },
    /**
     * 浏览次数
     * @param req
     * @param res
     */
    sVisitCount: function (req, res) {
        let visit_count = parseInt(this.getCookie(req, 'visit_count') || 0)
        visit_count++;
        this.setCookie(req, res, 'visit_count', visit_count, 86400)
    },
    /**
     * 获取真实IP
     * @param req
     * @returns {string}
     */
    get_client_ip: function (req) {
        return (req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress).match(/\d+\.\d+\.\d+\.\d+/)[0]
    },
    /**
     * 获取真实源端口
     * @param req
     * @returns {string}
     */
    get_client_port: function (req) {
        return (req.headers['x-real-port'] || req.socket.remotePort)
    },
    /**
     * 初始化全局数据
     * @param req
     * @param res
     */
    init_wglobals: function (req, res) {
        res.locals.wglobals = {
            user: {},
            lang: this.wLang(req),
            client_ip: this.get_client_ip(req),
            client_port: this.get_client_port(req)
        }
        res.locals.wglobals = Object.assign(this.wDevice(req), res.locals.wglobals)
        res.locals.wglobals.static = baseConfig.config.static
        // this.wPromote(req, res)
    },
    /**
     * 验证该请求是否需要获取用户信息
     * @param req
     * @param res
     * @returns {boolean}
     */
    request_access_user: function (req, res) {
        // if(req.path.indexOf('/login') >= 0) return false
        if (req.path.indexOf('/sign') >= 0) return false
        let async = req.headers['x-requested-with'] === 'XMLHttpRequest'
        if (!async) {
            this.sVisitCount(req, res);
            return true;
        }
        let wtype = req.headers.wtype
        return wtype !== '2';

    },
    /**
     * 百度翻译
     * @param fn
     * @param words
     * @param translate_from
     * @param translate_to
     */
    baidu_translate: function (fn, words, translate_from, translate_to) {
        let bd_accounts = baseConfig.common.baidu_account, bd_index = baseConfig.common.bd_index,
            bd_account = bd_accounts[bd_index[Math.round(Math.random() * bd_index.length)]],
            salt = Date.now(),

            parameters = {
                'q': words,
                'from': translate_from,
                'to': translate_to,
                'appid': bd_account['appid'],
                'salt': salt,
                'sign': md5(bd_account['appid'] + words + salt + bd_account['key'])
            }
        this.httpQuery(
            'https://api.fanyi.baidu.com/api/trans/vip/translate',
            'post',
            parameters,
            function (result) {
                let trans_resultds = result.trans_result || {},
                    item = trans_resultds.length > 0 ? trans_resultds[0] : {},
                    dst = item.dst || words
                fn(dst)
            }
        )
    },
    /**
     * 上传文件到接口
     * @param api
     * @param req
     * @param res
     * @param options
     */
    api_upload_file: function (api, req, res, options) {
        let _from = new multiparty.Form(), that = this, callback = options.callback
        _from.parse(req, function (err, fields, files) {
            if (err) {
                callback({message: 'error', state: 10002})
                return;
            }
            let avatar_files = files[options.file_field] || []
            if (avatar_files.length <= 0) {
                callback({message: 'not image', state: 10000})
                return;
            }

            let rfile = avatar_files[0],
                filePath = rfile.path,
                // originalFilename = rfile.originalFilename,
                // newPath = path.join(path.dirname(filePath), originalFilename),
                eFields = options.eFields || [], // 传递到接口需要的扩展字段
                params = options.params // 传递到接口需要的扩展字段


            fs.stat(filePath, function (e, s) {
                // 大于 3M 则不能传
                if (s.size > 3145728) return callback({
                    message: 'File is too large，only 3M of images can be uploaded',
                    state: 10002
                })
                let file = fs.createReadStream(filePath) //创建读取流
                let form = new FormData() // new form data实例
                let headers = that.wApiHeaders(req, res, true, form.getHeaders())
                form.append('file', file) // 把文件加入到form data实例中
                eFields.forEach(function (f, _) {
                    let _extend = fields[f] || [], eValue = _extend.length > 0 ? _extend[0] : null;
                    if (eValue) {
                        form.append(f, eValue)
                    }
                })
                if (params) {
                    for (var key in params) {
                        if (typeof params[key] == 'string' || typeof params[key] == 'number') {
                            form.append(key, params[key])
                        }
                    }
                }
                request(baseConfig.config.master_api + api, {
                    method: 'post',
                    body: form,
                    headers: headers  //form data的headers
                }, function (error, response, body) {
                    let resp = {}
                    try {
                        resp = JSON.parse(body)
                    } catch (e) {
                        resp = {state: 1, message: 'json parse error'}
                    }
                    callback(resp)
                })
            })
        })
    },
    /**
     * 验证用户权限
     * @param user 用户信息
     * @param nv  所需vip
     * @param exp 是否验证体验权限
     */
    verify_authority: function (user, nv, exp = true) {
        let vip_level = user && user.id ? user.vip_level : ''
        return this.verify_vip_level(vip_level || '', nv, exp ? user.experience : '')
    },
    /**
     * 验证用户权限
     * @param nv  所需vip
     * @param exp 是否验证体验权限
     */
    ejs_verify_authority: function (nv, exp = true) {
        let that = this.UTIL
        return that.verify_authority(this.wglobals.info, nv, exp)
    },
    equal_real_vip: function (user, nv) {
        return this.equal_vip_level(user.vip_level, nv)
    },
    ejs_equal_real_vip: function (nv) {
        let that = this.UTIL
        return that.equal_vip_level(this.wglobals.user.vip_level, nv)
    },
    verify_real_vip: function (res, nv) {
        let user = this.unity_merger_user(res)
        return this.verify_authority(user, nv, '')
    },
    ejs_verify_real_vip: function (nv) {
        let that = this.UTIL
        return that.verify_authority(this.wglobals.user, nv, '')
    },
    /**
     *
     * @param vip
     * @param nv
     * @param experience 如果不验证体验账号等级权限， 则传false
     * @returns {*|boolean}
     */
    verify_vip_level: function (vip, nv, experience = '') {
        let vip_auth = baseConfig.common.vipMarkLevel[vip] >= baseConfig.common.vipMarkLevel[nv]
        if (vip_auth) return true
        return baseConfig.common.vipMarkLevel[experience] >= baseConfig.common.vipMarkLevel[nv]
    },
    equal_vip_level: function (vip, nv) {
        return baseConfig.common.vipMarkLevel[vip] == baseConfig.common.vipMarkLevel[nv]
    },
    extended_auth: function (_user, auth) {
        if (!_user) return false
        if (!_user.id) return false
        try {
            return _user.extended_auth[auth] == 'true'
        } catch (e) {
            return false
        }
    },
    ejs_extended_auth: function (auth) {
        let that = this.UTIL
        return that.extended_auth(this.wglobals.user, auth)
    },
    clear_html: function (text) {
        return text.replace(/<[^>]+>/gi, '')
    },
    space_repeat_remove: function (text) {
        return text.replace(/[\s]+/gi, ' ')
    },
    ucfirst: function (str) {

        var arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            str = arr.join(" ");
        }
        return str;

    },
    /**
     * crypto 加密
     * @param data 加密数据
     * @param options:
     *         algorithm 是算法的意思
     */
    encrypt: function (data, options) {
        try {

            let cipher = crypto.createCipheriv(algorithm, secretKey, iv); 	// 创建 cipher 实例
            // 加密数据
            const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
            let iv_hex = iv.toString('hex')
            return encrypted.toString('hex') + iv_hex;
        } catch (e) {
            return ''
        }
    },
    /**
     * crypto解密
     * @param cipherText
     * @param options
     *         algorithm 是算法的意思
     */
    decrypt: function (cipherText, options) {
        try {
            let iv_hex = cipherText.slice(-32),  // 获取初始化向量
                data = cipherText.slice(0, (cipherText.length - 32));   //获取密文
            const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv_hex, 'hex'));
            const decrypted = Buffer.concat([decipher.update(Buffer.from(data, 'hex')), decipher.final()]);
            return decrypted.toString();
        } catch (e) {
            return null
        }
    },
    /**
     *
     * @param res
     * @param type  1是直接跳转 2是返回错误信息
     * @param callback
     */
    login_verify: function (res, type, callback) {
        let _user = this.unity_merger_user(res)
        if (!_user.uid) {
            if (type == 1) return res.redirect('/login');
            return res.send({state: 200})
        }
        callback(_user)
    },
    get_time_interval_duration: function (s, e) {
        try {
            s = typeof s != 'Date' ? new Date(s) : s
            e = typeof e != 'Date' ? new Date(e) : e
        } catch (e) {
            return ''
        }
        let interval = (e - s) / 1000,// 秒数
            days = interval * 86400  // 天
        if (days >= 1) return days + '' + translator.translate('share_date_days')
        if (interval >= 3600) return (interval / 3600).toFixed(1) + '' + translator.translate('share_date_hours')
        if (interval >= 60) return (interval / 60).toFixed(1) + '' + translator.translate('share_date_minutes')
        return interval + '' + translator.translate('share_date_seconds')
    },
    get_star: function (num) {
        if (num < 60) return '20'
        if (num <= 68) return '25'
        if (num <= 74) return '30'
        if (num <= 79) return '35'
        if (num <= 85) return '40'
        if (num <= 90) return '45'
        return '50'
    },
    /**
     *  非阻塞休眠
     * @param ms
     */
    sleep: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    /**
     * 非堵塞休眠开启
     * @param ms
     * @returns {Promise<void>}
     */
    sleep_start: async function (ms) {
        await this.sleep(ms);
    },

    // 图片格式处理
    picture_format(pic_url){
        let index=pic_url.indexOf(',')
        if(index==-1) return pic_url
        let pic=pic_url.substr(0,index)
        return pic
    },
    picture_num(pic_url){
        let num=pic_url.split(",").length - 1
        return num
    },
    // 文本格式处理
    gq_title_format(title,str_num){
        if(title.length<=str_num) return title
        let new_title=title.replace(new RegExp('<br>', 'g'),'')
        let new_title1=new_title.replace(new RegExp('<br/>', 'g'),'')
        return new_title1.substr(0,str_num)+'...'
    },
    // 供求信息日期格式处理
    gq_date_format(date){
        let today=new Date()
        let new_date=new Date(date)
        let day=today-new_date
        return new Date(day).getDay()
    },
}
