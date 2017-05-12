//setup static git snode server
var fs = require('fs');
var path = require('path');
var http = require('http');

var staticBasePath = './';

var staticServe = function(req, res) {
    var fileLoc = path.resolve(staticBasePath);
    fileLoc = path.join(fileLoc, req.url);

//changing this to stream
    // fs.readFile(fileLoc, function(err, data) {
    //     if (err) {
    //         res.writeHead(404, 'Not Found');
    //         res.write('404: File Not Found!');
    //         return res.end();
    //     }
  var stream = fs.createReadStream(fileLoc);

  //handle non-existent file
  stream.on("error", function(error) {
    res.writeHead(404, "Not Found");
    res.write("404: File Not Found!");
    res.end();
  })
  //file exists- stream it to user
        res.statusCode = 200;
        stream.pipe(res);

        //res.write(data);  this is one way to do it- would still need res.end()
        //not needed anymore because of stream
        //return res.end(data);
    //});
};

var httpServer = http.createServer(staticServe);

httpServer.listen(8081);
console.log(8081)

//Notes
//http.createServer(function (request, response) {

//})
//res.end takes optional data as an argument so it can be used like res.write if only 1 thing to write
