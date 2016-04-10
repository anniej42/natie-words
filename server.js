// set up routing with express
var express = require('express');
var dict = require('./dict');
// var words = dict();

var app = express();
var http = require('http');

app.use(express.static(__dirname + '/public'));
app.enable('view cache');

/**
* adds handler for get requests from the front end
* @param {string} url - set "/getWords" to be the request url
*/

app.get('/getWords', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    var words = dict();
    var len = words.length;
    var i = Math.floor(Math.random() * len);
    var lib = words[i]; // picks random category

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

/**
* helper function to generate random n elements from an array
* @param {array} arr - array to choose element from
* @param {int} n - length of returned array
* if n is greater than array length, returns original array in randomized order.
*/
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

/**
* set up port
*/
app.listen(process.env.PORT || 5000);
console.log("App listening on port 5000");