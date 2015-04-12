// Javascript for Popup

var minusIcon = '<img src = "img/circle-with-minus.svg" class = "minus icon inactive"/>';
// // var playIcon = '<img src = "entypo/controller-play.svg" class = "play icon inactive"/>';
// // var cycleIcon = '<img class = "cycle icon inactive" src= "entypo/cycle.svg"/>';
// var downloadIcon = '<img src = "entypo/download.svg" class = "download icon inactive"/>';
// var downIcon = '<img class = "down icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-down.svg"/>';
// var upIcon = '<img class = "up icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-up.svg"/>';

// var menuBar = '<div class = "menu">'+upIcon + downIcon+downloadIcon +minusIcon+'</div>';

// // listener for changes in chrome.storage
// chrome.storage.onChanged.addListener(function(changes, namespace){
//   console.log("storage was changed");
//   for (var key in changes){
//     var storageChange = changes[key];
//
//     }
// });
var hash = 1

$(document).ready(function(){
  // reset? ()
  chrome.storage.sync.get(function(data){
    if (!chrome.runtime.error){
      for (item in data){
        var curr = data[item];
        // console.log(curr);
        switch (curr.Type){
          case "author":
            createAuthorItem(curr.List, curr.Author)
            break;
          case "issue":
            // console.log("got to here
            // console.log(curr, "it's an issue");
            createComixItem(curr.Img, curr.Title)
            createIssueItem(curr.Img, curr.Description, curr.Title, curr.List);
            break;
          case "comix":
            // console.log(curr, "it's an comix");
            createComixItem(curr.Img, curr.Title);
            break;
          case "piece":
            if (curr.Img){
              createComixItem(curr.Img, curr.Title)
            }
            // createAuthorItem([curr.Url], curr.Author)
            createPieceItem(curr.Url, curr.Title, curr.Author)
            break;
        }
      }

  //      $(".panel-heading").each(function(){
  // 	$(this).click(function(){
  // 		console.log("hello")
  // 		derp = $(this).find("a").attr("href")
  // 		console.log(derp)
  // 	});
  // });	
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
      var destination = $(this).attr("href");
      var open = false
      chrome.tabs.getAllInWindow(null, function(tabs){
        // console.log(destination)
        for (i in tabs){
          if (tabs[i].url.split("/")[3] == destination){
            open = true;
            chrome.tabs.update(tabs[i].id,{selected:true})
          }
        }
        if (!open){
          chrome.tabs.create({url:destination});
        }
      });
    });
  });// end jesture page link
});// end main

function ajax_pieces(Url, Title, Author){

  $.ajax(Url, {
    success: function(data){
      var txt = $(data).find(".selected-piece-text-container").find("h2").html();
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
  var txt = localStorage.getItem(u)
  // console.log(txt);
  var $template = $(".template1");
  var $newPanel = $template.clone();
  $newPanel.removeClass("template1");
  $newPanel.removeClass("invisible");
  $newPanel.find(".collapse").removeClass("in");
  $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
           .html(Title);
  // $newPanel.find("panel-heading").attr("href", "#" + (++hash));
  $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
  $newPanel.find(".panel-body").html(txt+"<div class = 'popup-title'>"+Author+"</div>" );
  $("#accordion1").append($newPanel.fadeIn());
}
//
// <div class="panel-heading">
//           <h4 class="panel-title">
//             <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#8">Stanley Cup Riot MDL-G '15-'16</a>
//           </h4>
//
//         </div>
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
  $("#accordion4").append($newPanel.fadeIn());
  // // use the jquery keys function for local storage, to get the value at that location
  // current_html = '<div class="issue"><div class="issue-cover">'+img_html+'</div><h2 class="issue-title">'+Title+'</h2></div>'
  // $("#favorite-comix").append(current_html);
}
// append issues
function createIssueItem(Img, Description, Title, List){
  //$("#issues").append(issues_favorites[i].Title);
  for (piece in List){
    // console.log(List[piece])
    var to_search = "http://harvardlampoon.com" + List[piece]
    chrome.storage.sync.get(to_search, function callback(data){
      for (item in data){
        var object = data[item]
        // console.log("here it is", object)
        var pieceTitle = object.Title
        var Url = object.Url
        var Author = object.Author
        var txt = localStorage.getItem(Url)
        // console.log(txt)
        var $template = $(".template2");
        var $newPanel = $template.clone();
        $newPanel.removeClass("template2");
        // construct
        $newPanel.removeClass("invisible");
        $newPanel.find(".collapse").removeClass("in");
        $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
                 .html("<i>"+Title+"</i>: "+pieceTitle);
        $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
        $newPanel.find(".panel-body").html(txt);
        $("#accordion2").prepend($newPanel.fadeIn());
      }

    });
  }

  // var current_html = '<div class="issue"><div class="issue-cover"><img src='+Img+'></div><h2 class="issue-title">'+issueObject.Title+'</h2></div>'
  // $("#favorite-issues").append(current_html);
}
// display pieces by author names
function createAuthorItem(List, Author){
  for (piece in List){
    to_search = List[piece]
    if (to_search.split("/")[0] != "http:"){
          to_search = "http://harvardlampoon.com" + to_search
    }
    chrome.storage.sync.get(to_search, function callback(data){
      for (piece in data){
        var object = data[piece]
        var Title = object.Title
        var Url = object.Url
        var txt = localStorage.getItem(Url)
        var $template = $(".template3");
        var $newPanel = $template.clone();
        $newPanel.removeClass("template3");
        // construct
        $newPanel.removeClass("invisible");
        $newPanel.find(".collapse").removeClass("in");
        $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
                 .html("<i>"+Author+":</i> "+Title);
        $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
        $newPanel.find(".panel-body").html(txt);
        $("#accordion3").prepend($newPanel.fadeIn());
      }

    })
  }

}
