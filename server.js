var express = require('express');
var dict = require('./dict');
// var words = dict();

var app = express();
var http = require('http');

app.use(express.static(__dirname + '/public'));
app.enable('view cache');

app.get('/getWords', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    var words = dict();
    var len = words.length;
    var i = Math.floor(Math.random() * len);
    var lib = words[i];

    var tagline = getRandom(lib["taglines"], 1);
    var word1 = getRandom(lib["0"], 12);
    var word2 = getRandom(lib["1"], 12);
    var word3 = getRandom(lib["2"], 12);
    var words = {
      "tagline" : tagline,
        "name": lib.name,
        "word1": word1,
        "word2": word2,
        "word3": word3
    }

    res.send(words);
});

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        n = len;
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

app.listen(process.env.PORT || 5000);
console.log("App listening on port 5000");
