const express = require('express');

const app = express();
const port = 8080;

var proxy = require('http-proxy').createProxyServer({
    host: 'http://localhost/',
    port: 9998
});
const { spawn } = require("child_process");
let building = false;

flutterProcess = spawn('cmd')
flutterProcess.stdin.write('cd screen_renderer && flutter run -d web-server --web-port 9998\n')
// flutterProcess.send('r')

flutterProcess.stdout.on("data", function (data) {
    console.log(data.toString());
});

app.get('/render', (req, res) => {
    if (!building) {
        building = true;
        flutterProcess.stdin.write('r');
        building = false;
    };

    setTimeout(() => {
        res.redirect('/')
        
  }, 500);

});

app.use('/', function (req, res, next) {
    proxy.web(req, res, {
        target: 'http://localhost:9998'
    }, next);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});