  const POSTERS_PER_ROW = 12;
  const RING_RADIUS = 200;

  var spaceCount = 0;

  function setup_posters (row)
  {
    var posterAngle = 360 / POSTERS_PER_ROW;
    for (var i = 0; i < POSTERS_PER_ROW; i ++) {
      var poster = document.createElement('div');
      poster.className = 'poster';
      // compute and assign the transform for this poster
      var transform = 'rotateY(' + (posterAngle * i) + 'deg) translateZ(' + RING_RADIUS + 'px)';
      poster.style.webkitTransform = transform;
      // setup the number to show inside the poster
      var content = poster.appendChild(document.createElement('p'));
      content.textContent = i;
      // add the poster to the row
      //row.appendChild(poster);
    }

  }

  function init ()
  {
    setup_posters(document.getElementById('ring-1'));
    setup_posters(document.getElementById('ring-2'));
    setup_posters(document.getElementById('ring-3'));
  }

  // call init once the document is fully loaded
  window.addEventListener('load', init, false);


$.get(
  'https://natie-words.herokuapp.com/getWords' ,
  function(data) {
    // console.log(data);

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

$(function() {
  $(document).keydown(function(evt) {
  	if (spaceCount>3){
  		return;
  	}
  	
    if (evt.keyCode == 32) {
      // increment space count to see how many wheels should be stopped
      spaceCount+=1;
      console.log("keydown")  
      console.log("#ring-"+spaceCount)
      console.log($("#ring-"+spaceCount))

      // $("#ring-"+spaceCount).css("-webkit-animation-iteration-count", 0);
      $("#ring-"+spaceCount).removeClass( "animated" )
    }
  });
});


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