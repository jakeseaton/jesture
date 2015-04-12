// Background (Main Logic) page for Jesture
// Developed by: Jake Seaton
// Quincy-Dewolfe 20-05


// if there's nothing in local storage, i.e. the first time on a new device.
if (!localStorage.length)
	chrome.storage.sync.get(function(data){
		for (item in data){
			var curr = data[item]
			if (curr.Type == "piece"){
				store_piece(curr.Url, curr.Title)
			}
		}
	});


// Tell the content script what to do
chrome.runtime.onMessage.addListener(
	function send_url(request, sender, sendResponse) {
		// console.log(sender.tab ? "from a content script:" + sender.tab.url :
		// 						"from the extension");
		// wrap everything in this
		if (request.question == "what is the current url?"){
			sendResponse({url: sender.tab.url});
		}
		else if (request.question == "addstorage"){

			$.ajax(request.u, {
				success:function(data){
					if (request.u == "http://harvardlampoon.com/"){
						var text_container = $(data).find(".piece-text-container").find("h2").html()
						localStorage.setItem(request.u, text_container);
					}else{
						var text_container = $(data).find(".selected-piece-text-container").find("h2").html()
						localStorage.setItem(request.u, text_container);
					}
					// try{
					// 			// console.log(localStorage);
					// 			// SEND A MESSAGE TO THE JESTUREPAGE TO WORK PROPERLY
					// 	}catch (e){
					// 		if (e == "QUOTE_EXCEEDED_ERR"){
					// 			alert("Quote exceeded!");
					// 		}
					// 	}
				}

			});
			sendResponse({eval:"success! added"});

		}

 });

function clear_all(){
	chrome.storage.sync.clear();
	localStorage.clear();
}

// AJAX Calls
function store_piece(Url, Title){
	$.ajax(Url, {
		success: function(data){
			// console.log(data);
			var text_container = $(data).find(".selected-piece-text-container").find("h2").html()
			// console.log(text_container)
			try{
						localStorage.setItem(Title, text_container);
						// console.log(localStorage);
						// SEND A MESSAGE TO THE JESTUREPAGE TO WORK PROPERLY
				}catch (e){
					if (e == "QUOTE_EXCEEDED_ERR"){
						alert("Quote exceeded!");
					}
				}
		}
	});
}

/* UNUSED CODE */

// // Initialize storage on first run
// chrome.storage.sync.get(["pieces", "comix", "issues", "authors", "feed", "Hash"],function initialize(data){
// 		if (!chrome.runtime.error){
// 			if (!data.Hash){
// 				chrome.storage.sync.set({"Hash":1})
// 			}
// 			// if we haven't already initialized the array
// 			if (! data.pieces){
// 					chrome.storage.sync.set({pieces:{favorites:["placeholder"]}}, function(){});
// 			}
// 			else{
// 				favoritePieces = data.pieces.favorites;
// 				for (piece in favoritePieces){
// 					currentPiece = favoritePieces[piece];
// 					// console.log(currentPiece.Url);
// 					// currentPieceUrl = curent
// 					// is this going to do it for the same piece multiple times?
// 					// if it hasn't been cached on this computer,cache it

// 					if (!(localStorage.getItem(currentPiece.Url))){
// 						store_piece(currentPiece.Url);
// 					}
// 					// else it has
// 				}
// 			}
// 			if (! data.comix){
// 				// can get rid of this and use the 0th index!
// 				chrome.storage.sync.set({comix:{favorites:["placeholder"]}}, function(){});
// 			}
// 			if (! data.issues){
// 				chrome.storage.sync.set({issues:{favorites:["placeholder"]}}, function(){});
// 			}
// 			if (! data.authors){
// 				chrome.storage.sync.set({authors:{favorites:["placeholder"]}}, function(){});
// 			}
// 			if (! data.feed){
// 				chrome.storage.sync.set({feed:[]}, function(){
// 				});
// 			}
// 			// else make sure we have the url
// 			// this can probably be made more effecient
// 			else {
// 				Feed = data.feed
// 				for (item in Feed){
// 					if (Feed[item].Type == "piece"){
// 						curr = Feed[item]
// 						if (!(localStorage.getItem(curr.Title))){
// 							store_piece(curr.Url, curr.Title);
// 						}
// 					}
// 				}
// 			}
// 	}
// 	else{
// 		alert("there was an error!");
// 	}
// });

// if (localStorage.length ==0 ){
//
// 	var visited = []
// 	crawl_lampoon("http://harvardlampoon.com/");
// }
// else{
// 	console.log(localStorage.length);
// }
//
// function crawl_lampoon(Url){
// 	visited.push(Url);
// 	$.ajax(Url, {
// 		async: false,
// 		success:function(data){
// 			localStorage.setItem(Url, data);
// 			var links = $(data).find("a").each(function(){
// 				h = $(this).attr("href");
// 				if (h.split("/")[0] == ""){
// 					var next = "http://harvardlampoon.com/" + h.slice(1);
// 					if ($.inArray(next, visited) == -1){
// 						console.log("visiting", next);
// 						crawl_lampoon(next);
// 					}
// 				}
// 				else{
// 					console.log(h, "bad");
// 				}
// 			});
// 		}
// 	});
// }
// When you receive a message that a favorite was added
// update the favorites, send it to the jesture page
// tell the jesture page to refresh.
/* Main */
// chrome.tabs.onUpdated.addListener(function(tabId, chagneInfo, tab){
// 	var url_array = tab.url.split("/");
// 	// console.log(url_array);
// 	if (url_array[2] == "harvardlampoon.com"){
// 	 	// console.log("YAY IT WORKS");
// 		switch (url_array[3]){
// 			case "":
// 				chrome.tabs.executeScript(null, {file:"content scripts/home.js"});
// 				// on the home page
// 				// run the piece script
// 				break;
// 			case "jesture_page.html":
// 				// run jesture page script
// 				// query the storage
// 				break;
// 			case "issue":
// 				// thumbnails script
// 				chrome.tabs.executeScript(null,{file:"content scripts/thumbnails_script.js"});
// 				// derp
// 				break;
// 			case "issues":
// 				chrome.tabs.executeScript(null, {file:"content scripts/issues_script.js"});
// 				// issues script
// 				// derp
// 				break;
// 			case "comix":
// 					if (url_array[4] != ""){
// 						chrome.tabs.executeScript(null, {file:"content scripts/comix_script.js"});
// 					}
// 					else {
// 						console.log("Currently on the comix page. No development yet.");
// 					}
// 					break;
// 			case "masthead":
// 				console.log("Current on the Masthead. No development yet.");
// 				break;
// 		}
// 	}
// 	else {
// 		console.log("Not on Lampoon site. On: ", tab.url);
// 	}
// })
// clear all
// else if (request.question =="newpage"){
// 	var Url = request.u;
// 	$.ajax(Url, {
// 		success: function(data){
// 			localStorage.setItem(Url, data);
// 			chrome.tabs.create({url:"jesture_page2.html"});
//
// 		}
// 	});
// }
// else if (request.question =="addstorage"){
// 	try{
// 			localStorage.setItem(request.key, request.val);
// 			sendResponse({eval:"success! added"});
// 			console.log(localStorage);
// 			// SEND A MESSAGE TO THE JESTUREPAGE TO WORK PROPERLY
// 	}catch (e){
// 		if (e == "QUOTE_EXCEEDED_ERR"){
// 			alert("Quote exceeded!");
// 		}
// 	}
// }
// else if (request.question === "deletestorage"){
// 	localStorage.removeItem(request.key);
// 	sendResponse({eval:"success! deleted"});
// 	console.log(localStorage);
// }//
// if (request.question == "getStorage"){
// 	sendResponse({storage:"hello"});
// }
