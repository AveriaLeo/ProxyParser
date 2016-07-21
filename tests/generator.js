/**
 * Created by leonid on 14.07.16.
 */
/*
var fs = require('fs');

function thread(fn) {
    var gen = fn();
    function next(err, res) {
        var ret = gen.next(res);
        if (ret.done) return;
        ret.value(next);
    }
    setTimeout(next(), 30000);
}

thread(function *(){
    var a = yield read('README.md');
    var b = yield read('package.json');
    console.log(a);
    console.log(b);
});

function read(path) {
    return function(done){
        fs.readFile(path, 'utf8', done);
    }
}
    
*/

var test = null;
