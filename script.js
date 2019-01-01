document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    this.classList.remove('is-visible');
}, false);
var drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
var housesGlobal = []
var database = firebase.database()
document.onload = $('#loader').hide()
$('#loginDiv').fadeIn(1200);
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
  console.log(data);
  $('#loginDiv').hide();
  $('#userHead').html("<i class='material-icons' style='vertical-align:middle;'>account_circle</i>  " + data.fullname + ', ' + data.speltak);
  $('#menuTitle').text(data.fullname);
  $('#userpage').fadeIn('1000');
  $("#login_nav").hide();
  $('#user_nav').show();

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
