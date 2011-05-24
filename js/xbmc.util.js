function callRPC(methodName, param, callBack)
{
    if(param === null)
    {
	$.postJSON("http://"+window.location.hostname+":"+window.location.port+"/jsonrpc", 
		   '{ "jsonrpc": "2.0", "method": "'+methodName+'", "id": "1"}', callBack);
    }
    else
    {
	$.postJSON("http://"+window.location.hostname+":"+window.location.port+"/jsonrpc", 
		   '{ "jsonrpc": "2.0", "method": "'+methodName+'", "params": '+param+', "id": "1"}', callBack);
    }
}

function callURL(cmd)
{
    $.ajax("http://"+window.location.hostname+":"+window.location.port+"/xbmcCmds/xbmcHttp?command="+cmd);
}