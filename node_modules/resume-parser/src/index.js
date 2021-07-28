const parseIt = require('./utils/parseIt');
var logger = require('tracer').colorConsole();

module.exports.parseResumeFile = function(inputFile, outputDir) {
  console.log(inputFile)
  return new Promise((resolve, reject) => {
    parseIt.parseResumeFile(inputFile, outputDir, function(file, error) {
      if (error) {
        return reject(error);
      }
      return resolve(file);
    });
  });
};

module.exports.parseResumeUrl = function(url) {
  return new Promise((resolve, reject) => {
    parseIt.parseResumeUrl(url, function(file, error) {
      if (error) {
        return reject(error);
      }
      return resolve(file);
    });
  });
};


module.exports.parseResumeFileReturn = function(inputFile) {
  console.log('Parsing')
  return new Promise((resolve, reject) => {
    console.log("file is:" + inputFile)
    parseIt.parseResumeFileReturn(inputFile,function(file, error) {
      if (error) {
        return reject(error);
      }
      console.log("certs are: " + file.parts.certification)
      return resolve(file);
    });
  });
};
