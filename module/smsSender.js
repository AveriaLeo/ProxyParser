var fetch = require('whatwg-fetch');
var config = require('../config');
var url = config.sms.url;

module.exports = {
    //http://sms.ru/sms/send?api_id=30DE7FDE-B7EE-B1A2-EC92-06162C32C280&to=79381566518&text=hello+world
    sendSmsAsync: function sendSmsAsync(sms) {
        var text = sms.text.replace(' ', '+');

        fetch(url + '&to=' + sms.to + '&text=' + text + '&test=1', {
            'method': 'get'
        }).then(function (response) {
            console.log('/////////////////start/////////////////');
            console.log(response);
            console.log('////////////////end//////////////////');
            return response;
        });
    }
};
