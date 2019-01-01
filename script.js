document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    this.classList.remove('is-visible');
}, false);
var drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
var housesGlobal = []
var database = firebase.database()

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
  var username = $('#username').val();
  var pwd = $('#code').val();
  database.ref('users/' + username).once('value').then(function(snapshot){
    if(snapshot.val().password == pwd){
      console.log('succesful login')
      login_page(snapshot.val());
    }
    else if(snapshot.val().password){
      alert('wrong pass')
    }
    else{
      alert('wrong user')
    }
  });
}
function login_page(data){
  console.log(data);
  $('#loginDiv').hide();
  $('#nameTitle').text('Welkom, ' + data.fullname);
  $('#wijkTitle').text('Wijk: ' + data.wijk);
  $('#userpage').fadeIn('1000');

}
