// set up express
var express = require('express');
var app = express();
var http = require('http');
app.use(express.static(__dirname + '/public'));
app.enable('view cache');

var dict = require('./dict');

app.get('/getWords', function(req, res) {
    // allow get requests from any domain
    res.header('Access-Control-Allow-Origin', "*");
    var words = dict();

    /*
    words format:
    [{name:category, taglines:[list of taglines], 0:[list of first word], 1:[], 2:[]} , {second category}]
    */
    var len = words.length;

    // randomly choose a category
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

// helper function for choosing random element in array
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

// set port for localhost
app.listen(process.env.PORT || 5000);
console.log("App listening on port 5000");
