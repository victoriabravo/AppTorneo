  
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
      {
        path: '/perfil/',
        url: 'perfil.html',
      },
    ]  
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var db=firebase.firestore();
var colClubes = db.collection('equipos');
var colUsuarios = db.collection('usuarios');
var rolUser = "";
var colJugadoras = db.collection('jugadoras');


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

    //fnIniciarEquipos();
    //fnIniciarUsuarios();

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
    $$('#btnLogout').on('click', fnLogout);
    
 
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
        ptosClub = doc.data().Puntos;
        id = doc.id;
        clubId = doc.id;

        filaNom="<div id='"+id+"'>"+nombreClub+"</div>"
        
         $$('#colEq').append(filaNom);

      })
    })

if(rolUser == "Administrador" || rolUser == "Arbitro"){
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
$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
    
    console.log("entramos a perfil!")

$$('#cargaJug').on('click', mostrarFormJ);
$$('#guardarJug').on('click', cargarJug);
$$('#cerrarJug').on('click', function(){
  $$('.inputJug').removeClass('mostrar').addClass('ocultar');
})


$$('#btnCamara').on('click', fnCamara);
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

        idUser = email;
        var docRef = colUsuarios.doc(idUser);

        docRef.get().then((doc)=>{
          rolUser = doc.data().Rol;

            if(rolUser == "Institucion"){
                mainView.router.navigate('/perfil/');
                console.log(rolUser)
        }else{
         mainView.router.navigate('/categorias/');
       }
       
        })
         
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Contraseña o usuario incorrectos")
      });
    

      
}

function fnLogout(){

    var user = firebase.auth().currentUser;

    if (user) {
        firebase.auth().signOut()
            .then(() => {
                console.log('Cerrar sesión');

                mainView.router.navigate('/index/');
            })
            .catch((error) => {
                console.log('error '+error);
            });
    } else {
      console.log('Ya cerre sesion');
    }


}


        

function fnIniciarEquipos(){
var clubId = "eche@club.com";
var datos ={Nombre: "Echesortu F.C.", Categoria: "Primera",Division: "A1",Equipo: "A",Dt:"Juan Perez", Puntos:0}
  colClubes.doc(clubId).set(datos);

clubId = "cnr@club.com" ;
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

  var userId = "eche@club.com";
  var users = {Nombre: "Echesortu F.C.", Apellido: "", Dni:"" , Rol: "Institucion", Club: ""}
  colUsuarios.doc(userId).set(users)
}

function editInputs(){
  $$('.inputPtos').prop('disabled', false);
}

function guardarCambios(){

ptosE = $$('#ptosEche').val();
ptosC = $$('#ptosCnr').val();

console.log(ptosE)

console.log(ptosC)

  db.collection("equipos").doc(id).update({Puntos: ptosE})
  .then(function() {

console.log("actualizado ok");
$$('.inputPtos').prop('disabled', true);

})
.catch(function(error) {

console.log("Error: " + error);

});
db.collection("equipos").doc(id).update({Puntos: ptosC})
  .then(function() {

console.log("actualizado ok");
$$('.inputPtos').prop('disabled', true);

})
.catch(function(error) {

console.log("Error: " + error);

});

}

function mostrarFormJ(){
  $$('.inputJug').removeClass('ocultar').addClass('mostrar'); 
}

function cargarJug(){
 
var nombre = $$('#nombreJug').val();
var apellido = $$('#apeJug').val();
var dni = $$('#dniJug').val();
var email = $$('#emailJug').val();
var club = $$('#clubJug').val();

var jugId= dni ;
var datos = {Nombre : nombre, Apellido: apellido, Dni: dni, Email: email, Club: club}
colJugadoras.doc(jugId).set(datos);

$$('#nombreJug').val("");
$$('#apeJug').val("");
$$('#dniJug').val("");
$$('#emailJug').val("");
$$('#clubJug').val("");

colJugadoras.get()
    .then(function(querySnapShot){
      querySnapShot.forEach(function(doc){
        nomJug = doc.data().Nombre;
        apeJug= doc.data().Apellido;
        dniJug = doc.data().Dni;
        clubJug = doc.data().Club;

        filasNom="<div>"+nomJug+"</div>"
        filasApe="<div>"+apeJug+"</div>"
        filasDni="<div>"+dniJug+"</div>"
        filasClub="<div>"+clubJug+"</div>"


        $$('#colNom').append(filasNom);
        $$('#colApe').append(filasApe);
        $$('#colDni').append(filasDni);
        $$('#colClub').append(filasClub);
      })
    })


}

function fnCamara(){
  navigator.camera.getPicture(onSuccessCamara, onErrorCamara,
{
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY, 300, 600)
});
}

function onSuccessCamara(imageURI){
  $$('#foto').attr("src", imageURI)
   var storageRef = firebase.storage().ref();
    var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
}
var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
};

var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, 'test.jpg'));
        });
    };

    getFileObject(imageURI, function(fileObject) {
        var uploadTask = storageRef.child('images/test.jpg').put(fileObject);

        uploadTask.on('state_changed', function(snapshot) {
            console.log(snapshot);
        }, function(error) {
            console.log(error);
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            // handle image here
        });
    });

}



function onErrorCamara() {
    console.log('error de camara');
}
