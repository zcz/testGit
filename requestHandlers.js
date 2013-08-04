var exec = require("child_process").exec;
var queryString = require("querystring");
var fs = require("fs");
var util = require("util");
var formidable = require("formidable");

function start( request, response ) {
  console.log( "Request handler 'start' was called." );

  var body = '<html>' + 
    '<head>'+ 
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post"' +
    ' accept-charset="UTF-8" enctype="multipart/form-data">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<br>' + 
    '<input type="file" name="upload">' + 
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload( request, response ) {
  console.log( "Request handler 'upload' was called." );

  var form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    fs.rename( files.upload.path, "/tmp/test.jpg" );
    response.writeHead(200, {'content-type': 'text/html; charset=UTF-8'});
    response.write("received text: " + fields.text + "</br>");
    response.write('received image: <br/>');
    response.write('<img src="/show" />');
    response.end();
  });
}

function show( request, response ) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.jpg", "binary", function( error, file ) {
    if (error) {
      response.writeHead( 500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead( 200, {"Content-Type": "image/jpg"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

