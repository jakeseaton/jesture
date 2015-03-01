console.log("currently on the comix page");
// Content script for Jesture Chrome Extension
// Developed by: Jake Seaton Quincy-Dewolfe 20-05
// Injected into every page of harvardlampoon.com

/* SCRIPT TO BE RUN ON EVRY PAGE OF THE HARVARD LAMPOON WEBSITE */

// get everything in storage
// get the key arrays for each object
// when stars are clicked, check if they're in the array already and append them
// then sync with storage
// that tells the jesture page to update.

// listener for changes in chrome.storage
chrome.storage.onChanged.addListener(function(changes, namespace){
  for (var key in changes){
    var storageChange = changes[key];
    console.log("storage was changed");
    }
});


// listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log("message from the background script");
  // var comix_id = request.comix_size;
  // console.log(comix_id);

});

var favorite_comix = [];
chrome.storage.sync.get("comix", function assign(data){
  if (!chrome.runtime.error){
    favorite_comix = data.comix.favorites;
  }
});




// build icons
var star_url = chrome.extension.getURL('star.png');
var arrow_url = chrome.extension.getURL('arrow.png');
var jesture_url = chrome.extension.getURL('jesture_page.html');

var star_comix = "<img id = 'star-comix' class = 'star inactive' src = " + star_url + " alt = 'star'/>";

var arrow_html = "<a width = '36px' height = '36px' href = " + jesture_url + "><img class = 'arrow' src = " + arrow_url + " alt = 'arrow'/></a>";

var jesture_comix = "<div id = 'jesture-container'><div id = 'jesture'>"+ star_comix + arrow_html +"</div></div>";


/* Appending */

// Comix Page
// do I want it to prepend or append?
// if you append you have to switch the code in the switch statement
$("#comic-full").append(jesture_comix);

// // Authors
// var jesture_author = star_html;//"<div height = '34px' id = 'jesture'>" + star_html + "</div>";
// $(".author-header").hover(function(){
// 	$(this).append(jesture_author);
// }, function(){
// 	$("#jesture").remove();
// });

/* Functionality */

$(".star").click(function(){
  if ($(this).hasClass("inactive")){
    console.log("changing "+ $(this).attr("id") +" to active");
    var item = {source: $(this).parent().parent().prev().attr('src')};
    chrome.storage.sync.set({comix:item}, function(){
      // comix_key
      // fire changed event
      console.log("added "+ item +" to storage with key comix and id", comix_key);
      // fix all of this
    });
    $(this).removeClass("inactive");
    $(this).fadeTo("fast",1);
    $(this).addClass("active");
  }
  else {

    $(this).removeClass("active");
    $(this).addClass("inactive");
    $(this).fadeTo("fast",.5);
    // remove it from storage
  }
});




/* Animations */

// animate stars
$(".star").hover(function(){
  $(this).fadeTo("fast",1);
},function(){
  $(this).fadeTo("fast",.5);
});


// animate arrow
$(".arrow").hover(function(){
  $(this).fadeTo("fast",1);
}, function(){
  $(this).fadeTo("fast",.5);
});
