$(document).bind("mobileinit",function(){
    $('#music_album').live('pagecreate',function(){
	callRPC("AudioLibrary.GetAlbums",'{"properties" :["thumbnail"],"sort" : {"method": "album"}}',function(data){
	    var letter = /^[A,a]/;
	    var list = $('#albumList');
	    var start = data['result']['limits']['start'];
	    var end = data['result']['limits']['end'];
	    var albums = data['result']['albums'];
	    var albumLi = "";
	    var url = 'http://'+window.location.hostname+":"
		+window.location.port;
	    while(start < end)
	    {
		var label = albums[start].label;
		if (label.match(letter)) {
		albumLi += '<li><a><img src="'+
		    url+"/vfs/"+albums[start].thumbnail+'"/>'+
		    '<p>'+label+'</p></a></li>';
		}
		start++;
	    }
	    list.append(albumLi);
	    list.listview('refresh');
	});
    });
});