const http = require('http'); //Import Node.js core module

const server = http.createServer(function(req,res){
    // handle income request here

    // Task 1:
    // res.writeHead(200, {'Content-type':'text/html'});
    // res.write("Hello World!");
    // res.end();


    if(req.url == '/'){
        res.writeHead(200, {'Content-type':'text/html'});
        res.write('<html><body><p>This is home page.</p></body></html>');
        res.end();
    }
    else if(req.url == '/student'){
        res.writeHead(200, {'Content-type':'text/html'});
        res.write('<html><body><p>This is student page.</p></body></html>');
        res.end();
    }
    else if(req.url == '/admin'){
        res.writeHead(200, {'Content-type':'text/html'});
        res.write('<html><body><p>This is admin page.</p></body></html>');
        res.end();
    }
    else if(req.url == '/data'){
        res.writeHead(200, {'Content-type':'text/html'});
        res.write(JSON.stringify({message: 'Hello world Json'}));
        res.end();
    }
    else{
        res.end('Invalid Request !')
    }

})

server.listen(8080)

console.log('Node.js server at port 8000 is running..');

