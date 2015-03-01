// move huffington psst to the bottom
// $("a[href='http://www.huffingtonpsst.com/']").remove();
// $(".footer-inner").find("a[href='/subscribe/']").after("<h1 class='footer-divider'>|</h1><a href='http://www.huffingtonpsst.com/'><h1>HUFFINGTON PSST</h1></a><br>");

// bug fix--elim white space at bottom.
// $(".footer-inner").css("padding-top", "30px");
// add jesture to menu bar
// var jesture_menu = "<a href = 'http://harvardlampoon.com'><div class = 'tab-container'><h3>FAVORITES</h3></div></a>";
// $(".menubar-tabs").append(jesture_menu);

//
// chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
// 	chrome.tabs.sendmessage(tabs[0].id, {greeting:"hello"},function(response){
// 		console.log(response.farewell);
// 	});
// });

// another way to inject jquery
// chrome.tabs.executeScript(null,
// 	{code:
// 		"var script = document.createElement('script');" +
// 		"script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js');" +
// 		"script.setAttribute('type','text/javascript');" +
// 		"document.getElementsByTagName('head')[0].appendChild(script);"
//
// 	}
// );

// use tabs.connect or runtime.connect to establish a long lived connection with the content script
// var port = chrome.runtime.tabs.connect({name: "knockknock"});
// port.postMessage({joke: "knock knock"});
// port.onMessage.addListener(function(msg){
// 	if (msg.question == "Who's there?"){
// 		port.postMessage({answer: "Madame"});
// 	}
// 	else if (msg.question == "Madame who?"){
// 		port.postMessage({answer: "Madame...Bovary"});
// 	}
// });

// figure out what page of the lampoon we are on
// send that info to the content script
// the content script will inject its stuff


//chrome.tabs.insertCSS("css/jesture.css");

//chrome.downloads.download({url:____, function()})


// // When they click on the browser action, print
// //ONLY DO THIS FOR THE LAMPOON WEBSITE
// chrome.browserAction.onClicked.addListener(function(tab){
// 	console.log("got to here");
// 	var action_url = "javascript:window.print();";
// 	chrome.tabs.update(tab.id, {url:action_url});
// });


// chrome.extension.onMessage.addListener(
// 	function(request, sender, sendResponse){
// 		// if they want preferences
// 		if (request.action = "prefs")
// 			// grab preferences out of local storage (not chrome.storage)
// 			var prefsString = localStorage.prefs
// 			// if it doesn't work
// 			if (prefsString === undefined){
// 				sendResponse(undefined);
// 			}
// 			// send a response message
// 			else {
// 				sendResponse(JSON.parse(localStorage.prefs))
// 			}
// 	});


// // when the user clicks on the extension button
// function click(e){
// 	// do all of the things
// 	chrome.tabs.query({currentWindow:true, active:true}, function(tabs) {
// 		console.log("background.js : click()");
// 	chrome.tabs.insertCSS(specTab.id, {file:"jesture.css"});
// 	chrome.tabs.executeScript(specTab.id, {file:"jesture.js"});
// 	});
// }
// chrome.browserAction.onClicked.addListener(click);

// var issues_favorites = [];
// var pieces_favorites = [];
// var comix_favorites = [];
// var max_favorites = 10;
//
// function update_favorites(){
//
// 	search_storage("pieces", max_favorites, pieces_favorites);
// 	search_storage("comix", max_favorites, comix_favorites);
// 	search_storage("issues", max_favorites, issues_favorites);
//
// 	function search_storage(category, max, targetArray){
// 		for (id = 0; id<max; id++){
// 			key = category + id.toString();
// 			query_storage(key, targetArray);
// 		}
// 	}
//
// 	function query_storage(key, targetArray){
// 		chrome.storage.sync.get(key, function(data){
// 			console.log("searching for objects with id", key);
// 			// if data isn't an empty object
// 			console.log(data);
// 			targetArray.push(data);
// 		});
// 	}
// }
//
// update_favorites();
// chrome.storage.sync.clear();
