var connect = require('connect'),
    port = process.env.PORT;

console.log("Listening on " + port);

connect.createServer(
    connect.static(__dirname)
).listen(port);
