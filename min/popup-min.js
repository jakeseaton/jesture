function ajax_pieces(e,o,a){$.ajax(e,{success:function(e){var n=$(e).find(".piece-text-container").find("h2").html(),t=$(".template1"),l=t.clone();l.removeClass("template1"),l.removeClass("invisible"),l.find(".collapse").removeClass("in"),l.find(".accordion-toggle").attr("href","#"+ ++hash).text(o+" "+a),l.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),l.find(".panel-body").html(n),$("#accordion1").prepend(l.fadeIn())}})}function createPieceItem(e,o,a){console.log(e),console.log(localStorage);var n=localStorage.getItem(e);console.log(n);var t=$(".template1"),l=t.clone();l.removeClass("template1"),l.removeClass("invisible"),l.find(".collapse").removeClass("in"),l.find(".accordion-toggle").attr("href","#"+ ++hash).text(o+" "+a),l.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),l.find(".panel-body").html(n),$("#accordion1").prepend(l.fadeIn())}function createComixItem(e,o){var a="<img src = 'http://harvardlampoon.com"+e+"'/>",n=$(".template4"),t=n.clone();t.removeClass("template4"),t.removeClass("invisible"),t.find(".collapse").removeClass("in"),t.find(".accordion-toggle").attr("href","#"+ ++hash).text(o),t.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),t.find(".panel-body").html(a),$("#accordion4").prepend(t.fadeIn())}function createIssueItem(e,o,a){console.log("derp");var n=$(".template2"),t=n.clone();t.removeClass("template2"),t.removeClass("invisible"),t.find(".collapse").removeClass("in"),t.find(".accordion-toggle").attr("href","#"+ ++hash).text(a),t.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),t.find(".panel-body").html(o),$("#accordion2").prepend(t.fadeIn()),console.log("derp")}function createAuthorItem(e,o){var a=$(".template3"),n=a.clone();n.removeClass("template3"),n.removeClass("invisible"),n.find(".collapse").removeClass("in"),n.find(".accordion-toggle").attr("href","#"+ ++hash).text(o),n.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),n.find(".panel-body").html(e),$("#accordion3").prepend(n.fadeIn())}var minusIcon='<img src = "entypo/circle-with-minus.svg" class = "minus icon inactive"/>',downloadIcon='<img src = "entypo/download.svg" class = "download icon inactive"/>',facebookIcon,twitterIcon,downIcon='<img class = "down icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-down.svg"/>',upIcon='<img class = "up icon inactive" src= "entypo/entypo+/entypo+/chevron-with-circle-up.svg"/>',menuBar='<div class = "menu">'+upIcon+downIcon+downloadIcon+minusIcon+"</div>";chrome.storage.onChanged.addListener(function(e,o){console.log("storage was changed");for(var a in e)var n=e[a]});var hash=1;$(document).ready(function(){chrome.storage.sync.get("feed",function(e){if(chrome.runtime.error)alert("an error occurred");else{var o=e.feed;console.log(e);for(item in o){var a=o[item];switch(console.log(a),a.Type){case"author":createAuthorItem(a.List,a.Author);break;case"issue":console.log("got to here"),createIssueItem(a.Img,a.Description,a.Title);break;case"comix":createComixItem(a.Img,a.Title);break;case"piece":createPieceItem(a.Url,a.Title,a.Author)}}}}),$("#jesture-page-link").each(function(){$(this).click(function(e){e.preventDefault();var o=$(this).attr("href");chrome.tabs.getSelected(null,function(e){chrome.tabs.update(e.id,{url:o})})})})});