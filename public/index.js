
// function mainController(scope, http) {
//     scope.formData = {};

//     // when landing on the page, get all todos and show them
//     http.get('/api/onload')
//         .success(function(data) {
//             scope.todos = data;
//             console.log(data);
//         })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });

// }

//  app.get('/api/onload')
//         .success(function(data) {
//             scope.todos = data;
//             console.log(data);
//         })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });

// $( function() {

//   var tap = !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);
//   $('body').addClass(tap ? 'tap' : 'no-tap');

//   //////////////////////////////////

//   var $input  = $('[data-input]');
//   var $output = $('[data-output]');
//   var $render = $('[data-render]');
//   var $spookyRender = $('[data-spooky-render]');

//   var makingRequest = false;

//   //////////////////////////////////

//   function renderText(template, spooky) {
//     // no ajaxing if we're already ajaxing.
//     if(makingRequest) {
//       return;
//     }
//     // dim the output to indicate that we're waiting
//     makingRequest = true;
//     $output.toggleClass('dim', true);

$.get(
  'http://localhost:8080/getWords' ,
  function(data) {
    makingRequest = false;
    // var source   = $("#template").html();
    // var template = Handlebars.compile(source);
    // var html    = template(data);
    // $output.toggleClass('dim', false);
    // $output.html(data);
    console.log(data);
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