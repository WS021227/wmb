const tools = require("../common/util");

module.exports = {
    unity_topic_list: function (req, res, group_id, user_id, callback) {

        let page = Number(req.query.page || 1), size = 10, start = (page - 1) * size,
            data = req.query
        if(group_id) {
            data.circle_id = group_id
        }
        if(user_id) {
            data.user_id = user_id
        }
        data.size = size
        data.start = start
        delete req.query.page

        tools.getMasterApiQuery('/line/circle/topic', data, req, res, function (result) {
            let list = result.data.list, total = list.length > 0 ? list[0].total_count : 0
            result.data.has_next = total > page * size ? 1 : 0
            callback(result)
        })
    }
}