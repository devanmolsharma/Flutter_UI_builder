const express = require('express');

const app = express();
const port = 8080;

const { exec } = require("child_process");
let building = false;
app.get('/render', (req, res) => {
    if (!building) {
        building = true;
        exec("cd screen_renderer && webdev build", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            res.redirect('/')
            building = false;
        });
    } else {
        res.redirect('/')
    }
});

app.use('/', express.static('screen_renderer/build/'));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});