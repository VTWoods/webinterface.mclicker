$(document).bind("mobileinit",function(){
    $('img').lazyload();
    $('#movie_all').live('pagecreate',function(){
	callRPC("VideoLibrary.GetMovies",null,function(data){
	    var list = $('#allMovieList');
	    var start = data['result']['start'];
	    var end = data['result']['end'];
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