var Sentencer = require('sentencer');
var express = require('express');
var dict = require('./dict');
// var words = dict();

var app = express();
// var hbs = require('handlebars');
// var exphbs  = require('express-handlebars');
// var hbs = exphbs.create({
//   defaultLayout: 'main',
// });
// var home = require("views/home")
var http = require('http');

// Sentencer.configure({
//     nounList: ["bread bin", "casserole", "coffee", "coffee machine", "cupboard", "dish", "dish washer", "draining board", "ender", "fork", "frying pan", "grater", "induction cooker", "kettle", "kitchen paper", "microwave", "oven", "refrigerator", "sauce pan", "sink", "stove", "tap", "tea towel", "tin opener", "toaster", "waste pin"],
//     adjectiveList: ["acerbic", "acid", "acidic", "acrid", "aftertaste", "aged", "ambrosial", "ample", "appealing", "appetizing", "aromatic", "astringent", "baked", "balsamic", "beautiful", "bite-size", "bitter", "bland", "blazed", "blended", "blunt", "boiled", "brackish", "briny", "brown", "browned", "burnt", "buttered", "caked", "calorie", "candied", "caramelized", "caustic", "center cut", "char-broiled", "cheesy", "chilled", "chocolate", "chocolate flavored", "choice", "cholesterol free", "chunked", "cinnamon", "classic", "classy", "clove  coated", "cold", "cool", "copious", "country", "crafted", "creamed", "creamy", "crisp", "crunchy", "cured", "cutting", "dazzling", "deep-fried", "delectable", "delectable", "delicious", "delight", "delightful", "distinctive", "doughy", "dressed", "dripping", "drizzle", "drizzled", "dry", "dulcified", "dull", "edible", "elastic", "encrusted", "epicurean taste", "ethnic", "extraordinary", "famous", "fantastic", "fetid", "fiery", "filet", "fizzy", "flaky", "flat", "flavored", "flavorful", "flavorless", "flavorsome", "fleshy", "fluffy", "fragile", "free", "free – range", "fresh", "fried", "frosty", "frozen", "fruity", "full", "full-bodied", "furry", "famy", "garlic", "garlicky", "generous", "generous portion", "gingery", "glazed", "golden", "gorgeous", "gourmet", "greasy", "grilled", "gritty", "gustatory", "half", "harsh", "heady", "heaping", "heart healthy", "heart smart", "hearty", "heavenly", "homemade", "honey", "honeyed", "honey-glazed", "hot", "ice-cold", "icy", "incisive", "indulgent", "infused", "insipid", "intense", "intriguing", "juicy", "jumbo", "kosher", "large", "lavish", "layered", "lean", "leathery", "lemon", "lite", "lightly salted", "lightly-breaded", "lip smacking", "lively", "low", "low sodium", "low-fat", "lukewarm", "luscious", "lush", "marinated", "mashed", "mellow", "mild", "minty", "mixed", "mixture of", "moist", "moist", "mouth-watering", "nationally famous", "natural", "nectarous", "non-fat", "nutmeg", "nutty", "oily", "open face", "organic", "overpowering", "palatable", "peppery", "perfection", "petite", "pickled", "piquant", "plain", "pleasant", "plump", "poached", "popular", "pounded", "prepared", "prickly", "pulpy", "pungent", "pureed", "rancid", "rank", "reduced", "refresh", "rich", "ripe", "roasted", "robust", "rotten", "rubbery", "saccharine", "saline", "salty", "savory", "Sapid", "saporific", "saporous", "satin", "satiny", "sauteed", "savorless", "savory", "scrumptious", "sea salt", "seared", "seasoned", "served in", "served with", "sharp", "sharp-tasting", "silky", "simmered", "sizzling", "skillfully", "small", "smelly", "smoked", "smoky", "smooth", "smothered", "soothing", "sour", "Southern style", "special", "spiced", "spicy", "spiral-cut", "spongy", "sprinkled", "stale", "steamed", "steamy", "sticky", "stinging", "strawberry flavored", "strong", "stuffed", "succulent", "sugar coated", "sugar free", "sugared", "sugarless", "sugary", "superb", "sweet", "sweet-and-sour", "sweetened", "syrupy", "tangy", "tantalizing", "tart", "tasteful", "tasteless", "tasty", "tender", "tepid", "terrific", "thick", "thin", "toasted", "toothsome", "topped", "tossed", "tough", "traditional", "treacly", "treat", "unflavored", "unsavory", "unseasoned", "vanilla", "vanilla flavored", "velvety", "vinegary", "warm", "waxy", "weak", "whipped", "whole", "wonderful", "yucky", "yummy", "zesty", "zingy"],

// });

// Sentencer.configure({
//     actions: {
//         nList: function(n) {
//             var nList = [];
//             for (var i = 0; i < n; i++) {
//                 nList.push(Sentencer.make("{{noun}}"));
//             }
//             return nList;
//         },
//         adjList: function(n) {
//             var adjList = [];
//             for (var i = 0; i < n; i++) {
//                 adjList.push(Sentencer.make("{{adjective}}"));
//             }
//             return adjList; 
//         }
//     }
// });

app.use(express.static(__dirname + '/public'));
app.enable('view cache');

app.get('/getWords', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    // var adj1 = Sentencer.make("{{adjList(12)}}");
    // var adj2 = Sentencer.make("{{adjList(12)}}");
    // var nouns = Sentencer.make("{{nList(12)}}");
    // var words = {
    //     "adj1": adj1,
    //     "adj2": adj2,
    //     "nouns": nouns
    // }
    var words = dict();
    var len = words.length;
    var i = Math.floor(Math.random() * len);
    var lib = words[i];

    var word1 = getRandom(lib["0"], 12);
    var word2 = getRandom(lib["1"], 12);
    var word3 = getRandom(lib["2"], 12);
    var words = {
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
