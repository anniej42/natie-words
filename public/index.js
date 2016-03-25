  const POSTERS_PER_ROW = 12;
  const RING_RADIUS = 200;

  var spaceCount = 0;

  function setup_posters(row) {
      var posterAngle = 360 / POSTERS_PER_ROW;
      for (var i = 0; i < POSTERS_PER_ROW; i++) {
          var poster = document.createElement('div');
          poster.className = 'poster';

          // compute and assign the transform for this poster
          var transform = 'rotateY(' + (posterAngle * i) + 'deg) translateZ(' + RING_RADIUS + 'px)';
          poster.style.webkitTransform = transform;
          // setup the number to show inside the poster
          var content = poster.appendChild(document.createElement('p'));
          content.textContent = i;
      }

  }

  // call init once the document is fully loaded
  function getWords() {
      $.get(
          window.location.origin + '/getWords',
          function(data) {
             // choose transform notation for browser
              var isFirefox = typeof InstallTrigger !== 'undefined';
              var transform = "-webkit-transform";
              if (isFirefox) {
                  transform = "-moz-transform";
              }

              var wordLists = [data.word1, data.word2, data.word3];
              // populate tagline
              $("#hint").html("<h4>" + data.tagline + "</h4>")
              
              var rings = [$("#ring-1"), $("#ring-2"), $("#ring-3")];
              for (var j = 0; j < rings.length; j++) {
                  var html = "";
                  for (var i = 0; i < wordLists[j].length; i++) {
                      html += '<div class="poster" style="' + transform + ': rotateX(' + i * 30 + 'deg) translateZ(200px); "><p>';
                      html += wordLists[j][i];
                      html += '</p></div>';
                  }
                  rings[j].html(html);
              }
          }
      );
  }

  // calculate and resize upper and lower covers
  function resize() {
      var hcarve = $(".carve").height();
      var distanceToTop = ($(window).height() - hcarve) / 2 + 10;
      $(".wide.blue.top").height(distanceToTop);
      $(".wide.blue.footer").height(distanceToTop);
  }

  $(window).load(function() {
      setup_posters(document.getElementById('ring-1'));
      setup_posters(document.getElementById('ring-2'));
      setup_posters(document.getElementById('ring-3'));
      getWords();

      resize();

      $(document).keydown(function(evt) {
          if (evt.keyCode == 32) {
              // increment space count to see how many wheels should be stopped
              if (spaceCount == 3) {
                  getWords();
                  $(".ring").addClass("animated");
                  $(".poster").removeClass("chosen");
                  spaceCount = 0;
                  return;
              }

              spaceCount += 1;

              // handle word reveal of each ring
              $("#ring-" + spaceCount).removeClass("animated");
              var children = $("#ring-" + spaceCount).children();
              var poster = $(children).first();

              // calculate distance stage needs to be from the top for chosen poster to be vertically centered
              var dtop = $(window).height()/2 - poster.offset().top - poster.height()/2 + $("#stage"+spaceCount).offset().top;
              var percent = dtop / $(window).height() * 100
              $("#stage"+spaceCount).css('top', percent + "vh");
              
              poster.addClass("chosen");

          }
      });
  });

  $(window).resize(resize);
