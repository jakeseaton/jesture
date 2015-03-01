hash = 0;
ALL_DATA = [];
chrome.storage.sync.get(function(data){
	for (i in data){
		hash++;
		ALL_DATA = $.extend(All_DATA, data[i]);
	}
});
