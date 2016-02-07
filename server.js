var Sentencer = require('./node_modules/sentencer');
var express = require('express');
var app      = express();
// var Handlebars = require('handlebars');
var exphbs  = require('express-handlebars');
var Handlebars = exphbs.create();
// var home = require("views/home")
var http = require('http');

var sentence = Sentencer.make("This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.");
console.log(sentence)

app.use(express.static(__dirname + '/public')); 
app.enable('view cache');

app.set('view engine', 'handlebars');

Sentencer.configure({
  actions: {
    nounList: function() {
      nounList=[];
      for (var i=0; i<12; i++){
        nounList.push(Sentencer.make("{{noun}}"));
      }
      return nounList;
    }
  }
});

// var nouns = Sentencer.make("{{nounList}}");
// console.log(nouns);

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    // res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    res.send(Sentencer.make("{{nounList}}"));
    console.log("got");
});


app.get('/getwords', function (req, res) {
  console.log("stuff")
    var template = Handlebars.compile(home);
    var words = {"words" : Sentencer.make("{{nounList}}")};

    var html    = template(data);
    console.log("stuff")
    // $output.toggleClass('dim', false);
    // $output.html(data);
  
   // res.send(html);
   res.render('home', data);
  // res.send({"words":words});
});

app.listen(8080);
console.log("App listening on port 8080");