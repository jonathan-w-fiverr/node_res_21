var express = require('express');
var router = express.Router();
const ResumeParser = require('resume-parser');
const path = require('path');
const spawn = require("child_process").spawn;
const { resolve } = require('path');
const axios = require('axios').default;
const FormData = require('form-data');
/* GET home page. */
const hostOS = process.platform
const hostToUse = hostOS === 'darwin'?  'host.docker.internal' : 'localhost'
router.get('/import', function(req, res, next) {
    let fileName = req.query.file;
    let fullPath = path.resolve(__dirname, '../resumes/import/' + fileName)
    ResumeParser.parseResumeFile(fullPath, path.resolve(__dirname, '../resumes/export/')) // input file, output dir
    .then(file => {
        //console.log(file)
        axios.get('http://' + hostToUse + ':8000/?fileName=' + fullPath)
        .then(function (response) {
            // handle success
            parsed={}
            parsed.node = file
            parsed.py = response.data
            console.log(parsed);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
)
    .catch(error => {
      console.error(error);
    })
      
  
  
  
  
    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/import', function(req, res, next) {
    //let fileName = req.query.file;
    console.log(req.files.resume)
    res.header("Access-Control-Allow-Origin", "*");
    let fullPath = req.files.resume.tempFilePath
    ResumeParser.parseResumeFileReturn(req.files.resume, null) // input file, output dir
    .then(file => {
        //console.log(file)
        //var form = new FormData();
        //let files = fs.readFileSync(fullPath)
        //console.log(form.getLengthSync())
        //form.append('file_in', String(files));
        
       // let request_config = {
         //   headers: {
           //   ...form.getHeaders(),
             // 'content-length':form.getLengthSync()
            //},
           // data: form
          //};
            //axios.post('http://' + hostToUse + ':8000/import', form, request_config )
        
                axios.get('http://' + hostToUse + ':8000/?fileName=/?fileName=' + fullPath)
            .then(function (response) {
                // handle success
                parsed={}
                parsed.node = file
                parsed.py = response.data
                console.log(parsed);
            })
            .catch(function (error) {
                console.log(error)
                res.send(file)
                return(file)
                
            })
            .then(function () {
                // always executed
            });
    }
)
    .catch(error => {
      console.error(error);
      console.log(file)
      res.send(file)
      return(file)
    })

  
    //res.send(file);
});

module.exports = router;