console.log("currently on the comix page"),chrome.storage.onChanged.addListener(function(e,t){for(var r in e){var o=e[r];console.log("storage was changed")}}),chrome.runtime.onMessage.addListener(function(e,t,r){console.log("message from the background script")});var favorite_comix=[];chrome.storage.sync.get("comix",function e(t){chrome.runtime.error||(favorite_comix=t.comix.favorites)});var star_url=chrome.extension.getURL("star.png"),arrow_url=chrome.extension.getURL("arrow.png"),jesture_url=chrome.extension.getURL("jesture_page.html"),star_comix="<img id = 'star-comix' class = 'star inactive' src = "+star_url+" alt = 'star'/>",arrow_html="<a width = '36px' height = '36px' href = "+jesture_url+"><img class = 'arrow' src = "+arrow_url+" alt = 'arrow'/></a>",jesture_comix="<div id = 'jesture-container'><div id = 'jesture'>"+star_comix+arrow_html+"</div></div>";$("#comic-full").append(jesture_comix),$(".star").click(function(){if($(this).hasClass("inactive")){console.log("changing "+$(this).attr("id")+" to active");var e={source:$(this).parent().parent().prev().attr("src")};chrome.storage.sync.set({comix:e},function(){console.log("added "+e+" to storage with key comix and id",comix_key)}),$(this).removeClass("inactive"),$(this).fadeTo("fast",1),$(this).addClass("active")}else $(this).removeClass("active"),$(this).addClass("inactive"),$(this).fadeTo("fast",.5)}),$(".star").hover(function(){$(this).fadeTo("fast",1)},function(){$(this).fadeTo("fast",.5)}),$(".arrow").hover(function(){$(this).fadeTo("fast",1)},function(){$(this).fadeTo("fast",.5)});