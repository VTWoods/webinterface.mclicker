$(document).bind("mobileinit", function(){
    var movingVolume = false;
    var movingSeek = false;
    $('.ui-slider').live('mousedown', function(){$('#volumeSlider').trigger('start');});
    $('.ui-slider').live('touchstart', function(){$('#volumeSlider').trigger('start');});
    $('.ui-slider').live('mouseup', function(){$('#volumeSlider').trigger('stop');});
    $('.ui-slider').live('touchend', function(){$('#volumeSlider').trigger('stop');});
    $('#volumeSlider').live('focus',function(){$('#volumeSlider').trigger('start');});
    $('#volumeSlider').live('blur',function(){$('#volumeSlider').trigger('stop');});
        
    $('#remote_control')
	.live('pagebeforeshow',function(event,ui){
	    $('#volumeSlider').slider('disable',true);
	    $('#seekSlider').slider('disable',true);
	    refresh();
	})
	.live('pageshow',function(event) {
	    $('#remote_control').everyTime(2000,function(){
		refresh(movingVolume, movingSeek);
	    });
	})
	.live('pagehide',function(event){
	    $('#remote_control').stopTime();
	})
	.live('pagecreate',function(event) {
	    $('#volumeSlider')
		.bind('start', function(){
		    movingVolume = true;
		})
		.bind('stop', function(){
		    sendVolume();
		    movingVolume = false;
		});
	    $('#seekSlider')
		.bind('vmousedown', function(){
		    movingSeek = true;
		})
		.bind('vmouseup', function(){
		    sendSeek();
		    movingSeek = false;
		});
	    $('#playButton').bind('click', function(){sendPlayerCommand('PlayPause')});
	    $('#stopButton').bind('click',function(){sendPlayerCommand('Stop')});
	    $('#bigSkipBackward').bind('click',function(){sendPlayerCommand('BigSkipBackward')});
	    $('#smallSkipBackward').bind('click', function(){sendPlayerCommand('SmallSkipBackward')});
	    $('#bigSkipForward').bind('click', function(){sendPlayerCommand('BigSkipForward')});
	    $('#smallSkipForward').bind('click', function(){sendPlayerCommand('SmallSkipForward')});
	    $('#skipNext').bind('click', function(){sendPlayerCommand('SkipNext')});
	    $('#skipBack').bind('click', function(){sendPlayerCommand('SkipPrevious')});
	});
    function sendPlayerCommand(command)
    {
	callRPC("VideoPlayer."+command,null,null);
	callRPC("AudioPlayer."+command,null,null);
    }
    function sendVolume() {
	var volumeSlider = $("#volumeSlider");
	callRPC("XBMC.SetVolume",volumeSlider.val(),null);
    }
    function sendSeek(){
	var seekSlide = $("#seekSlider");
	callRPC("AudioPlayer.SeekPercentage",seekSlide.val(),null);
    }
    function updateSeek(data) {
	var seekPercent = data["result"];
	if(seekPercent)
	{
	    var seekSlide = $("#seekSlider");
		seekSlide.slider('enable',true)
		.val(seekPercent);
		seekSlide.slider('refresh');
	}
    }
    
    function refresh(movingVolume, movingSeek) {
	if(!movingVolume)
	{
	    callRPC("XBMC.GetVolume",null,function(data){
		var volume = data["result"];
		var volumeSlider = $("#volumeSlider");
		$('#volumeSlider').slider('enable',true);
		var valFunction = volumeSlider.val(volume).slider('refresh');
	    });
	}
	if(!movingSeek)
	{
	    callRPC("VideoPlayer.GetPercentage",null,updateSeek);
	    callRPC("AudioPlayer.GetPercentage",null,updateSeek);
	}
    }
});