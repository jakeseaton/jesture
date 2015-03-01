// // Content script for Jesture Chrome Extension
// // Developed by: Jake Seaton Quincy-Dewolfe 20-05
// // Injected into home page of harvardlampoon.com
// //
// /* SCRIPT TO BE RUN ON HOME PAGE OF THE HARVARD LAMPOON WEBSITE */

// // listener for changes in chrome.storage
// chrome.storage.onChanged.addListener(function(changes, namespace){
//   console.log("storage was changed");
// });

// // listen for messages
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   console.log("message from the background script");
//   // var comix_id = request.comix_size;
//   // console.log(comix_id);
// });


// // initialize the object and array
// var pieces_object = {};

// var titles_in_favorites = [];

// chrome.storage.sync.get("pieces", function assign(data){
//   if (!chrome.runtime.error){
//     // get object containing array
//     pieces_object = data.pieces;

//     // get number of favorite pieces
//     pieces_index=pieces_object.favorites.length;

//     // iterate through favorite pieces
//     for (i = 0; i < pieces_index; i++){
//       // add to titles array
//       titles_in_favorites.push(pieces_object.favorites[i].Title);
//     }

//     $(".piece-text-container").each(function(){

//       // var piece_object = {};
//       // check if it is in the array of favorite
//       // may need to name the function
//       // if the home page piece is in the array
//       // if ($.inArray(value, array) != -1){
//       //   //
//       // }
//       // $(this).prepend(jesture_piece);

//       var curr_title = $('.piece-title').html();
//       // if it's in the array of titles
//       if (($.inArray(curr_title, titles_in_favorites)) != -1){
//         console.log(curr_title, "is in array", titles_in_favorites);

//         // if there isn't already a star there
//         if ($(this).has('#jesture-container').length == 0){
//           // add the bright star
//           $(this).prepend(jesture_active);
//         }
//       }
//       else{

//         //it's not currently a favorit
//         console.log(curr_title, "is not in array", titles_in_favorites);

//         // if there isn't already a star there
//         if ($(this).has("#jesture-container").length == 0){
//           // add the dull star
//           $(this).prepend(jesture_piece);
//         }
//       }
//     });
//   }
// });



// // chrome.storage.sync.get("value", function(items){
// // 	if (!chrome.runtime.error){console.log(items.value);}
// // });

// // build icons
// var star_url = chrome.extension.getURL('star.png');
// var arrow_url = chrome.extension.getURL('arrow.png');
// var jesture_url = chrome.extension.getURL('jesture_page.html');
// var right_arrow_url = chrome.extension.getURL('right_arrow.png');
// var hat_url = chrome.extension.getURL('jesture_hat_5.png');

// var star_piece = "<img id = 'star-piece' class = 'star inactive' src = " + hat_url + " alt = 'star'/>";
// var active_star = "<img id = 'star-piece' class = 'star active' src = " + hat_url + " alt = 'star'/>";
// var arrow_html = "<a width = '36px' height = '36px' href = " + jesture_url + "><img class = 'arrow' src = " + right_arrow_url + " alt = 'arrow'/></a>";
// var jesture_piece = "<div id = 'jesture-container'><div id = 'jesture'>"+ star_piece + arrow_html +"</div></div>";

// var jesture_active = "<div id = 'jesture-container'><div id = 'jesture'>"+ active_star + arrow_html +"</div></div>";

// // // Authors
// // var jesture_author = star_html;//"<div height = '34px' id = 'jesture'>" + star_html + "</div>";
// // $(".author-header").hover(function(){
// // 	$(this).append(jesture_author);
// // }, function(){
// // 	$("#jesture").remove();
// // });

// $(".star").click(function(){
//   // initialize the piece object
//   var piece = {};

//   var header = $(".piece-header");
//   // var text = $("h2").html();

//   // get the title

//   var Title = $(".piece-title").html();
//   var Author = header.find(".piece-author").find('a').html();
//   var Url = header.find('a').attr('href');
//   var Img = $(".piece-artwork").find("img").attr('src');
//   piece.Title = Title;
//   piece.Author = Author;
//   piece.Url = Url;
//   piece.Img = Img;

//   // if it isn't already in favorites
//   if ($(this).hasClass("inactive")){

//     // push into the favorites array of the pieces object
//     pieces_object.favorites.push(piece);

//     // console.log("got to here")
//     chrome.storage.sync.set({"pieces": pieces_object}, function check(){
//       // check for error.
//       if (!chrome.runtime.error){
//         chrome.storage.sync.get("pieces", function display(data){
//           // fires a storage change event
//           console.log(data);
//         });
//       }

//       // callback--tell the favorites page to refresh?
//       // or migrate that functionality to the background page.
//     });
//     // WHAT IF IT DOESN'T have an image?
//     // need to get img, author, issue, title.

//     // add it to storage
//     $(this).removeClass("inactive");
//     $(this).fadeTo("fast",1);
//     $(this).addClass("active");
//   }
//   else {
//     // invariant of object structure assumed
//     var index_to_remove = pieces_object.favorites.indexOf(piece);
//     pieces_object.favorites.splice(index_to_remove, 1);

//     // push the new favorites to storage
//     chrome.storage.sync.set({"pieces":pieces_object}, function callback(){
//       // test
//       chrome.storage.sync.get("pieces", function display(data){
//         console.log(data);
//       });
//       // idk do something
//     });

//     $(this).removeClass("active");
//     $(this).addClass("inactive");
//     $(this).fadeTo("fast",.5);
//   }
// });


// /* Animations */

// // animate stars
// $(".inactive").hover(function(){
//   $(this).fadeTo("fast",1);
// },function(){
//   $(this).fadeTo("fast",.5);
// });

// // animate arrow
// $(".arrow").hover(function(){
//   $(this).fadeTo("fast",1);
// }, function(){
//   $(this).fadeTo("fast",.5);
// });
