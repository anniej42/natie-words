var Sentencer = require('sentencer');
var express = require('express');
var app      = express();
// var hbs = require('handlebars');
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({
  defaultLayout: 'main',
});
// var home = require("views/home")
var http = require('http');

Sentencer.configure({
  nounList: ["bread bin", "casserole", "coffee", "coffee machine", "cupboard", "dish", "dish washer", "draining board", "ender", "fork", "frying pan", "grater", "induction cooker", "kettle", "kitchen paper", "microwave", "oven", "refrigerator", "sauce pan", "sink", "stove", "tap", "tea towel", "tin opener", "toaster", "waste pin"],
  adjectiveList: ["acerbic", "acid", "acidic", "acrid", "aftertaste", "aged", "ambrosial", "ample", "appealing", "appetizing", "aromatic", "astringent", "baked", "balsamic", "beautiful", "bite-size", "bitter", "bland", "blazed", "blended", "blunt", "boiled", "brackish", "briny", "brown", "browned", "burnt", "buttered", "caked", "calorie", "candied", "caramelized", "caustic", "center cut", "char-broiled", "cheesy", "chilled", "chocolate", "chocolate flavored", "choice", "cholesterol free", "chunked", "cinnamon", "classic", "classy", "clove  coated", "cold", "cool", "copious", "country", "crafted", "creamed", "creamy", "crisp", "crunchy", "cured", "cutting", "dazzling", "deep-fried", "delectable", "delectable", "delicious", "delight", "delightful", "distinctive", "doughy", "dressed", "dripping", "drizzle", "drizzled", "dry", "dulcified", "dull", "edible", "elastic", "encrusted", "epicurean taste", "ethnic", "extraordinary", "famous", "fantastic", "fetid", "fiery", "filet", "fizzy", "flaky", "flat", "flavored", "flavorful", "flavorless", "flavorsome", "fleshy", "fluffy", "fragile", "free", "free – range", "fresh", "fried", "frosty", "frozen", "fruity", "full", "full-bodied", "furry", "famy", "garlic", "garlicky", "generous", "generous portion", "gingery", "glazed", "golden", "gorgeous", "gourmet", "greasy", "grilled", "gritty", "gustatory", "half", "harsh", "heady", "heaping", "heart healthy", "heart smart", "hearty", "heavenly", "homemade", "honey", "honeyed", "honey-glazed", "hot", "ice-cold", "icy", "incisive", "indulgent", "infused", "insipid", "intense", "intriguing", "juicy", "jumbo", "kosher", "large", "lavish", "layered", "lean", "leathery", "lemon", "lite", "lightly salted", "lightly-breaded", "lip smacking", "lively", "low", "low sodium", "low-fat", "lukewarm", "luscious", "lush", "marinated", "mashed", "mellow", "mild", "minty", "mixed", "mixture of", "moist", "moist", "mouth-watering", "nationally famous", "natural", "nectarous", "non-fat", "nutmeg", "nutty", "oily", "open face", "organic", "overpowering", "palatable", "peppery", "perfection", "petite", "pickled", "piquant", "plain", "pleasant", "plump", "poached", "popular", "pounded", "prepared", "prickly", "pulpy", "pungent", "pureed", "rancid", "rank", "reduced", "refresh", "rich", "ripe", "roasted", "robust", "rotten", "rubbery", "saccharine", "saline", "salty", "savory", "Sapid", "saporific", "saporous", "satin", "satiny", "sauteed", "savorless", "savory", "scrumptious", "sea salt", "seared", "seasoned", "served in", "served with", "sharp", "sharp-tasting", "silky", "simmered", "sizzling", "skillfully", "small", "smelly", "smoked", "smoky", "smooth", "smothered", "soothing", "sour", "Southern style", "special", "spiced", "spicy", "spiral-cut", "spongy", "sprinkled", "stale", "steamed", "steamy", "sticky", "stinging", "strawberry flavored", "strong", "stuffed", "succulent", "sugar coated", "sugar free", "sugared", "sugarless", "sugary", "superb", "sweet", "sweet-and-sour", "sweetened", "syrupy", "tangy", "tantalizing", "tart", "tasteful", "tasteless", "tasty", "tender", "tepid", "terrific", "thick", "thin", "toasted", "toothsome", "topped", "tossed", "tough", "traditional", "treacly", "treat", "unflavored", "unsavory", "unseasoned", "vanilla", "vanilla flavored", "velvety", "vinegary", "warm", "waxy", "weak", "whipped", "whole", "wonderful", "yucky", "yummy", "zesty", "zingy"],

  // additional actions for the template engine to use.
  // you can also redefine the preset actions here if you need to.
  // See the "Add your own actions" section below.

});

Sentencer.configure({
  actions: {
    nList: function(n) {
      var nList=[];
      for (var i=0; i<n; i++){
        nList.push(Sentencer.make("{{noun}}"));
      }
      return nList;
    },
    adjList :function(n){
      var adjList = [];
      for (var i=0; i<n; i++){
        adjList.push(Sentencer.make("{{adjective}}"));
      }
      return adjList; 
    }
  }
});
// var foodAdj= []
// // var kitchenNoun = ["Bread Bin", "Casserole", "Coffee", "Coffee Machine", "Cupboard", "Dish", "Dish Washer", "Draining Board", "Ender", "Fork", "Frying Pan", "Grater", "Induction Cooker", "Kettle", "Kitchen Paper", "Microwave", "Oven", "Refrigerator", "Sauce Pan", "Sink", "Stove", "Tap", "Tea Towel", "Tin Opener", "Toaster", "Waste Pin"];

app.use(express.static(__dirname + '/public')); 
app.enable('view cache');
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

// Sentencer.configure({
//   actions: {
//     nounList: function(n) {
//       nounList=[];
//       for (var i=0; i<n; i++){
//         nounList.push(Sentencer.make("{{noun}}"));
//       }
//       return nounList;
//     },
//     adjList :function(n){
//       adjList = [];
//       for (var i=0; i<n; i++){
//         adjList.push(Sentencer.make("{{adjective}}"));
//       }
//       return adjList; 
//     }
//   }
// });

// var sentence = Sentencer.make("{{adjective}} {{adjList(12)}}");
// console.log(sentence)

function exposeTemplates(req, res, next) {
    // Uses the `Expresshbs` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.getTemplates('views/', {
        cache      : app.enabled('view cache'),
        precompiled: true
    }).then(function (templates) {
        // RegExp to remove the ".handlebars" extension from the template names.
        var extRegex = new RegExp(hbs.extname + '$');

        // Creates an array of templates which are exposed via
        // `res.locals.templates`.
        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            };
        });

        // Exposes the templates during view rendering.
        if (templates.length) {
            res.locals.templates = templates;
        }

        setImmediate(next);
    })
    .catch(next);
}


// app.get('*', function(req, res) {
//     // res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//     res.send(Sentencer.make("{{nounList}}"));
//     console.log("got");
// });


app.get('/getWords', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*")
    // var template = hbs.compile(home);
    var adj1 = Sentencer.make("{{adjList(12)}}");
    var adj2 = Sentencer.make("{{adjList(12)}}");
    var nouns = Sentencer.make("{{nList(12)}}");
    console.log("hi")
    console.log(nouns)

    var words = {"adj1": adj1, "adj2":adj2, "nouns":nouns}

  res.send(words);
});

app.listen(process.env.PORT || 5000);
console.log("App listening on port 5000");