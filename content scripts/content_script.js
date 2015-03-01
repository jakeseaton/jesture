// Content script for Jesture Chrome Extension
// Developed by: Jake Seaton Quincy-Dewolfe 20-05

/* SCRIPT TO BE RUN ON EVRY PAGE OF THE HARVARD LAMPOON WEBSITE */

// Global hash function
// global url variable
var currentUrl;

// inject stylesheet
var styles_url = chrome.extension.getURL('css/jesture.css');
$('head').append("<link rel = 'stylesheet' href =" + styles_url + "></link>");

// inject new page icon
var icon_url = chrome.extension.getURL('img/icon128.png');
var new_icon = "<link rel = 'icon' href ="+ icon_url+ "></link>";
$('head').append(new_icon);

// build icons

var jesture_url = chrome.extension.getURL('jesture_page.html');

var inactive_star_url = chrome.extension.getURL("img/star_active.png")
var active_star_url = chrome.extension.getURL("img/star_inactive.png")

var active_star = "<img class = 'star active' src = " + active_star_url + " alt = 'star'/>";
var inactive_star = "<img class = 'star inactive' src = " + inactive_star_url + " alt = 'star'/>";

var jesture_star_inactive ="<div id = 'jesture-container'><div id = 'jesture'>"+ inactive_star+"</div></div>";
var jesture_star_active = "<div id = 'jesture-container'><div id = 'jesture'>"+ active_star +"</div></div>";

var inactive_hat_url = chrome.extension.getURL('img/hat_inactive.png');
var active_hat_url = chrome.extension.getURL('img/hat_active.png');

var inactive_hat = "<img width = 36px height = 36px class = 'hat inactive' src = " + inactive_hat_url + " alt = 'star'/>";
var active_hat = "<img width = 36px height = 36px class = 'hat active' src = " + active_hat_url + " alt = 'star'/>";

var jesture_hat_inactive = inactive_hat
var jesture_hat_active = active_hat

// listen for changes in chrome.storage
chrome.storage.onChanged.addListener(function(changes, namespace){
	// announce
	console.log("storage was changed");
	// save changes
	// for (var key in changes){var storageChange = changes[key];}
	// reattach stars and jQuery
	// attach_jquery();
	// $(".inactive").siblings().slideDown();

});

// this is always the next index at which to stick things.
Hash = 0

// this contains all of the current information
var ALL_DATA = []

chrome.storage.sync.get(function accumulate(data){
	console.log(data)
	for (i in data){
		Hash++;
		ALL_DATA.push(data[i]);
	}
	console.log(Hash);
	console.log(ALL_DATA);
});

// switch over url
chrome.runtime.sendMessage({question:"what is the current url?"}, function main(response){
	currentUrl = response.url;
	var url_array = response.url.split("/");
	// console.log(url_array);
	if (url_array[2] == "harvardlampoon.com"){
		// console.log("YAY IT WORKS");
		switch (url_array[3]){
			case "":
				main_home();
				break;
			case "issue":
				main_issue();
				main_thumbnails();
				break;
			case "issues":
				main_issues();
				break;
			case "piece":
				main_piece();
				break;
			case "author":
				main_authors();
				break;
			case "comix":
					if (url_array[4] != ""){
						main_comix();
					}
					else {
						main_comix_home()
					}
					break;
			case "masthead":
				break;
		}
	}
	else {
		console.log("Not on Lampoon site. On: ", tab.url);
	}
});



function main_home(){
	// crawl_lampoon(currentUrl);
	main_piece();
	// ALSO DO STAFF PICKS
}

function updateAllData(){
	ALL_DATA = [];
	Hash = 0;
	chrome.storage.sync.get(function update(data){
		for (i in data){
			Hash++
			ALL_DATA.push(data[i]);
		}
	});
}

function main_piece(){
	// maybe make it appear next to the title?
	// there is only one piece

	// chrome.runtime.sendMessage({question: "newpage", u: currentUrl}, function(response){
	// 	console.log(response.eval);
	// });
	// console.log(document.links);
	var Feed = [];
	var piecesArray = [];
	for (i in ALL_DATA){
		for (j in ALL_DATA[i]){
			curr = ALL_DATA[i][j]
			if (curr.Type = "piece"){
				piecesArray.push(curr);
			}
		}
	}
	var INDEX = Hash.toString()
	console.log(INDEX)

	chrome.storage.sync.get(INDEX, function assign(data){
		console.log(data);
		if (!chrome.runtime.error){
			// Feed = data.feed
			for (item in Feed){
				if (Feed[item].Type =="piece"){
				}
			}
			$(".piece-text-container").each(function(){
				// need to get the current piece title, not just the home page
				var curr_title = $('.piece-title').html();
				// if it's in the array of titles
				if (($.inArray(curr_title, piecesArray)) != -1){

					// if there isn't already a star there
					if ($(this).has('#jesture-container').length == 0){
						// add the bright star
						$(this).prepend(jesture_star_active);
					}
				}
				else{

					//it's not currently a favorit

					// if there isn't already a star there
					if ($(this).has("#jesture-container").length == 0){
						// add the dull star
						$(this).prepend(jesture_star_inactive);
						// $(this).find('.arrow-link').slideUp();
					}
				}
			});
			$(".star").click(function(){
				var piece = {};
				piece.Type = "piece";

				// What about when they favorite american dog off the home page?
				var header = $(".piece-header");
				// var text = $("h2").html();
				var Img
				// get the title
				var Title = $(".piece-title").html();
				var Author = header.find(".piece-author").find('a').html();
				// var Txt = $(".piece-text-container").find("h2").html();

				if ($(".piece").hasClass("no_art")){
					Img = false;//have no art
				}
				else {
					var Img = $(".piece-artwork").find("img").attr('src');
					console.log("this piece's image is", Img);
				}
				piece.Title = Title;
				piece.Author = Author;
				piece.Url = currentUrl;
				piece.Img = Img;
				send_to_background(currentUrl);

				if ($(this).hasClass("inactive")){
					// initialize the piece object
					piecesArray.push(piece.Title);
					Feed.push(piece);
					chrome.storage.sync.set({"feed":Feed});
					change_to_active(this);
				}
				else{
					var index_to_remove = Feed.indexOf(piece);
					Feed.splice(index_to_remove, 1);
					chrome.storage.sync.set({"feed":Feed});
					console.log("removed from storage");
					index_to_remove = piecesArray.indexOf(piece.Title);
					piecesArray.splice(index_to_remove, 1)
					change_to_inactive(this);
					// delete it from storage
				}
			});
		}
		else {alert("there was an error")}
	});
}// end main


function main_thumbnails(){
	var Feed = [];
	var piecesArray = [];

	chrome.storage.sync.get("feed", function assign(data){
		if (!chrome.runtime.error){
			Feed = data.feed
			for (item in Feed){
				if (Feed[item].Type =="piece"){
					piecesArray.push(Feed[item].Title);
				}
			}
			$('.info-bar').each(function(){
				$(this).css({"cursor":"auto"});
				$(this).hover(function(){
					$(this).animate({"height":"110px"});
					$(this).find(".piece-link").toggle();

				},function(){
					$(this).animate({"height":"90px"});
					$(this).find(".piece-link").toggle();
				});
				var curr_title = $(this).find(".piece-title").html();
				// if it's in the array of titles
				if (($.inArray(curr_title, piecesArray))!=-1){
					if($(this).has("#jesture-container").length ==0){
						$(this).append(jesture_star_active);
					}
				}
				else{
					// if there isn't already a star there
					if($(this).has("#jesture-container").length ==0){
						// ad the dull star
						$(this).append(jesture_star_inactive);
						// $(this).find('.arrow-link').slideUp();
					}
				}
			});
			// attach_jquery();

			// when a piece is favorited
			$(".star").click(function(){
				var piece = {};
				piece.Type = "piece"
				var thumbnail = $(this).parent().parent().parent().parent();

				var Author, Url, Title, Img

				if ($(thumbnail).hasClass("piece-art")){
					Img = $(thumbnail).find(".background").find("img").attr("src");
				}
				// else no art
				else {
					Img = false;
				}
				// doesn't take into account the different URL's
				Url = $(thumbnail).find("a").attr("href");
				Url = "http://harvardlampoon.com"+Url;
				console.log(Url);

				Author = $(thumbnail).find(".author-link").html();
				Title = $(thumbnail).find("h3").html();

				piece.Title = Title;
				piece.Author = Author;
				piece.Img = Img;
				piece.Url = Url

				send_to_background(Url);

				if ($(this).hasClass("inactive")){
					Feed.push(piece);
					chrome.storage.sync.set({"feed":Feed})
					piecesArray.push(piece.Title);
					change_to_active(this);
				}
				else{
					var index_to_remove = Feed.indexOf(piece);
					Feed.splice(index_to_remove, 1);
					chrome.storage.sync.set({"feed":Feed});
					console.log("removed from storage");
					index_to_remove = piecesArray.indexOf(piece.Title);
					piecesArray.splice(index_to_remove, 1)
					change_to_inactive(this);

				}

			});// end star functionality
		}
		else {alert("there was an error")}
	});



}// end main

function main_comix_home(){
	var Feed = [];
	var comixArray = [];
	chrome.storage.sync.get("feed", function assign(data){
	  if (!chrome.runtime.error){
	    Feed = data.feed
			for (item in Feed){
				if (Feed[item].Type = "comix"){
					comixArray.push(Feed[item].Img);
				}
			}
			$('.comic-container').each(function(){
				var Img = $(this).find('img').attr("src");
				// var Url = $(this).find('a').attr("href");
				// var Title = $(this).prev().html();
				// console.log(Title);
				if (($.inArray(Img, comixArray)) != -1){
					console.log(Img, "is in array", comixArray);
					if ($(this).has("#jesture-container").length == 0){
						$(this).find("a").prepend(jesture_star_active);
						$(this).find("#jesture-container").css({"position":"absolute", "top":"0px", "right":"0px"});
					}
				}
				else{
					if($(this).has("#jesture-container").length ==0){
						console.log(Img, "is not in array", comixArray)
						$(this).find("a").prepend(jesture_star_inactive);
						$(this).find("#jesture-container").css({"position":"absolute", "top":"0px", "right":"0px"});
					}
				}
			});
			// star functionality
			$(".star").click(function(e){
				e.preventDefault();

				// create the object
				var comix = {};
				comix.Type = "comix"

				// CHANGE THIS IF YOU MOVE TO BOTTOM
				var container = $(this).parentsUntil(".comic-outer-container");
				var Img = $(container).find("img").not(".star").attr("src");
				var Url = $(container).find("a").attr("href");
				// oof
				var Title = $(this).parent().parent().parent().parent().siblings().html();

				comix.Title = Title;
				comix.Img = Img;
				comix.Url = Url;

				if ($(this).hasClass("inactive")){
					Feed.push(comix);
					chrome.storage.sync.set({"feed":Feed});
					comixArray.push(comix.Img)

					change_to_active(this);
				}
				else{
					var index_to_remove = Feed.indexOf(comix);
					Feed.splice(index_to_remove, 1);
					chrome.storage.sync.set({"feed":Feed});
					index_to_remove = comixArray.indexOf(comix.Img);
					comixArray.splice(index_to_remove, 1);
					change_to_inactive(this);
				}
			});
	  }
	  else {alert("there was an error")}
	});
}

function main_issue(){
	var Feed = [];
	var piecesArray = [];
	var issuesArray = [];
	chrome.storage.sync.get("feed", function assign(data){
		console.log(data);
	  if (!chrome.runtime.error){
	    var Feed = data.feed
			for (item in Feed){
				if (Feed[item].Type == "piece"){
					piecesArray.push(Feed[item].Title)
				}
				else if (Feed[item].Type == "issue"){
					issuesArray.push(Feed[item].Title)
				}
			}
			// console.log(Feed)
			$(".title-container").find("h2").each(function(){
				if ($.inArray($(this).html(), issuesArray) != -1){
					console.log($(this).html(), "is  in array", issuesArray)
					$(this).after(jesture_hat_active)
				}
				else{
					console.log($(this).html(), "is not in array", issuesArray)
					$(this).after(jesture_hat_inactive)
				}
			});

			$(".hat").click(function(){
				console.log("feed", Feed)
				var issue = {}
				issue.Url = currentUrl;
				issue.Title = $("body").find("h2").html()
				console.log(issue.Title);
				issue.Type = "issue"
				var List = [];

				$("body").find(".piece").each(function(){
					curr_a = $(this).children().first().attr("href")
					console.log(curr_a);
					send_to_background("http://harvardlampoon.com" + curr_a);
					List.push(curr_a);
				});

				issue.List = List
				Feed.push(issue);
				// STORE THE ISSUE IN STORAGE
				// THIS IS ALSO ADDING THE FIRST PIECE--DON'T DO THAT
				// OVERRIDE THE FUNCTIONALITY IN MAIN THUM

				if ($(this).hasClass("inactive")){
					$.ajax("http://harvardlampoon.com/issues/", {
						async:false,
						success:function assign(data){
							// console.log("derp", data, Url)
							$(data).find(".issue").find("a").each(function findimg(){
								if ("http://harvardlampoon.com" + $(this).attr("href") == (currentUrl)){
									issue.Img = $(this).find("img").attr("src");
									issue.Description = $(this).siblings().find(".issue-description").html();
								}
							});
						}
					});

						$(".star").each(function(){
							if ($(this).hasClass("inactive")){
								var piece = {};
								piece.Type = "piece";
								var thumbnail = $(this).parent().parent().parent().parent();
								var Author, Url, Title, Img;
								if ($(thumbnail).hasClass("piece-art")){
									Img = $(thumbnail).find(".background").find("img").attr("src");
								}
								// else no art
								else {
									Img = false;
								}

								Url = $(thumbnail).find("a").attr("href");
								Url = "http://harvardlampoon.com"+Url;

								send_to_background(Url);
								Author = $(thumbnail).find(".author-link").html();
								Title = $(thumbnail).find("h3").html();

								piece.Title = Title;
								piece.Author = Author;
								piece.Img = Img;
								piece.Url = Url
								// chrome.storage.sync.set(piece, function callback(){
								// 	chrome.storage.sync.get(function callback(data){
								// 		console.log("hello", data);
								// 	});
								// });

								Feed.push(piece);
								change_to_active(this);
								piecesArray.push(piece.Title);
							}
						});// end iterate over stars
						chrome.storage.sync.set({"feed":Feed});
						change_to_active(this);
						console.log("feed", Feed)
				}
				else {
						var index_to_remove = Feed.indexOf(issue);
						Feed.splice(index_to_remove, 1);
						chrome.storage.sync.set({"feed":Feed});
						console.log("removed from storage");
						index_to_remove = issuesArray.indexOf(issue.Title);
						issuesArray.splice(index_to_remove, 1)
						change_to_inactive(this);
				}
				// else {
				// 	change_to_inactive(this);
				// }
			});// end click
	  }
	  else {alert("there was an error")}
	});
}// end main
		// add everything to storage
function main_comix(){
	// make it append to the top of the comix, not the bottom!
	var comixObject = {};
	var comixArray = [];
	var Feed = [];
	chrome.storage.sync.get("feed", function assign(data){
	  if (!chrome.runtime.error){
	    Feed = data.feed
			for (item in Feed){
				if (Feed[item].Type == "comix"){
					comixArray.push(Feed[item].Img)
				}
			}
			$('#comic-full').each(function(){
				var Img = $(this).find('img').attr("src");
				if (($.inArray(Img, comixArray)) != -1){
					console.log(Img, "is in array", comixArray);
					if ($(this).has("#jesture-container").length == 0){
						$(this).append(jesture_star_active);
					}
				}
				else{
					if($(this).has("#jesture-container").length ==0){
						$(this).append(jesture_star_inactive);
					}
				}
			});

			// star functionality
			$(".star").click(function(){

				// create the object
				var comix = {};
				comix.Type = "comix"

				// take the image, ignoring the jesture images

				var Img = $(this).parent().parent().prev().attr("src");
				var Title = false
				comix.Img = Img;
				comix.Url = currentUrl

				$.ajax("http://harvardlampoon.com/comix/", {
					async:false,
					success:function assign(data){
					  correct = $.grep($(data).find(".comic-outer-container"), function(e){
							return ($(e).find("img").attr("src") == Img);
						});
						Title = $(correct).find(".comic-title").html()
					}
				});
				comix.Title = Title
				console.log(comix);

				if ($(this).hasClass("inactive")){

					Feed.push(comix);
					comixArray.push(comix.Img);
					chrome.storage.sync.set({"feed":Feed})
					change_to_active(this);
				}
				else{
					var index_to_remove = Feed.indexOf(comix);
					Feed.splice(index_to_remove, 1);
					chrome.storage.sync.set({"feed":Feed});
					index_to_remove = comixArray.indexOf(comix.Img);
					change_to_inactive(this);
				}
			});
	  }
	  else {alert("there was an error")}
	});// end storage query
	// there is only one comic
}//end main

function main_issues(){
	// .click(function(e){e.preventDefault();})
	var Feed = [];
	var issuesArray = [];
	chrome.storage.sync.get("feed", function assign(data){
	  if (!chrome.runtime.error){
	    Feed = data.feed
			for (item in Feed){
				if (Feed[item].Type == "issue"){
					issuesArray.push(Feed[item].Title)
				}
			}
			$('.issue').each(function(){
				var Title =  $(this).find("h2").html();

				if(($.inArray(Title, issuesArray))!=-1){
					console.log(Title, "is in array", issuesArray);
					if ($(this).has("#jesture-container").length ==0){
						$(this).find(".issue-description").after(jesture_star_active);
					}
				}
				else{
					if($(this).has("#jesture-container").length ==0){
						$(this).find(".issue-description").after(jesture_star_inactive);
						$(this).find(".arrow-link").slideUp();
					}
				}
			});


			// star functionality
			$(".star").click(function(e){
				// Ajax to the page with all of the thumbnails
				// add all of them to the local storage with the key of the issue title.
				// need to json.stringify
				e.preventDefault();
				// create the object
				var issue = {};
				issue.Type = "issue"
				// climb up the DOM
				var current_issue = $(this).parent().parent().parent()
				var Title =  current_issue.find("h2").html();
				var Img = current_issue.find("img").attr("src")
				var Url = current_issue.find("a").attr("href");
				console.log(Url)
				var List = [];

				$.ajax(Url, {
					async: false,
					success: function assign(data){
						// store all of the issue's pieces in storage, and get the list
						$(data).find(".piece").each(function(){
							curr_a = $(this).children().first().attr("href")
							console.log(curr_a);
							send_to_background("http://harvardlampoon.com" + curr_a);
							List.push(curr_a);
						});
					}
				});

				issue.List = List

				var Description = current_issue.find(".issue-description").html();
				issue.Title = Title
				issue.Img = Img
				issue.Url = "http://harvardlampoon.com" + Url
				issue.Description = Description

				if ($(this).hasClass("inactive")){
					Feed.push(issue);
					issuesArray.push(issue.Title);
					$.ajax(issue.Url, {
						async:false,
						success: function assing(data){
							$(data).find(".piece").each(function(){
								var piece = {};
								piece.Type = "piece";
								var thumbnail = $(this)
								var Author, Url, pieceTitle, Img
								if ($(thumbnail).hasClass("piece-art")){
									Img = $(thumbnail).find(".background").find("img").attr("src");
								}
								// else no art
								else {
									Img = false;
								}

								Url = $(thumbnail).find("a").attr("href");
								Url = "http://harvardlampoon.com"+Url;
								send_to_background(Url);
								Author = $(thumbnail).find(".author-link").html();
								pieceTitle = $(thumbnail).find("h3").html();

								piece.Title = pieceTitle;
								piece.Author = Author;
								piece.Img = Img;
								piece.Url = Url

								if ($.inArray(piece, Feed) == -1){
									Feed.push(piece);
								}
							});// end iterate over pieces on the other page.
						}
					});// end ajax call
					chrome.storage.sync.set({"feed":Feed});
					change_to_active(this);
				}
				else{
					var index_to_remove = Feed.indexOf(issue);
					Feed.splice(index_to_remove, 1);
					chrome.storage.sync.set({"feed":Feed});
					index_to_remove = issuesArray.indexOf(issue.Title);
					change_to_inactive(this);
				}
			});// end star functionality
	  }
	  else {alert("there was an error")}
	});

}// end main

function main_authors(){
	var Feed = [];
	var authorsArray = [];
	var piecesArray = [];
	chrome.storage.sync.get("feed", function assign(data){
	  if (!chrome.runtime.error){
	    Feed = data.feed
			for (item in Feed){
				if (Feed[item].Type == "author"){
					authorsArray.push(Feed[item].Author)
				}
				else if (Feed[item].Type =="piece"){
						piecesArray.push(Feed[item].Title);
				}
			}
			$(".author-header").each(function(){
				// author name stored in "Author". Their pieces will be stored in "List"
				var Author = $(this).find("h2").html()
				if (($.inArray(Author, authorsArray))!= -1){
					console.log(Author, "is in array", authorsArray);
					if ($(this).has("#jesture-container").length ==0){
						$(this).append(jesture_hat_active)
					}
				}
				else{
					if($(this).has("#jesture-container").length ==0){
						$(this).append(jesture_hat_inactive);
					}
				}
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
				var curr_title = $(this).find(".piece-title").html();
				// if it's in the array of titles
				if (($.inArray(curr_title, piecesArray))!=-1){
					if($(this).has("#jesture-container").length ==0){
						$(this).append(jesture_star_active);
					}
				}
				else{
					// if there isn't already a star there
					if($(this).has("#jesture-container").length ==0){
						// ad the dull star
						$(this).append(jesture_star_inactive);
						// $(this).find('.arrow-link').slideUp();
					}
				}
			});

			// when a piece is favorited
			$(".star").click(function(){
				var piece = {};
				piece.Type = "piece"
				var thumbnail = $(this).parent().parent().parent().parent();

				var Author, Url, Title, Img

				if ($(thumbnail).hasClass("piece-art")){
					Img = $(thumbnail).find(".background").find("img").attr("src");
				}
				// else no art
				else {
					Img = false;
				}
				// doesn't take into account the different URL's
				Url = $(thumbnail).find("a").attr("href");
				Url = "http://harvardlampoon.com"+Url;
				console.log(Url);

				Author = $(thumbnail).find(".author-link").html();
				Title = $(thumbnail).find("h3").html();

				piece.Title = Title;
				piece.Author = Author;
				piece.Img = Img;
				piece.Url = Url

				send_to_background(Url);

				if ($(this).hasClass("inactive")){
					Feed.push(piece);
					chrome.storage.sync.set({"feed":Feed})
					piecesArray.push(piece.Title);
					change_to_active(this);
				}
				else{
					var index_to_remove = Feed.indexOf(piece);
					Feed.splice(index_to_remove, 1);
					chrome.storage.sync.set({"feed":Feed});
					console.log("removed from storage");
					index_to_remove = piecesArray.indexOf(piece.Title);
					piecesArray.splice(index_to_remove, 1)
					change_to_inactive(this);

				}

			});// end star functionality

			$(".hat").click(function(){

				// create the object
				var author = {};
				author.Type = "author"

				var Author = $(this).parent().find("h2").html();
				console.log(Author);
				author.Author = Author;

				var List = [];

				$("body").find(".piece").each(function(){
					curr_a = $(this).children().first().attr("href")
					console.log(curr_a);
					send_to_background("http://harvardlampoon.com" + curr_a);
					List.push(curr_a);
				});

				// write this here
				// console.log("all pieces",all_pieces)
				// for (curr_piece in all_pieces ){
				// 	// console.log(all_pieces[curr_piece].children().first());
				//
				// }
				console.log(List);
				author.List = List

				if ($(this).hasClass("inactive")){
					console.log("derp")
					Feed.push(author);
					$(".star").each(function(){
						if ($(this).hasClass("inactive")){
							var piece = {};
							piece.Type = "piece";
							var thumbnail = $(this).parent().parent().parent().parent();
							var Author, Url, Title, Img
							if ($(thumbnail).hasClass("piece-art")){
								Img = $(thumbnail).find(".background").find("img").attr("src");
							}
							// else no art
							else {
								Img = false;
							}

							Url = $(thumbnail).find("a").attr("href");
							Url = "http://harvardlampoon.com"+Url;
							send_to_background(Url);
							Author = $(thumbnail).find(".author-link").html();
							Title = $(thumbnail).find("h3").html();

							piece.Title = Title;
							piece.Author = Author;
							piece.Img = Img;
							piece.Url = Url

							Feed.push(piece);
							change_to_active(this);
							piecesArray.push(piece.Title);
						}
					});

					authorsArray.push(author.Author);
					chrome.storage.sync.set({"feed":Feed});
					change_to_active(this);
				}
				else{
					// delete_from_background(Img);
					var index_to_remove = Feed.indexOf(author);
					Feed.splice(index_to_remove, 1);
					chrome.storage.sync.set({"feed":Feed});
					index_to_remove = authorsArray.indexOf(author.Author);
					authorsArray.splice(index_to_remove, 1)
					change_to_inactive(this);
				}
			});
	  }
	  else {alert("there was an error")}
	});
}

function change_to_active(element){
	if ($(element).hasClass("hat")){
		$(element).removeClass('inactive');
		$(element).attr('src', active_hat_url);
		$(element).addClass('active');
	}
	else{
		$(element).removeClass('inactive');
		$(element).attr('src', active_star_url);
		$(element).addClass('active');
	}


	// $(element).siblings().slideDown();
}

function change_to_inactive(element){
	if ($(element).hasClass("hat")){
		$(element).removeClass('active');
		$(element).attr('src', inactive_hat_url);
		$(element).addClass('inactive');
		// $(element).siblings().slideUp();
	}
	else{
		$(element).removeClass('active');
		$(element).attr('src', inactive_star_url);
		$(element).addClass('inactive');
		// $(element).siblings().slideUp();
	}

}


function send_to_background(url){
	chrome.runtime.sendMessage({question: "addstorage", u: url}, function(response){
		console.log(response.eval);
	});
}
// // // Authors
// // var jesture_author = star_html;//"<div height = '34px' id = 'jesture'>" + star_html + "</div>";
// // $(".author-header").hover(function(){
// // 	$(this).append(jesture_author);
// // }, function(){
// // 	$("#jesture").remove();
// // });
//
