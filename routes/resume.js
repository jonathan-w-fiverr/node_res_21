var express = require('express');
var router = express.Router();
const ResumeParser = require('resume-parser');
const path = require('path');
const spawn = require("child_process").spawn;
const { resolve } = require('path');
const axios = require('axios').default;
/* GET home page. */
router.get('/import', function(req, res, next) {
    let fileName = req.query.file;
    let fullPath = path.resolve(__dirname, '../resumes/import/' + fileName)
    ResumeParser.parseResumeFile(fullPath, path.resolve(__dirname, '../resumes/export/')) // input file, output dir
    .then(file => {
        //console.log(file)
        axios.get('http://localhost:8000/?fileName=' + fullPath)
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
    let fullPath = req.files.resume.tempFilePath
    ResumeParser.parseResumeFileReturn(req.files.resume, null) // input file, output dir
    .then(file => {
        //console.log(file)
        axios.get('http://localhost:8000/?fileName=' + fullPath)
        .then(function (response) {
            // handle success
            parsed={}
            parsed.node = file
            parsed.py = response.data
            console.log(parsed);
        })
        .catch(function (error) {
            console.log(file)
      return(file)
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
)
    .catch(error => {
      console.error(error);
      console.log(file)
      return(file)
    })
      
  
  
  
  
  
  
    res.render('index', { title: 'Express' });
});

module.exports = router;