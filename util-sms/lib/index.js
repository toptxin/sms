var http = require('http');
var querystring = require('querystring');
var stringformat = require('stringformat');

var apikey = '0000';
var tpls = {};

exports.init = function(ak, t) {
	apikey = ak;
	tpls = t;
};

var options = {
	hostname: 'yunpian.com',
	port: 80,
	path: '/v1/sms/send.json',
	method: 'POST'
};

exports.send = function(mobile, tpl_id, v, cb) {
	var msg = tpls[tpl_id];
	if (!msg) {
		cb('没有找到短信模板', null);
		return;
	}

	msg = stringformat(msg, v);

	var post_data = querystring.stringify({
		apikey: apikey,
		mobile: mobile,
		text: msg
	});

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		var html = '';
		res.on('data', function(chunk) {
			html += chunk;
		}).on('end', function() {
			var data = null;
			try {
				data = JSON.parse(html);
			} catch (e) {
				data = null;
			}
			cb(null, data);
		}).on('error', function(e) {
			cb(e, null);
		});
	});

	req.on('error', cb);

	req.write(post_data);
	req.end();
};