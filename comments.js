// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request, response){
    // 2.1 get url
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log(resource);
    // 2.2 if get method
    if(request.method == 'GET'){
        if(resource == '/'){
            fs.readFile('index.html', 'utf-8', function(error, data){
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(data);
            });
        }else if(resource == '/favicon.ico'){
            fs.readFile('favicon.ico', function(error, data){
                response.writeHead(200, {'Content-Type':'image/x-icon'});
                response.end(data);
            });
        }else if(resource == '/comments'){
            fs.readFile('comments.json', 'utf-8', function(error, data){
                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(data);
            });
        }else{
            response.writeHead(404, {'Content-Type':'text/html'});
            response.end('404 Not Found');
        }
    // 2.3 if post method
    }else if(request.method == 'POST'){
        if(resource == '/comments'){
            // 2.3.1 read form data
            request.on('data', function(data){
                var comment = qs.parse(data.toString());
                // 2.3.2 read comments.json
                fs.readFile('comments.json', 'utf-8', function(error, data){
                    var comments = JSON.parse(data);
                    // 2.3.3 add comment
                    comments.push(comment);
                    // 2.3.4 write comments.json
                    fs.writeFile('comments.json', JSON.stringify(comments), function(error){
                        response.writeHead(200, {'Content-Type':'application/json'});
                        response.end(JSON.stringify(comments));
                    });
                });
            });
        }
    }
});
// 3. run web server
server.listen(8080, function(){
    console.log('Server is running...');
});