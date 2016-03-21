var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var config = require('../config');
var url = config.sms.url;

module.exports = {
    //http://sms.ru/sms/send?api_id=30DE7FDE-B7EE-B1A2-EC92-06162C32C280&to=79381566518&text=hello+world
    sendSmsAsync: function sendSmsAsync(sms) {
        var text = sms.text.replace(' ', '+');
        return fetch(url + '&to=' + sms.to + '&text=' + text).then(function (response) {

            return response.text();
        }).then(function(body) {
            body = body.substring(0,3);

            return body;
        });

    }
};
