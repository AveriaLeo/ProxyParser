var amq = require('amqp');
var config = require('../config');

// Устанавливаем соединение с раббитом
var connection = amq.createConnection(config.rabbitConn);

connection.on('ready', function () {

    console.log("Connected to Rabbit MQ complete");

    connection.exchange("manager",  {
        type: "topic",
        durable: true,
        confirm: true,
        autoDelete: false
    }, function(exchange) {

        // определяем новую очередь для скана асихронных сообщений фронту
        connection.queue('speed', {durable: true, autoDelete: false}, function (q) {

            // цепляем очередь по роуту к ексченджю
            q.bind(exchange.name, 'trigger.check.speed.req');

            // подписываемся на события и принимаем их
            q.subscribe({ack: true}, function (message, headers, deliveryInfo, messageObject) {

                var cmd = messageObject.routingKey.split('.');
                if (cmd[4] != undefined) {

                    /*
                    console.log("Command '" + cmd[3] + "' execute starting");
                    console.log("with params: " + message.data);
                    console.log('Delivery info:' + JSON.stringify(deliveryInfo));
                    console.log('Headers:' + JSON.stringify(headers));
                    q.shift(false, true);
                    */
                    
                    if(cmd[4] == "plus") {

                        var res = message.data.fist + message.data.second;

                        var routingKey = 'trigger.check.speed.resp.'+cmd[4];
                        var message = {result: res}
                    }


                    exchange.publish('trigger.check.speed.get.resp', JSON.stringify({"test":"1"}), {deliveryMode: 2, }, function(ack, error) {
                        console.log(ack, error);
                        console.log('Sended');
                    });

                    

                } else {
                    console.log("Какойто баран отправил нам вот такую хрень и мы его послали '" + cmd[3]);
                }
                

            });






/*
            exchange.publish('trigger.check.speed.test', JSON.stringify({"test":"1"}), {deliveryMode: 2}, function(err, res) {
                console.log(err, res);
            });
*/
        });

    });

});

connection.on('error', function(error) {
    console.trace();
    console.error(error);
});

connection.on('close', function(error) {
    console.log('RMQ closed');
});

module.exports = connection;