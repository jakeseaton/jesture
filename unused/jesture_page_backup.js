var minusIcon = '<img src = "entypo/circle-with-cross.svg" class = "minus icon inactive"/>';
// var playIcon = '<img src = "entypo/controller-play.svg" class = "play icon inactive"/>';
// var cycleIcon = '<img class = "cycle icon inactive" src= "entypo/cycle.svg"/>';
var downloadIcon = '<img src = "entypo/download.svg" class = "download icon inactive"/>';
var facebookIcon, twitterIcon;
var downIcon = '<img class = "down icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-down.svg"/>';
var upIcon = '<img class = "up icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-up.svg"/>';
var browserIcon = '<img class = "browser icon inactive" src = "entypo/browser.svg"/>'

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

//
// // listener for changes in local storage
// window.addEventListener("storage", handle_local_storage_change);
//
// function handle_local_storage_change(e){
//   console.log(localStorage);
//   //console.log(e.key, e.newValue);
//   // main();
// }


$(document).ready(function(){
  // reset? ()
  chrome.storage.sync.get(["pieces","issues","comix", "authors"], function assign(data){
    if (!chrome.runtime.error){

      var pieces_favorites = data.pieces.favorites;
      var issues_favorites = data.issues.favorites;
      var comix_favorites = data.comix.favorites;
      var authors_favorites = data.authors.favorites;

      // append pieces
      for (i = 1;i<pieces_favorites.length;i++){
        // construct the object
        var pieceObject= pieces_favorites[i];
        var Author = pieceObject.Author;
        var Title = pieceObject.Title;
        var Url = pieceObject.Url;
        var Img = pieceObject.Img;
        // console.log(Title);
        // console.log(Url);
        if (Url != "http://harvardlampoon.com/"){
          Url = "http://harvardlampoon.com" + Url;
          // console.log(Url);
        }
        var current_html;
        if (Img != false){
          current_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a><a class="author-link" href="http://harvardlampoon.com/masthead">'+Author+'</a></div><a href='+ Url+ '><h3 class="piece-title">'+ Title +'</h3></a>'+menuBar+'</div><div class="background"><img src="http://harvardlampoon.com'+Img+'"></div></li>';
        }
        else {
          current_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a><a class="author-link" href="http://harvardlampoon.com/masthead">'+Author+'</a></div><a href='+ Url+ '><h3 class="piece-title">'+ Title +'</h3></a>'+menuBar+'</div><div class="background"><img src="img/hat_active.png"></div></li>';
        }

        $("#favorite-pieces").prepend(current_html);

      }

      // append comix
      for (i = 1;i<comix_favorites.length;i++){
        comixObject = comix_favorites[i];
        var path = comixObject.Img;
        var Url = comixObject.Url;
        // console.log(index);
        // var data = localStorage.getItem(index);
        // var img_html = "<img src= 'data:image/png;base64,"+data+"'/>"
        Img = comixObject.Img.split("/")[3];
        var Title
        if (comixObject.Title != false){
          Title = comixObject.Title
        }
        else{
          Title = Img.split("_")[0].split("-").join(" ");
        }
        var img_html = "<img height = '100%' src = 'http://harvardlampoon.com"+path+"' />";
        // use the jquery keys function for local storage, to get the value at that location
        // current_html = '<a href = "'+comixObject.Url+'"><div class="issue"><div class="issue-cover">'+img_html+'</div><h2 class="issue-title">'+Title+'</h2></div></a>'
        // $("#favorite-comix").append(current_html);
        current_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a></div><a href='+ Url+ '><h3 class="piece-title">'+ Title +'</h3></a>'+menuBar+'</div><div class="background">'+img_html+'</div></li>';
        $("#favorite-pieces").prepend(current_html)
      }
      // append issues
      for (i = 1;i<issues_favorites.length;i++){
        //$("#issues").append(issues_favorites[i].Title);
        var issueObject = issues_favorites[i];
        var Img = issueObject.Img
        var Description = issueObject.Description
        console.log(issueObject);

        var current_html = '<a href = "'+issueObject.Url+'"><div class="issue"><div class="issue-cover"><img src= http://harvardlampoon.com'+issueObject.Img+'></div><h2 class="issue-title">'+issueObject.Title+'</h2><div class = "issue-description">'+issueObject.Description+'</div></div></a>'
        $("#favorite-issues").append(current_html);
      }
      attach_jquery();
    } // end check for error

    else {
      alert("an error occurred");
    }

  });
});


function attach_jquery(){
  $("a").each(function(){
    $(this).click(function(){

      var destination = $(this).attr("href")
      console.log(destination);
      chrome.tabs.getSelected(null,function(tab){
        console.log(tab);
        chrome.tabs.update(tab.id,{url:destination});
      });
    });
  });

  $('.info-bar').each(function(){
    $(this).css({"cursor":"auto"});
    $(this).hover(function(){
      $(this).animate({"height":"110px"});
      $(this).find(".piece-link").toggle();

    },function(){
      $(this).animate({"height":"90px"});
      $(this).find(".piece-link").toggle();
    });
  });

  $(".up").click(function raise(){
    // change storage!!
    // move the icons
    var parent = $(this).parent().parent().parent();

    $(".piece-art").slideToggle(function(){
      $(parent).insertBefore($(parent).prev());
    });

    $(".piece-art").slideToggle();

  });
  $(".down").click(function lower(){
    // change storage!!
    // move the icons
    var parent = $(this).parent().parent().parent();

    $(".piece-art").slideToggle(function (){
      $(parent).insertAfter($(parent).next());

    });
    console.log("clicked down icon");
    $(".piece-art").slideToggle();

  });
  $(".minus").click(function remove(){
    // remove it from storage
    // remove it from the DOM
    var current = this;
    console.log("clicked MINUS icon");
    $(".piece-art").slideToggle(function remove(){
      $(current).parent().parent().parent().remove();
    });
    $(".piece-art").slideToggle();

    // $("."+all).each(function(){
    //   slideToggle();
    // });
  });
  $(".download").click(function(){
    // if connected to the internet
        // send to that API
    // else alert that it's only available online
    console.log("clicked download icon");
    alert("only avaialable online");
  });
}

$("#reset").click(function refresh(){
  delete_storage();
  alert("deleted all favorites");
  // delete everything from storage
  // refresh the page or rerun the main script
});
$(".background").click(function remove(){
  // do i want to remove it from the dom
  // or just change the crown to blank
  // or link to the page
});
