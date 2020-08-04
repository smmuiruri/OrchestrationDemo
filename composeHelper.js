// A Simple Request/Response web application

// Load all required libraries
var http = require('http');
var url = require('url');
var redis = require('redis');

// Connect to redis server running createClient API is called with-- 6379, a well-known port to which the
// redis server listens to -- redis, is the name of the service (container) that runs redis server
var client = redis.createClient(6379, 'redis');

// Set the key value pair that we are going to be querying in the redis server. Here all the keys proceeds with "/", because
// URL parser always have "/" as its first character. Again, feel free to add more of these pairs.
client.set("/", "Welcome to Docker-Compose helper\nEnter the docker-compose command in the URL for help\n", redis.print);
client.set("/run", "This runs a one-off command", redis.print);
client.set("/scale", "This sets a number of containers for a service", redis.print);
client.set("/build", "Build or rebuild services", redis.print);
client.set("/kill", "Kill containers", redis.print);

var server = http.createServer(function (request, response) {
  var href = url.parse(request.url, true).href;
  response.writeHead(200, {"Content-Type": "text/plain"});

  // Pull the response (value) string using the URL
  client.get(href, function (err, reply) {
    if ( reply == null ) response.write("Command: " + href.slice(1) + " not supported\n");
    else response.write(reply + "\n");
    response.end();
  });
});

console.log("Listening on port 80");
server.listen(80);
