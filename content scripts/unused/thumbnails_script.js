// // build icons
// var star_url = chrome.extension.getURL('star.png');
// var arrow_url = chrome.extension.getURL('arrow.png');
// var plus_url = chrome.extension.getURL('plus.png');
// var jesture_url = chrome.extension.getURL('jesture_page.html');
//
// var star_comix = "<img id = 'star-comix' class = 'star inactive' src = " + star_url + " alt = 'star'/>";
// var star_piece = "<img id = 'star-piece' class = 'star inactive' src = " + star_url + " alt = 'star'/>";
// var star_issue = "<img id = 'star-issue' class = 'star inactive' src = " + star_url + " alt = 'star'/>";
// var star_thumbnail = "<img id = 'star-thumbnail' class = 'star inactive' src = " + star_url + " alt = 'star'/>";
//
// var arrow_html = "<a width = '36px' height = '36px' href = " + jesture_url + "><img id = 'arrow' class = 'inactive' src = " + arrow_url + " alt = 'arrow'/></a>";
// var plus_html = "<img id = 'plus' class = 'inactive' src = " + plus_url + " alt = 'plus'/>";
//
// var jesture_issue = "<br><div height = '34px' id = 'jesture'>"+ star_issue + arrow_html +"</div>";
// var jesture_thumbnail = "<div id = 'jesture-container'><div id = 'jesture'>"+ star_thumbnail + arrow_html +"</div></div>";
// var jesture_comix = "<div id = 'jesture-container'><div id = 'jesture'>"+ star_comix + arrow_html +"</div></div>";
// var jesture_piece = "<div id = 'jesture-container'><div id = 'jesture'>"+ star_piece + arrow_html +"</div></div>";
//
// // Thumbnails
// $('.info-bar').hover(function(){
//   $(this).append(jesture_thumbnail);
// },function(){
//   $('#jesture-container').remove();
// });
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



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log("message from the background script");
  // var comix_id = request.comix_size;
  // console.log(comix_id);

});

var favorite_pieces = [];


chrome.storage.sync.get("pieces", function assign(data){
    favorite_pieces = data.pieces.favorites;// maybe need to add data.pieces.favorites?
});




// build icons
var star_url = chrome.extension.getURL('star.png');
var arrow_url = chrome.extension.getURL('arrow.png');
var jesture_url = chrome.extension.getURL('jesture_page.html');

var star_thumbnail = "<img id = 'star-thumbnail' class = 'star inactive' src = " + star_url + " alt = 'star'/>";
var arrow_html = "<a width = '36px' height = '36px' href = " + jesture_url + "><img class = 'arrow' src = " + arrow_url + " alt = 'arrow'/></a>";

var jesture_thumbnail = "<div id = 'jesture-container'><div id = 'jesture'>"+ star_thumbnail + arrow_html +"</div></div>";


/* Appending */

// Comix Page
// do I want it to prepend or append?
// if you append you have to switch the code in the switch statement

// Issues Page
// add to hovered issue
// $('.issue').hover(function(){
// 	$(this).find(".issue-title").append(jesture_issue);
// },function(){
// 	$('#jesture').remove();
// });

// Individual Pieces
// prepend or append?

// Thumbnails
$('.info-bar').hover(function(){
  $(this).animate({"height":"110px"});
  $(this).append(jesture_thumbnail);
},function(){
  $(this).animate({"height":"90px"});
  $('#jesture-container').remove();
});

// // Authors
// var jesture_author = star_html;//"<div height = '34px' id = 'jesture'>" + star_html + "</div>";
// $(".author-header").hover(function(){
// 	$(this).append(jesture_author);
// }, function(){
// 	$("#jesture").remove();
// });

/* Functionality */

// could implement
// favorite on click

$(".star").click(function(){
  if ($(this).hasClass("inactive")){
    console.log("changing "+ $(this).attr("id") +" to active");
    // add the piece to storage
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

// // aniamte plus
// $("#plus").hover(function(){
// 	$(this).fadeTo("fast",1);
// },function(){
// 	$(this).fadeTo("fast",.5);
// });

// animate arrow
$(".arrow").hover(function(){
  $(this).fadeTo("fast",1);
}, function(){
  $(this).fadeTo("fast",.5);
});
