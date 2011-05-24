$(document).bind("mobileinit", function(){
    function sendKey(event,key)
    {
	if(event == "remote_gesture")
	    callURL("SendKey("+key+")");
    }
    var numTaps = 0;
    function multiTap()
    {
	if(numTaps == 1)
	    sendKey("remote_gesture","0XF00D");
	else if(numTaps == 2)
	    sendKey("remote_gesture","0XF008");
	numTaps = 0;
    }
    //TODO: FIX THIS TO USE JSON
    $('#remote_gesture')
	.live('pagecreate',function(){

//===========================PATCH
var supportTouch = $.support.touch,
    scrollEvent = "touchmove scroll",
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    //Swipe up and swipe down patch
    $('#remote_gesture')
	.bind( "touchstart", function( event ) {
	    var data = event.originalEvent.touches ?
		event.originalEvent.touches[ 0 ] :
		event,
	    start = {
		time: (new Date).getTime(),
		coords: [ data.pageX, data.pageY ],
		origin: $( event.target )
	    },
	    stop;
	    
	    function moveHandler( event ) {		
		if ( !start ) {
		    return;
		}
		var data = event.originalEvent.touches ?
		    event.originalEvent.touches[ 0 ] :
		    event;
		stop = {
		    time: (new Date).getTime(),
		    coords: [ data.pageX, data.pageY ]
		};
		
		// prevent scrolling
		if ( Math.abs( start.coords[0] - stop.coords[0] ) > 10 ) {
		    event.preventDefault();
		}
	    }
	    
	    $('#remote_gesture')
		.bind( "touchmove", moveHandler )
		.one( "touchend", function( event ) {
		    $('#remote_gesture').unbind( touchMoveEvent, moveHandler );
		    if ( start && stop ) {
			var diff = stop.time-start.time < 1000;
			if (diff)
			{
			    if(Math.abs( start.coords[0] - stop.coords[0]) > 50 &&
			       Math.abs( start.coords[1] - stop.coords[1]) < 50 ) {
				$('#remote_gesture')
				    .trigger( start.coords[0] > stop.coords[0] ? "left" : "right" );
			    }
			    else if(Math.abs( start.coords[1] - stop.coords[1]) > 50 &&
				    Math.abs( start.coords[0] - stop.coords[0]) < 50 ) {
				
				$('#remote_gesture')
				    .trigger( start.coords[1] > stop.coords[1] ? "up" : "down" );
			    }
			}
		    }
		    start = stop = undefined;
		});
	});
	    $('#fullscreenButton').bind("click",function(event){
		sendKey("remote_gesture","0XF009");
	    });
	    $('#xbmcHomeButton').bind("click",function(event){
		sendKey("remote_gesture","0XF01B");
	    });

	    $('#remote_gesture')
		.bind('touchmove',function(event){event.preventDefault()})
		.bind('left',function(event) {
		    sendKey(event.target.id,"0XF025");
		})
		.bind('right',function(event) {
		    sendKey(event.target.id,"0XF027");
		})
		.bind('up', function(event){
		    sendKey(event.target.id,"0XF026");
		})
	        .bind('down', function(event){
		    sendKey(event.target.id,"0XF028");
		})
		.bind('tap',function(event) {
		    if(event.target.id == "remote_gesture")
		    {
			if(numTaps == 0)
			    $('#remote_control').oneTime(400,multiTap);
			numTaps++;
		    }
		})
		.bind('taphold',function(event) {
		    sendKey(event.target.id,"0XF143");
		});
	})
});