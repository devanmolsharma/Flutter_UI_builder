const snippets = require('./snippets.js')
const express = require('express');
const { spawn, exec } = require("child_process");
var cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8080;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let building = false;

flutterProcess = spawn('bash')
flutterProcess.stdin.write('cd screen_renderer && flutter pub get && flutter run -d web-server --web-port 9998\n')
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
        res.status(200)
        res.end()
    }, 1000);

});

app.get('/build/:type', (req, res) => {
    let type = req.params.type || 'web';
    exec(`cd screen_renderer && rm -rf build && flutter build ${type} && zip -r build build`, (_, out, err) => {
        res.status(err ? 500 : 200)
        console.log(out,err);
        res.download('screen_renderer/build.zip')
    })
});

app.post('/update', (req, res) => {
    console.log(JSON.stringify(req.query));

    let code = snippets.pre + req.body.newCode + snippets.post;
    fs.writeFile('./screen_renderer/lib/main.dart', code, () => {
        console.log('Written main.dart');
        res.end();
    })

});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});