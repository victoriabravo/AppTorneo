  
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
var db=firebase.firestore();
var colClubes = db.collection('equipos');
var colUsuarios = db.collection('usuarios');
var rolUser = "";


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

    //fnIniciarEquipos();
    //  fnIniciarUsuarios();

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

    colClubes.get()
    .then(function(querySnapShot){
      querySnapShot.forEach(function(doc){
        nombreClub = doc.data().Nombre;
        ptosClub= doc.data().Puntos;
        id = doc.id;

        filaNom="<div '"+id+"'>"+nombreClub+"</div>"
        filaPto="<div><input class=inputPtos value=0 '"+id+"'"+ptosClub+"></div>"

        $$('#colEq').append(filaNom);
        $$('#colPtos').append(filaPto);
      })
    })

if(rolUser == "Administrador"){
  console.log("Rol que puede editar")
  $$('.inputPtos').prop('disabled', true);
  $$('#btnPtos').addClass('mostrar');

  $$('#editarPtos').on('click', editInputs);
  $$('#guardarPtos').on('click', guardarCambios);

}else{
  $$('.inputPtos').prop('disabled', true);
  $$('#btnPtos').addClass('ocultar');
}




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
  var email = $$('#emailLogin').val();
  var password = $$('#passLogin').val(); 
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {

         alert("Siiiii")
         mainView.router.navigate('/categorias/');

        idUser = email;
        var docRef = colUsuarios.doc(idUser);

        docRef.get().then((doc)=>{
          rolUser = doc.data().Rol;

        })

           

         
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    

      
}


        

function fnIniciarEquipos(){
var clubId = "EFC";
var datos ={Nombre: "Echesortu F.C.", Categoria: "Primera",Division: "A1",Equipo: "A",Dt:"Juan Perez", Puntos:0}
  colClubes.doc(clubId).set(datos);

clubId = "CNR" ;
datos ={  Nombre: "Club Nautico", Categoria: "Primera",Division:"A1" ,Equipo: "C", Dt:"Jose Garcia", Puntos:0};
colClubes.doc(clubId).set(datos);
}

function fnIniciarUsuarios(){

  var userId = "admin@admin.com";
  var users = {Nombre: "Pablo", Apellido: "Martinez", Dni: 12369878, Rol: "Administrador", Club: ""}
  colUsuarios.doc(userId).set(users)

  var userId = "arbitro1@arbitros.com";
  var users = {Nombre: "Mario", Apellido: "Fernandez", Dni: 12345678, Rol: "Arbitro", Club: ""}
  colUsuarios.doc(userId).set(users)

  var userId = "dt@dt.com";
  var users = {Nombre: "Luis", Apellido: "Suarez", Dni: 10453287, Rol: "Entrenador", Club: ""}
  colUsuarios.doc(userId).set(users)
}

function editInputs(){
  $$('.inputPtos').prop('disabled', false);
}

function guardarCambios(){

  var ptosActuales = $$('.inputPtos').val();

  console.log(ptosActuales)
  db.collection("equipos").doc(id).update({Puntos: ptosActuales})
  .then(function() {

console.log("actualizado ok");
$$('.inputPtos').prop('disabled', true);

})
.catch(function(error) {

console.log("Error: " + error);

});

db.collection("equipos").doc(id)
.onSnapshot((doc) => {
  ptosClub= doc.data().Puntos;
        console.log("Current data: ", ptosClub);
    });
}

