$(document).bind("mobileinit",function(){
    //$('img').lazyload();
    $('#movie_all').live('pagecreate',function(){
	callRPC("VideoLibrary.GetMovies",'{"properties" :["thumbnail"]}',function(data){
	    
	    var list = $('#allMovieList');
	    var start = data['result']['limits']['start'];
	    var end = data['result']['limits']['end'];
	    var movies = data['result']['movies'];
	    var movieLi = "";
	    var url = 'http://'+window.location.hostname+":"
		+window.location.port;
	    while(start < end)
	    {
		
		movieLi += '<li><a><img src="'+
		    url+"/vfs/"+movies[start].thumbnail+'"/>'+
		    '<p>'+movies[start].label+'</p></a></li>';
		start++;
	    }
	    list.append(movieLi);
	    list.listview('refresh');
	});
    });
});