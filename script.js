document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    this.classList.remove('is-visible');
}, false);
var drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
var housesGlobal = []
var database = firebase.database()
document.onload = $('#loader').hide();
$('#loginDiv').fadeIn(1200);

$('.count').on('keyup', function(){
  var ger = Number($('#ger').val());
  var fuc = Number($('#fuc').val());
  var sm = Number($('#sm').val());
  var bp = Number($('#bp').val());
  $('#kosten').text('€' + (ger + fuc + sm + bp) *( 2))
})
var userData;

$('.mdl-layout__header').slideDown(1200)
$('#code, #username').keypress(function(e){
  if (e.keyCode == 13){
    user_login();
  }
});
$('#username').focus()

$("#loginButton").click(user_login);

function user_login(){
  load()
  var username = $('#username').val().toLowerCase();
  var pwd = $('#code').val().toLowerCase();
  database.ref('users/' + username).once('value').then(function(snapshot){
    load()
    if(!snapshot.val()){
      showSnack('Naam is niet herkend');
      $('#loginDiv').effect( "shake" , 400);

    }
    else if(snapshot.val().password == pwd){
      showSnack('Welkom, ' + snapshot.val().fullname)
      login_page(snapshot.val());
    }
    else if(snapshot.val().password){
      showSnack('Verkeerd wachtwoord')
      $('#loginDiv').effect( "shake" );
    }

  });
}
function login_page(data){
  userData = data;
  console.log(data);
  $('#loginDiv').hide();
  $('#userHead').html("<i class='material-icons' style='vertical-align:middle;'>account_circle</i>  " + data.fullname + ', ' + data.speltak);
  $('#menuTitle').text(data.fullname);
  $('#userpage').fadeIn('1000');
  $("#login_nav").hide();
  $('#user_nav').show();
  $('#userBar').show()
  $('.mdl-layout__tab-bar-container').show()
  $('main').css('background', '#ebebeb')
  loadData();
}
function loadData(){
  var username = userData.username;
  var wijk = userData.wijk;

  database.ref('wijken/' + wijk).once('value').then(function(snapshot){
   var huizen = snapshot.val().huizen;
   for(var i in huizen){
     var huis = huizen[i]
       database.ref('huizen/' + huis).once('value').then(function(snapshot){
         var straat= snapshot.val().straat;
         var nummer = snapshot.val().nummer;
         $('#huizenSelect').append($('<option>', {value:huis, text:straat + ' ' + nummer}));

       });
     }
});



}
function showSnack(msg){
  'use strict';
  var snackbarContainer = document.querySelector('#demo-snackbar-example');

    var data = {
      message: msg,
      timeout: 2000,
      actionText: 'Undo'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};
var loader = false;

function load(){
  if(loader){
    $('#loader').hide();
    loader = false;
  }
  else {
    $('#loader').show();
    loader = true;
  }
}
function saveHouse(){
  var straat = $('#straat').val();
  var nr = $('#nummer').val()
  var email = $('#email').val()
  var naam = $('#kopernaam').val()
  var ger = Number($('#ger').val());
  var gger = Number($('#gger').val());
  var fuc = Number($('#fuc').val());
  var gfuc = Number($('#gfuc').val());
  var sm = Number($('#sm').val());
  var gsm = Number($('#gsm').val());
  var bp = Number($('#bp').val());
  var gbp = Number($('#gbp').val());
  var wijk = userData.wijk;
  var verkoper = userData.fullname;
  var timestamp = new Date();

  var huis = {
    straat: straat,
    nummer: nr,
    naam: naam,
    email: email,
    wijk: wijk,
    verkoper: verkoper,
    geraniums: ger,
    ggeraniums: gger,
    fuchias: fuc,
    gfuchias: gfuc,
    sm: sm,
    gsm: gsm,
    bp: bp,
    gbp: gbp,
    tijd: timestamp.toString(),

  }
  console.log(huis);
  var id = timestamp.getTime();
  var succes = false;
  database.ref('huizen/' + id).set(huis, function(error) {
    if (error) {
      // The write failed...
      showSnack('Er is iets mis gegaan, probeer het opnieuw')
    } else {
      // Data saved successfully!
      succes = true;
    }
  });
  database.ref('wijken/' + wijk + '/huizen').push(id, function(error){
    if(error){
      if(succes){
        showSnack('Er is iets mis gegaan, probeer het opnieuw')
      }
      else{
        showSnack('Weet je zeker dat je een internetverbinding hebt?')

      }
    }
    else{
      if(succes){
        showSnack('Het huis is opgeslagen!')
        //empty form
        //reload data
      }
    }
  })



}
