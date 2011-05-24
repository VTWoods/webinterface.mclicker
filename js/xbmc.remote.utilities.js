$(document).bind("mobileinit", function(){
    $('#utilPage').live('pagecreate',function(event,ui){

    $('#scanVideo').bind('click',function(event){
	callRPC("VideoLibrary.ScanForContent",null,null);
    });
    $('#scanMusic').bind('click',function(event){
	callRPC('AudioLibrary.ScanForContent',null,null);
    });
    });
});