const express = require('express');
const router = express.Router()

const { exec, spawn }  = require('child_process');
const execa = require('execa');

router.post('/ping', (req,res) => {
    exec(req.body.url, (error) => {
        if (error) {
            return res.send('error');
        }
        res.send('pong')
    })

})

router.post('/gzip', (req,res) => {
    exec(
        'gzip ' + req.query.file_path,
        function (err, data) {
          console.log('err: ', err)
          console.log('data: ', data);
          res.send('done');
    });
})

router.get('/run', (req,res) => {
   let cmd = req.params.cmd;
   runMe(cmd,res)
});

function runMe(cmd,res){
//    return spawn(cmd);

    const cmdRunning = spawn(cmd, []);
    cmdRunning.on('close', (code) => {
        res.send(`child process exited with code ${code}`);
    });
}

router.get('/run2', (req,res) => {
   let cmd = req.params.cmd;
   execa.sync(cmd, []).stdout.pipe(res);
});

router.get('/run3', (req,res) => {
   let cmd3 = req.params.cmd;
   execa(cmd3, []).stdout.pipe(res);
});

module.exports = router
