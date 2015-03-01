// WHEN THEY HOVER OVER THE STAR REMOVE THE LINK TO THE ISSUE FROM THE PARENT DIV
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
// // Issues Page
// // add to hovered issue
// $('.issue').hover(function(){
//   $(this).find(".issue-description").append(jesture_issue);
// },function(){
//   $('#jesture').remove();
// });
// listener for changes in chrome.storage
chrome.storage.onChanged.addListener(function(changes, namespace){
  for (var key in changes){
    var storageChange = changes[key];
    console.log("storage was changed");
    }
});

var favorite_issues = [];
chrome.storage.sync.get("issues", function assign(data){
  favorite_issues = data.issues.favorites;
});


// build icons
var star_url = chrome.extension.getURL('star.png');
var arrow_url = chrome.extension.getURL('arrow.png');
var jesture_url = chrome.extension.getURL('jesture_page.html');

var star_issue = "<img class = 'star' src = " + star_url + " alt = 'star'/>";

var arrow_html = "<a width = '36px' height = '36px' href = " + jesture_url + "><img class = 'arrow' src = " + arrow_url + " alt = 'arrow'/></a>";

var jesture_issue = "<br> <div height = '34px' id = 'jesture'>"+ star_issue + arrow_html +"</div>";

$(".issue").find(".issue-description").append(jesture_issue);

var issue_id = 0;

// could implement
// favorite on click

$(".star").click(function(){
  if ($(this).hasClass("inactive")){
    console.log("changing "+ $(this).attr("id") +" to active");
    // insert the issue into storage
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
