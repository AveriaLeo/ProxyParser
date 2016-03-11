var amq = require('amqp');
var config = require('../config');
var socket = require("./socket");

// Устанавливаем соединение с раббитом
var connection = amq.createConnection(config.rabbitConn);

connection.on('ready', function () {
    console.log("Connected to Rabbit MQ complete");

    connection.exchange("isz.async",  {
        "type": "topic",
        "durable": true,
        "noDeclare": false,
        "autoDelete": false
    }, function(exchange) {

        // определяем новую очередь
        connection.queue('async.messenger', {durable: true, autoDelete: false}, function (q) {
            // цепляем очередь по роуту к ексченджю
            q.bind(exchange.name, 'async.messenger.#');

            // подписываемся на события и принимаем их
            q.subscribe(function (message, headers, deliveryInfo, messageObject) {
                var data = JSON.parse(message.data);

                console.log(data);
                // отправляем фронту гадкие сообщения
                socket.emit('messenger:display', data);
            });
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