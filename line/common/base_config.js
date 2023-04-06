var _env = process.env.NODE_ENV || 'development'
console.log(_env)
var baseconfig = {
    // 接口开发环境调试
    debug: {
        config: {
            // master_api: "http://10.20.57.110:8420/api/v2",
            // master_api: "http://192.168.1.113:8042/api/v2",
            // master_api: "http://192.168.1.111:8043/api/v2",
            master_api: "http://127.0.0.1:8043/api/v2",
            // master_api: "https://paytest.52wmb.com/api/v2",
            //  master_api: "http://10.20.53.222:18400/api/v2",
            // master_api: "http://10.20.57.110:18351/api/v2",
            // master_api: "https://rest.52wmb.com/api/v2",
            yue_api: "https://www.52by.com/api/web",
            yue_code: 'alsjgpoiah4wt034joijafjwapgu[ppojf3ljwlajg',
            port: 3000,
            domain: '.wmb.com',
            hosts: ['line.wmb.com:3002'],
            // domain: '.52wmb.com',
            // hosts: ['paytest.52wmb.com'],
            factory: 'development',
            static: 'http://line.wmb.com:3002/',
            plugins_static: 'http://line.wmb.com:3002/plugins/',
            images_path: 'https://static.52wmb.com/bangline/upload/images/',
            // static: 'https://paytest.52wmb.com/',
            // static: 'https://static.52wmb.com/wmb_new/',
            version: '1.0.1.15',
            version_path: './global_config.json',
            api_error: false,

        }
    },
    // 开发环境
    development: {
        config: {
            // master_api: "http://192.168.1.110:8042/api/v2",
            master_api: "https://paytest.52wmb.com/api/v2",
            yue_api: "https://www.52by.com/api/web",
            yue_code: 'alsjgpoiah4wt034joijafjwapgu[ppojf3ljwlajg',
            port: 3000,
            login_url: '/login',
            domain: '.wmb.com',
            hosts: ['line.wmb.com:3002'],
            factory: 'development',
            static: 'http://127.0.0.1:3002/',
            plugins_static: 'http://line.wmb.com:3002/plugins/',
            images_path: 'https://static.52wmb.com/bangline/upload/images/',
            version: '1.0.0.0',
            version_path: './global_config.json',
            api_error: true,
        }
    },
    // 测试环境
    test: {
        config: {
            // master_api: "http://192.168.1.110:8043/api/v2",
            master_api: "http://paytest.52wmb.com/api/v2",
            yue_api: " https://www.52by.com/api/web",
            yue_code: 'alsjgpoiah4wt034joijafjwapgu[ppojf3ljwlajg',
            port: 3000,
            login_url: '/login',
            domain: '.52wmb.com',
            hosts: ['paytest.52wmb.com'],
            factory: 'test',
            static: 'https://static.52wmb.com/wmb_line_new/',
            plugins_static: 'https://static.52wmb.com/plugins/',
            images_path: 'https://static.52wmb.com/bangline/upload/images/',
            version: '1.0.0.21',
            version_path: './app/global_config.json',
            api_error: true,
        }
    },
    // 生产环境
    production: {
        config: {
            // master_api: "https://rest.52wmb.com/api/v2",
            master_api: "http://10.20.53.222:18400/api/v2",
            master_temp_api: "https://rest.52wmb.com/mini/api/",
            yue_api: 'http://10.20.57.100:18000/yue/api/web',
            yue_code: 'alsjgpoiah4wt034joijafjwapgu[ppojf3ljwlajg',
            port: 3000,
            domain: '.52wmb.com',
            hosts: ['line.52wmb.com'],
            factory: 'production',
            static: 'https://static.52wmb.com/wmb_line_new/',
            plugins_static: 'https://static.52wmb.com/plugins/',
            images_path: 'https://static.52wmb.com/bangline/upload/images/',
            version: '1.0.1.23',
            version_path: './app/global_config.json',
            api_error: true,
        }
    }
}[_env];

baseconfig['common'] = {
    experience_lead_mark: {'cselv': 1, 'cdpelv': 1, 'celv': 1},
    company_type: {
        buyer: 0,
        supplier: 1
    },
    baidu_account: [
        {
            'appid': '20190415000288144',  // 16621075894
            'key': 'q60Z8yR5hVCSSaoFTSkM'
        },
        {
            'appid': '20190424000291170',  // 18621941102
            'key': 'n3MHjfm5sSK2WxB8JW9f'
        },
        {
            'appid': '20190712000317243',  // 13311830315
            'key': 'HwXIhU6HkzD8TaIFtNJ2'
        },
        {
            'appid': '20190723000320611',  // 17301621482
            'key': 'wvGtcz4CQAKnhOgn2MUJ'
        },
        {
            'appid': '20190723000320616',  // 13282414969
            'key': 'lMwIK0vb3pD_Pr_rqDmg'
        }
    ],
    bd_index: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],  // 使用权重
    vipMarkLevel: {'': 0, 'v': 1, 'bd': 2, 'yd': 3, 'guest': -1},
    vipLevelMark: {0: '', 1: 'v', 2: 'bd', 3: 'yd', '-1': 'guest'},
    permsVipMarkLevel: {'bd': 1, 'yd': 2},
    send_service: 'http://api.52wmb.com/sender',
    // 用户指定为某一区域用户
    ip_area_white_uid: {
        // 0: 'ZZ',
        815425: 'ZZ',
        848771:'ZZ',
        945896:'ZZ',
        450887: 'ZZ',
        740924: 'ZZ',
        // 0: 'IN',
        // 469417: 'IN',
        // 607877: 'PH',
        // 819117: 'IN',
        77777: 'IN'
    },
    // # 白名单 前3段
    white_ips_before: {
        '40.77.167': 1,
        '61.135.189': 1,
        '65.55.24': 1,
        '65.55.52': 1,
        '65.55.55': 1,
        '66.249.64': 1,
        '66.249.65': 1,
        '66.249.66': 1,
        '66.249.67': 1,
        '66.249.68': 1,
        '66.249.69': 1,
        '66.249.71': 1,
        '66.249.73': 1,
        '66.249.74': 1,
        '66.249.75': 1,
        '66.249.77': 1,
        '66.249.79': 1,
        '66.249.90': 1,
        '68.180.228': 1,
        '68.180.230': 1,
        '72.14.199': 1,
        '106.38.241': 1,
        '106.120.173': 1,
        '111.202.100': 1,
        '115.238.101': 1,
        '123.125.71': 1,
        '123.126.113': 1,
        '220.181.125': 1,
        '220.181.108': 1,
        '185.10.107': 1,
        '180.153.236': 1,
        '191.232.136': 1,
        '192.243.55': 1,
        '203.208.60': 1,
        '207.46.13': 1,
        '178.154.200.74': 1,
        '180.76.15': 1,
        '157.55.39': 1,
        '222.73.31': 1,
        '172.31.168': 1,
    },
    // '127.0.0.1',
    white_ips_all: {
        '5.45.207.84': 1,
        '5.255.253.30': 1,
        '5.255.253.55': 1,
        '37.9.113.77': 1,
        '37.9.113.193': 1,
        '37.9.113.114': 1,
        '37.9.113.206': 1,
        '87.250.224.61': 1,
        '87.250.224.108': 1,
        '93.158.152.70': 1,
        '95.108.181.46': 1,
        '95.108.181.48': 1,
        '95.108.181.74': 1,
        '95.108.213.10': 1,
        '141.8.132.8': 1,
        '141.8.132.36': 1,
        '141.8.132.37': 1,
        '141.8.142.22': 1,
        '141.8.142.88': 1,
        '141.8.142.138': 1,
        '141.8.142.172': 1,
        '178.154.149.5': 1,
        '178.154.171.23': 1,
        '178.154.171.80': 1,
        '178.154.200.20': 1,
        '180.76.148.27': 1,
        '213.180.203.52': 1,
    },
    promotion: {
        active: 7 // 常规活动id
    }

}
module.exports = baseconfig;
