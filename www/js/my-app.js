  
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
      {
        path: '/equiposA1/',
        url: 'equiposA1.html',
      },
      {
        path: '/equiposA2/',
        url: 'equiposA2.html',
      },
      {
        path: '/fechas/',
        url: 'fechas.html',
      },
      {
        path: '/contacto/',
        url: 'contacto.html',
      },
      {
        path: '/noticias/',
        url: 'noticias.html',
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

  
   
})
     $$('#btnIngresar').on('click', function(){
        mainView.router.navigate('/categorias/');
    })

    $$('#btnLoguear').on('click', cambiarForm);
    $$('#btnLogin').on('click', fnLogin);
    

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="categorias"]', function (e) {
    
    console.log("entramos a categorias!");
    $$('#catA1').on('click', function(){
      mainView.router.navigate('/equiposA1/');
    })
    $$('#catA2').on('click', function(){
      mainView.router.navigate('/equiposA2/');
    })

})
 

$$(document).on('page:init', '.page[data-name="equiposA1"]', function (e) {
    
    console.log("entramos a equiposA1!")
    $$('#fechas').on('click', function(){
      mainView.router.navigate('/fechas/');
    })
})

$$(document).on('page:init', '.page[data-name="equiposA2"]', function (e) {
    
    console.log("entramos a equiposA2!")
})
$$(document).on('page:init', '.page[data-name="fechas"]', function (e) {
    
    console.log("entramos a fechas!")
})
$$(document).on('page:init', '.page[data-name="contacto"]', function (e) {
    
    console.log("entramos a contacto!")
})
$$(document).on('page:init', '.page[data-name="noticias"]', function (e) {
    
    console.log("entramos a noticias!")
})

function cambiarForm(){
    if($$('#loginForm').hasClass('ocultar')){
       $$('#loginForm').removeClass('ocultar').addClass('mostrar'); 
    }
    else{
        $$('#loginForm').removeClass('mostrar').addClass('ocultar')
    } 
};

function fnLogin(){
    email = $$('#emailLogin').val();
    password = $$('#passLogin').val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
         mainView.router.navigate('/categorias/');
         alert("CORRECTOOOOOOOOOO")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

}
