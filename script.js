document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    this.classList.remove('is-visible');
}, false);
var drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
var housesGlobal = []
function getHousesSucces(houses){
console.log(houses)
if(!houses){
//load new house, join house
}
else if(houses.length == 0){
//load new house, join house
}
else{
//load decide between houses, new house, join house
for(var i in houses){
housesGlobal = houses
var name = houses[i][1]
var id = houses[i][0]
$('#loginMenu').append("<a class='mdl-navigation__link' id='a" + id + "' ><i class='material-icons' style='vertical-align:top;' >home</i> " + houses[i][1] + "</a>")
$('#a'+id).click(function(){
//load house
//alert($(this).attr('id'))
loadHouse($(this).attr('id'))
})
var cardId = 'a'+ id;
$('#joinCard')
          .clone()
          .attr('id', cardId)
          .insertBefore('#joinCard')
           //            ^-- Use '#id' if you want to insert the cloned
           //                element in the beginning
//          .text('Cloned ' + (cloneCount-1)); //<--For DEMO
$('#'+cardId + ' .mdl-card__title h2').text(name)
$('#'+cardId + ' .mdl-card__supporting-text').text('Manage this house')
$('#'+cardId + ' .mdl-button').text('Open ' + name)
$('#'+cardId + ' .mdl-button').click(function(){
loadHouse($(this).parent().parent().attr('id'))
})
}
}
}
function loadHouse(id){
id = id.substr(1)
displayPage('home')
var houseName = ''
$('#loginMenu').css('display', 'none')
$('#houseMenu').css('display', '')
for(var i in housesGlobal){
if(id == housesGlobal[i][0]){
houseName = housesGlobal[i][1]
console.log(houseName)
}
}
$('#ahouse').html("<i class='material-icons' style='vertical-align:top;' >home</i> " + houseName)

}













function displayPage(page){
console.log('displaying ' + page)
$('.page').css('display','none')
$('#'+ page.toString()).css('display', 'inline')}

function newHouse_next(){
$( "#step_one" ).toggle( "slide" );
var part = $('#part').val()
part = Number(part) - 1

//get first row, replicate
var e = $('.upgradeTextField')

    for (var i = 1; i < part; i++) {
      var newe = e.clone()
//      componentHandler.upgradeElement(newe.html());
      newe.insertAfter(e);
    }
var textFieldUpgrades = document.querySelectorAll('.upgradeTextField');

if(textFieldUpgrades) {

    for(var i=0;i<textFieldUpgrades.length;++i) {
        textFieldUpgrades[i].className = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label person';
    }

}
componentHandler.upgradeDom();
// Expand all new MDL elements

setTimeout(function(){
$('#step_two').css('display', 'inline')
 }, 500);
}
function makeHouse(){
var name = $('#houseName').val()
var emails = []
$('.personMail').each(function () {
    emails.push($(this).val());
});
console.log(emails)
google.script.run.withSuccessHandler(createHouseSucces)
         .createHouse(name, emails)
}
function createHouseSucces(listJSON){
alert('Een spreadsheet met de info voor jouw huis is aangemaakt in je Google Drive. Dit is de database van het huis. Verander hier niks aan!' + listJSON)}
