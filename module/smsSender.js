var fetch = require('whatwg-fetch');
var config = require('../config');
var url = config.sms.url;


//http://sms.ru/sms/send?api_id=30DE7FDE-B7EE-B1A2-EC92-06162C32C280&to=79381566518&text=hello+world
var sendSmsAsync = function sendSmsAsync(sms)
{
    var text = sms.text.split(' ').join('+');
    fetch(url + '&to=' + sms.to + '&text=' + text + '&test=1', {
        method: 'get'
    }).then(function (response) {
        return response;
    });
}

module.exports = sendSmsAsync;
