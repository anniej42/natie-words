
$.get(
  'https://natie-words.herokuapp.com/getWords' ,
  function(data) {
    console.log(data);

    var adj1List = data.adj1.split(",");
    var adj2List = data.adj2.split(",");
    var nounList = data.nouns.split(",");

    var wordLists = [adj1List, adj2List, nounList];
    var rings = [$("#ring-1"), $("#ring-2"), $("#ring-3")];
    for (var j=0; j<rings.length; j++){
	    var html = "";
	    for (var i=0; i<wordLists[j].length; i++){
	    	html += '<div class="poster" style="-webkit-transform: rotateX(' + i*30 + 'deg) translateZ(200px); "><p>';
	    	html += wordLists[j][i];
	    	html+= '</p></div>';
	    }
	    rings[j].html(html);
    }

  }
);


//   }

//   //////////////////////////////////

//   $input.on('keypress', function(e) {
//     if(e.which === 13) {
//       e.preventDefault();
//       renderText($input.html());
//     }
//   });

//   $render.on('click', function(e) {
//     renderText($input.html());
//   });

//   $spookyRender.on('click', function(e) {
//     renderText($input.html(), true);
//   });

//   //////////////////////////////////

//   renderText($input.html());

// });