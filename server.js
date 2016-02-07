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

var sentence = Sentencer.make("This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.");
console.log(sentence)

app.use(express.static(__dirname + '/public')); 
app.enable('view cache');
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

Sentencer.configure({
  actions: {
    nounList: function(n) {
      nounList=[];
      for (var i=0; i<n; i++){
        nounList.push(Sentencer.make("{{noun}}"));
      }
      return nounList;
    },
    adjList :function(n){
      adjList = [];
      for (var i=0; i<n; i++){
        adjList.push(Sentencer.make("{{adjective}}"));
      }
    }
  }
});

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
  console.log("stuff")
    // var template = hbs.compile(home);
    var adj1 = Sentencer.make("{{adjList(12)}}");
    var adj2 = Sentencer.make("{{adjList(12)}}");
    var nouns = Sentencer.make("{{nounList(12)}}");

    var words = {"adj1": adj1, "adj2":adj2, "nouns":nouns}

  res.send(words);
});

app.listen(process.env.PORT || 5000);
console.log("App listening on port 5000");