// settings for frontend
const POSTERS_PER_ROW = 12;
const RING_RADIUS = 200;

// a counter to keep track how many space/tap/click interactions have occured
// determines whether to make get request
var spaceCount = 0;


/**
 * helper function to create "posters", ring elements containing spinning 'p' elements
 * @param {element} ring element to add the 'p' elements to
 */

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

/**
 * get words from ther server
 * @param {element} ring element to add the 'p' elements to
 */

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
            $("#hint").html(data.tagline);

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

/**
 * on window rezize, recalcuates element sizes
 */

function resize() {
    var hcarve = $(".carve").height();
    var distanceToTop = ($(window).height() - hcarve) / 2 + 10;
    $(".wide.blue.top").height(distanceToTop);
    $(".wide.blue.footer").height(distanceToTop);
}

$(window).load(function() {
    /**
     * helper function to detect if the user is using IE
     * @returns {boolean} true if IE, false if not
     */
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE');
        if (msie > 0) {
            // IE 10 or older
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11
            var rv = ua.indexOf('rv:');
            return true;
        }
        // other browser
        return false;
    }

    // if IE, boo them, clear page
    if (detectIE()) {
        $(".isIE").show();
        $(".container").hide();
        $(".container").html("");
    } else {
        setup_posters(document.getElementById('ring-1'));
        setup_posters(document.getElementById('ring-2'));
        setup_posters(document.getElementById('ring-3'));
        getWords();
        resize();

        // creates tooltips
        $('.circular.button').popup({
            variation: "mini inverted",
            position: "top center",
            prefer: "opposite",
            inline: "true"
        });

        $("#share").on("click", share_page);

        $(document).on("keydown tap", function(event) { handleEvent(event) });

        /**
         * handler for space bar keydown and tap/click events
         * @returns {boolean} true if IE, false if not
         */
        function handleEvent(e) {
            if ((e.type == "tap") || (e.type == "keydown" && e.keyCode == 32)) {
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
                var dtop = $(window).height() / 2 - poster.offset().top - poster.height() / 2 + $("#stage" + spaceCount).offset().top;
                var percent = dtop / $(window).height() * 100;
                $("#stage" + spaceCount).css('top', percent + "vh");

                poster.addClass("chosen");
            }
        }
    }
});

$(window).resize(resize);

function share_page() {
    var fbpopup = window.open("https://www.facebook.com/sharer/sharer.php?u=" + window.location.href, "pop", "width=600, height=400, scrollbars=no");
    return false;
}
