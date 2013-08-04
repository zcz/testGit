var http = require("http");
var url = require("url");

function start( port, route, handle ) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var postData = "";
    console.log("Request for " + pathname + " received." );

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk", postDataChunk );
    });
  
    request.addListener("end", function() {
      route( handle, pathname, response, postData ); 
    });
  }
  http.createServer(onRequest).listen( port );
  console.log(new Date(), "server started at port", port );
}

exports.start = start;

