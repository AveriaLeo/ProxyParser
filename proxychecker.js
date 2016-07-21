

//var request = require('request');
var Sequelize = require("sequelize");
var mysqlcfg = require("./config/mysql_server.js");
var proxymodel = require("./config/proxy_model.js");
//var SocksClient = require('socks');
//require('events').EventEmitter.prototype._maxListeners = 100;
var ProxyVerifier = require('proxy-verifier');




var sequelize = new Sequelize(mysqlcfg.database, mysqlcfg.username, mysqlcfg.password, mysqlcfg.options);
sequelize
    .authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

var ProxyList = sequelize.define('proxy_list', proxymodel);


var checkProxiesFromDB = function(define) {

    define.findAll().then(function (proxy) {

        proxy.forEach(function (object) {

            checkProxy(object);

        });

    });

}

var checkProxy = function(object) { // object = x.dataValues

    var proto = object
        .dataValues
        .type
        .match(/(HTTP|SOCKS5|SOCKS4)/g);
        //.match(/SOCKS5/g);



    if (proto != null) {
        proto
            .forEach(function (proto, i, arr) {

                //console.log('Finded '+proto+' proxy.');

                    var proxy = {
                        ipAddress: object.dataValues.ip,
                        port: object.dataValues.port,
                        protocol: proto.toLowerCase()
                    };

                    var checkedTypes = "";

                    ProxyVerifier.testAll(proxy, function(error, result) {

                        //Объект, котороый, после проверки ip, будет нести в себе необходимую информацию для
                        var push = {};

                        if (error) {
                            push.status = 'INACTIVE';
                        } else {
                            // The result object will contain success/error information.
                            //console.log(result);

                            for( var protocols in result.protocols){

                                if(result.protocols[protocols].ok==true){

                                    //Переменная, в которую "скапливаются" поддерживаемые протоколы, если они не были записаны заранее.
                                    checkedTypes = checkedTypes + protocols.toUpperCase() +" ";

                                    push.status = 'ACTIVE';

                                    if (result.anonymityLevel!=null) {

                                        if(object.dataValues.anonymous == 'false' || object.dataValues.status == 'unknown') {
                                            push.anonymous = 'true';
                                        }

                                    } else {

                                        if(object.dataValues.anonymous == 'true' || object.dataValues.status == 'unknown') {
                                            push.anonymous = 'false';
                                        }

                                    }

                                }
                                else
                                {
                                    if(object.dataValues.status == 'ACTIVE' || object.dataValues.status == 'unknown') {
                                        push.status = 'INACTIVE';
                                    }
                                }
                            };

                            if(object.dataValues.type == null) {
                                push.type = checkedTypes;
                            }
                        }

                        object.updateAttributes(push);
                    });

            });
    }

};

var localServerCheck = function(ip, port) {


    //Не закончен.
    var server = net.createServer(function(socket){
        console.log('Somebody connected!');
        socket.end();
    })
        .on('error',function(err){
            throw err;
        });


 }

var changeProxy = function(define) {


    define.findAll(
        {
            where: {
                type: 'HTTP',
                anonymous: 'true'
            }
        })
        .then(function (proxy) {
            proxy.forEach(function (object) {
                //checkProxy(object);

            });
    });



}

var startDaemon = function() {
    checkProxiesFromDB(ProxyList);
    var daemon = setInterval(function() {
        checkProxiesFromDB(ProxyList);
    }, 900000);
}


//checkProxiesFromDB(ProxyList);

startDaemon();

