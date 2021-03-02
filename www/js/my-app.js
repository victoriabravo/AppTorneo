  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/categorias/',
        url: 'categorias.html',
      },
       {
        path: '/index/',
        url: 'index.html',
      },
    ]  
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {

console.log("entramos a index!")

    $$('#btnLoguear').on('click', cambiarForm);

    $$('#btnIngresar').on('click', function(){

        mainView.router.navigate('/categorias/');

    })
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="categorias"]', function (e) {
    
    console.log("entramos a categorias!")
})

function cambiarForm(){
    if($$('#loginForm').hasClass('ocultar')){
       $$('#loginForm').removeClass('ocultar').addClass('mostrar'); 
    }
    else{
        $$('#loginForm').removeClass('mostrar').addClass('ocultar')
    } 
}
