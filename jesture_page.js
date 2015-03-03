var minusIcon = '<img src = "img/star_inactive.png" class = "minus icon active"/>';
var browserIcon = '<img class = "browser icon inactive" src = "entypo/browser.svg"/>'
var gridIcon = "<img class = 'grid icon inactive' src = 'entypo/grid.svg'>"

// var downloadIcon = '<img src = "entypo/download.svg" class = "download icon inactive"/>';
// var downIcon = '<img class = "down icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-down.svg"/>';
// var upIcon = '<img class = "up icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-up.svg"/>';

var menuBar = '<div class = "menu">'+minusIcon+browserIcon+'</div>';
var menuWithoutBrowser = "<div class = menu>"+minusIcon+"</div>"





$(document).ready(function(){

  chrome.storage.sync.get(function assign(data){
    if (!chrome.runtime.error){
      // append pieces
      for (item in data){
        var curr = data[item]
        var curr_html;
        var Url=curr.Url
        switch (curr.Type) {
        case "piece":
          if (curr.Img){
            curr_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a><a class="author-link" href="http://harvardlampoon.com/masthead">'+curr.Author+'</a></div><a href='+Url+ '><h3 class="piece-title">'+ curr.Title +'</h3></a>'+menuBar+'</div><div class="background"><img src="http://harvardlampoon.com'+curr.Img+'"></div></li>';
          }
          else {
            curr_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a><a class="author-link" href="http://harvardlampoon.com/masthead">'+curr.Author+'</a></div><a href='+ Url+ '><h3 class="piece-title">'+ curr.Title +'</h3></a>'+menuBar+'</div><div class="background"><img src="img/hat_active.png"></div></li>';
          }
          break;
        case "author":
          curr_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a></div><a href='+ Url+ '><h3 class="piece-title">'+ curr.Author +'</h3></a>'+menuWithoutBrowser+'</div><div class="background"><img src="img/knight.png"></div></li>';
          break;
        case "comix":
          curr_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a></div><a href='+Url+ '><h3 class="piece-title">'+ curr.Title +'</h3></a>'+menuWithoutBrowser+'</div><div class="background"><img src="http://harvardlampoon.com'+curr.Img+'"></div></li>';
          break;
        case "issue":

          curr_html ='<li class="piece piece-art"><a class="piece-link" href='+ Url +' style="display: block;"></a><div class="info-bar"><a class="piece-link" href='+Url+' style="display: block;"></a><div class="author"><a class="piece-link" href='+Url+' style="display: block;"></a></div><a href='+Url+ '><h3 class="piece-title">'+ curr.Title +'</h3></a>'+menuWithoutBrowser+'</div><div class="background"><img src="http://harvardlampoon.com'+curr.Img+'"></div></li>';
          break;
        }
        $("#favorite-pieces").prepend(curr_html);
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
      // console.log(destination);
      chrome.tabs.getSelected(null,function(tab){
        // console.log(tab);
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

  // $(".up").click(function raise(){
  //   // change storage!!
  //   // move the icons
  //   var parent = $(this).parent().parent().parent();
  //
  //   $(".piece-art").slideToggle(function(){
  //     $(parent).insertBefore($(parent).prev());
  //   });
  //
  //   $(".piece-art").slideToggle();
  //
  // });
  // $(".down").click(function lower(){
  //   // change storage!!
  //   // move the icons
  //   var parent = $(this).parent().parent().parent();
  //
  //   $(".piece-art").slideToggle(function (){
  //     $(parent).insertAfter($(parent).next());
  //
  //   });
  //   // console.log("clicked down icon");
  //   $(".piece-art").slideToggle();
  //
  // });
  $("a").click(function display(e){
    e.preventDefault();
    if (!navigator.onLine){
      var item = $(e.target).parent().siblings().find("a").attr("href");
      var title = $(e.target).parent().prev().html()
      var img = $(e.target).parent().parent().next().find("img").attr("src")
      console.log(item)
      var txt = localStorage.getItem(item)
      var full = '<h2><div class="piece-content"><div class = "menu">'+gridIcon+'</div><div class="piece-text-container">'+txt+'</div><div class="piece-artwork"><img src="'+img+'"></img></div></div></h2>'
      console.log(img)
      // console.log(txt);

      $("#favorite-pieces").fadeOut();
      $("#partition").append(full);
      $(".issue-title").html(title);

      $(".grid").click(function swap(){
        console.log(this);
        // $("#partition").addClass("invisible")
        $("#partition").empty()
        $(".issue-title").html("Favorites");
        $("#favorite-pieces").fadeIn();
      });

    }
  });

  $(".browser").click(function display(e){
    e.preventDefault();
    // check to see if it's an author or an issue etc.
    var item = $(e.target).parent().siblings().find("a").attr("href");
    var title = $(e.target).parent().prev().html()
    var img = $(e.target).parent().parent().next().find("img").attr("src")
    console.log(item)
    var txt = localStorage.getItem(item)
    var full = '<h2><div class="piece-content"><div class = "menu">'+gridIcon+'</div><div class="piece-text-container">'+txt+'</div><div class="piece-artwork"><img src="'+img+'"></img></div></div></h2>'
    console.log(img)
    // console.log(txt);

    $("#favorite-pieces").fadeOut();
    // $("#partition").removeClass("invisible");
    $("#partition").append(full);
    $(".issue-title").html(title);

    $(".grid").click(function swap(){
      console.log(this);
      $("#partition").empty()
      $(".issue-title").html("Favorites");
      $("#favorite-pieces").fadeIn();
    });


  });

  $(".minus").click(function remove(e){
    e.preventDefault;
    // remove it from storage
    // remove it from the DOM
    var current = this;
    var to_remove = $(current).parent().siblings().find("a").attr("href");
    chrome.storage.sync.remove(to_remove);

    $(current).parent().parent().parent().fadeOut()

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
