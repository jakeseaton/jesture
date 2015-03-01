/*
MAKE EACH TAB ORAGNIZE BY THAT THING
*/

// chrome.storage.sync.get('comix',function(data){
//   console.log("comix",data);
//   $("body").append('comix',data);
// });
// chrome.storage.sync.get('piece',function(data){
//   $("body").append('piece',data);
//   console.log("piece",data);
// });
var minusIcon = '<img src = "entypo/circle-with-minus.svg" class = "minus icon inactive"/>';
// var playIcon = '<img src = "entypo/controller-play.svg" class = "play icon inactive"/>';
// var cycleIcon = '<img class = "cycle icon inactive" src= "entypo/cycle.svg"/>';
var downloadIcon = '<img src = "entypo/download.svg" class = "download icon inactive"/>';
var facebookIcon, twitterIcon;
var downIcon = '<img class = "down icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-down.svg"/>';
var upIcon = '<img class = "up icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-up.svg"/>';

var menuBar = '<div class = "menu">'+upIcon + downIcon+downloadIcon +minusIcon+'</div>';

// listener for changes in chrome.storage
chrome.storage.onChanged.addListener(function(changes, namespace){
  console.log("storage was changed");
  for (var key in changes){
    var storageChange = changes[key];
    // UPDATE CONTENT-- rerun the main function
    // display a loader while we wait?
    }
  // main();
});
var hash = 1;
// $(document).ajaxStart(function(){
//   $("#loading").removeClass("invisible");
// });
// $(document).ajaxStop(function(){
//   $("#loading").addClass("invisible");
// });

$(document).ready(function(){
  // reset? ()
  chrome.storage.sync.get("feed", function(data){
    if (!chrome.runtime.error){
      var Feed = data.feed
      console.log(data);
      for (item in Feed){
        var curr = Feed[item];
        console.log(curr);
        switch (curr.Type){
          case "author":
            createAuthorItem(curr.List, curr.Author)
            break;
          case "issue":
            console.log("got to here")
            createIssueItem(curr.Img, curr.Description, curr.Title);
            break;
          case "comix":
            createComixItem(curr.Img, curr.Title);
            break;
          case "piece":
            createPieceItem(curr.Url, curr.Title, curr.Author)
            break;
        }
      }


    } // end check for error

    else {
      alert("an error occurred");
    }
    // for (i = 1;i<authors_favorites.length;i++){
    //   $("#pieces").append(authors_favorites[i].Title);
    // }
    // $("#issues").append(issues_favorites[i].Title);
    // $("#comix").append(comix_favorites[0]);
    // $("#authors").append(authors_favorites[0]);

  });
  $("#jesture-page-link").each(function(){
    $(this).click(function(e){
      e.preventDefault()

      var destination = $(this).attr("href")
      chrome.tabs.getSelected(null,function(tab){
        chrome.tabs.update(tab.id,{url:destination});
      });
    });
  });// end jesture page link
});// end main

function ajax_pieces(Url, Title, Author){
  // jQuery.retrieveJSON(Url, function call(json,status){
  //   console.log("called it")
  //   console.log(json);
  //   console.log(data);
  //      var txt = $(data).find(".piece-text-container").find("h2").html();
  //      var $template = $(".template1");
  //      var $newPanel = $template.clone();
  //      $newPanel.removeClass("template1");
  //      // construct
  //      $newPanel.removeClass("invisible");
  //      $newPanel.find(".collapse").removeClass("in");
  //      $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
  //               .text(Title+" "+Author);
  //      $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
  //      $newPanel.find(".panel-body").html(txt);
  //      $("#accordion1").prepend($newPanel.fadeIn());
  // });

  $.ajax(Url, {
    success: function(data){
      var txt = $(data).find(".piece-text-container").find("h2").html();
      var $template = $(".template1");
      var $newPanel = $template.clone();
      $newPanel.removeClass("template1");
      // construct
      $newPanel.removeClass("invisible");
      $newPanel.find(".collapse").removeClass("in");
      $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
               .text(Title+" "+Author);
      $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
      $newPanel.find(".panel-body").html(txt);
      $("#accordion1").prepend($newPanel.fadeIn());
    }
  });
}

function createPieceItem(u, Title, Author){
  console.log(u)
  console.log(localStorage)
  var txt = localStorage.getItem(u)
  console.log(txt);
  var $template = $(".template1");
  var $newPanel = $template.clone();
  $newPanel.removeClass("template1");
  // construct
  $newPanel.removeClass("invisible");
  $newPanel.find(".collapse").removeClass("in");
  $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
           .text(Title+" "+Author);
  $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
  $newPanel.find(".panel-body").html(txt);
  $("#accordion1").prepend($newPanel.fadeIn());
}

// append comix
function createComixItem(Img, Title){

  var img_html = "<img src = 'http://harvardlampoon.com"+Img+"'/>";

  var $template = $(".template4");
  var $newPanel = $template.clone();
  $newPanel.removeClass("template4");
  // construct
  $newPanel.removeClass("invisible");
  $newPanel.find(".collapse").removeClass("in");
  $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
           .text(Title);
  $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
  $newPanel.find(".panel-body").html(img_html);
  $("#accordion4").prepend($newPanel.fadeIn());
  // // use the jquery keys function for local storage, to get the value at that location
  // current_html = '<div class="issue"><div class="issue-cover">'+img_html+'</div><h2 class="issue-title">'+Title+'</h2></div>'
  // $("#favorite-comix").append(current_html);
}
// append issues
function createIssueItem(Img, Description, Title){
  //$("#issues").append(issues_favorites[i].Title);
  console.log("derp")
  var $template = $(".template2");
  var $newPanel = $template.clone();
  $newPanel.removeClass("template2");
  // construct
  $newPanel.removeClass("invisible");
  $newPanel.find(".collapse").removeClass("in");
  $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
           .text(Title);
  $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
  $newPanel.find(".panel-body").html(Description);
  $("#accordion2").prepend($newPanel.fadeIn());
  console.log("derp");
  // var current_html = '<div class="issue"><div class="issue-cover"><img src='+Img+'></div><h2 class="issue-title">'+issueObject.Title+'</h2></div>'
  // $("#favorite-issues").append(current_html);
}
// display pieces by author names
function createAuthorItem(List, Author){
  var $template = $(".template3");
  var $newPanel = $template.clone();
  $newPanel.removeClass("template3");
  // construct
  $newPanel.removeClass("invisible");
  $newPanel.find(".collapse").removeClass("in");
  $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
           .text(Author);
  $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
  $newPanel.find(".panel-body").html(List);
  $("#accordion3").prepend($newPanel.fadeIn());
}
