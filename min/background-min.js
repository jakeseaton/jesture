function clear_all(){chrome.storage.sync.clear(),localStorage.clear()}chrome.runtime.onMessage.addListener(function e(o,t,r){console.log(t.tab?"from a content script:"+t.tab.url:"from the extension"),"what is the current url?"==o.question?r({url:t.tab.url}):"addstorage"==o.question&&($.ajax(o.u,{success:function(e){var t=$(e).find(".piece-text-container").find("h2").html();console.log(t);try{localStorage.setItem(o.u,t),console.log(localStorage)}catch(r){"QUOTE_EXCEEDED_ERR"==r&&alert("Quote exceeded!")}}}),r({eval:"success! added"}))}),chrome.browserAction.onClicked.addListener(function(e){chrome.tabs.getAllInWindow(void 0,function(e){for(var o=!0,t=0,r;r=e[t];t++)"jesture_page.html"==r.url.split("/")[3]&&(chrome.tabs.update(r.id,{selected:!0}),o=!1);o&&chrome.tabs.create({url:"jesture_page.html"})})}),chrome.storage.sync.get(["pieces","comix","issues","authors"],function o(e){chrome.runtime.error?alert("there was an error!"):(e.pieces||chrome.storage.sync.set({pieces:{favorites:["placeholder"]}},function(){}),e.comix||chrome.storage.sync.set({comix:{favorites:["placeholder"]}},function(){}),e.issues||chrome.storage.sync.set({issues:{favorites:["placeholder"]}},function(){}),e.authors||chrome.storage.sync.set({authors:{favorites:["placeholder"]}},function(){}))});