const snippets = require('./snippets.js')
const AICoder = require('./AICoder.js').AICoder;
const express = require('express');
// const { spawn, exec } = require("child_process");
var cors = require('cors');
const fs = require('fs');
// var httpProxy = require('http-proxy');
// var apiProxy = httpProxy.createProxyServer();
const app = express();
const port = 8080;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// let building = false;

// flutterProcess = spawn('bash')
// flutterProcess.stdin.write('cd screen_renderer && flutter pub get && flutter run -d web-server --web-port 9998\n')

// flutterProcess.stdout.on("data", function (data) {
//     console.log(data.toString());
// });


// app.get('/render', (req, res) => {
//     if (!building) {
//         building = true;
//         flutterProcess.stdin.write('r');
//         building = false;
//     };

//     setTimeout(() => {
//         res.status(200)
//         res.end()
//     }, 1000);

// });

// app.get('/build/:type', (req, res) => {
//     let type = req.params.type || 'web';
//     let buildFolder;
//     if (type === 'aab' || type === 'apk') {
//         buildFolder = 'build/app';
//     } else if (type === 'web') {
//         buildFolder = 'build/web';
//     } else if (type === 'linux') {
//         buildFolder = 'build/linux';
//     } else {
//         // Handle invalid build type
//         res.status(400).send('Invalid build type specified');
//         return;
//     }

//     req.params.code ? fs.writeFile('./screen_renderer/lib/main.dart', req.params.code, () => {
//         console.log('Written main.dart');
//         exec(`cd screen_renderer && rm -rf build && flutter build ${type} && zip -r ${buildFolder} ${buildFolder}`, (_, out, err) => {
//             if (err) {
//                 res.status(500).send('Error occurred during build');
//                 return;
//             }

//             res.status(200).download(`screen_renderer/${buildFolder}.zip`);
//         });
//     }) : res.status(500).json({ error: 'No code specified' })

// });

app.post('/update', async (req, res) => {
    console.log(JSON.stringify(req.query));

    let code = snippets.pre + req.body.newCode + snippets.post;
    if (req.body.withAI) {
        code = await AICoder.processCode(code)
    }
    res.json({ code: code });

});

app.get('/hi', (req, res) => {
    res.json({
        res: "hello"
    })
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});