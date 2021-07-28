var ParseBoy = require('./ParseBoy');
var processing = require('./libs/processing');
var _ = require('underscore');
var logger = require('tracer').colorConsole();
const util = require('util')


var parser = {
  parseResumeFile: function(file, savePath, cbAfterParse) {
    var objParseBoy = new ParseBoy(),
      savedFiles = 0;

    var onFileReady = function(preppedFile, error) {
      console.log("this is the prepped file: " + JSON.stringify(preppedFile))
      if (error) {
        return cbAfterParse(null, error);
      }
      objParseBoy.parseFile(preppedFile, function(Resume) {
        logger.trace(
          'I got Resume for ' + preppedFile.name + ', now saving...'
        );

        objParseBoy.storeResume(preppedFile, Resume, savePath, function(err) {
          if (err) {
            logger.error('Resume ' + preppedFile.name + ' errored', err);
            return cbAfterParse(
              null,
              'Resume ' + preppedFile.name + ' errored'
            );
          }
          logger.trace('Resume ' + preppedFile.name + ' saved');
          return cbAfterParse(Resume);
        });
      });
    };
    console.log(file)
    processing.runFile(file, onFileReady);
  },
  parseResumeFileReturn: function(file, cbAfterParse) {
    var objParseBoy = new ParseBoy(),
      savedFiles = 0;

    var onFileReady = function(preppedFile, error) {
      console.log("this is the prepped file: " + JSON.stringify(preppedFile))
      if (error) {
        return cbAfterParse(null, error);
      }
      objParseBoy.parseFileReturn(preppedFile, function(Resume) {
        logger.trace(
          'I got Resume for ' + preppedFile.name + ', now saving...'
        );

        return cbAfterParse(Resume)
      });
    };
    console.log('this is the test' + file)
    processing.runFileReturn(file.tempFilePath, file.mimetype.endsWith('octet-stream')? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : file.mimetype, onFileReady);
  },
  parseResumeUrl: function(url, cbAfterParse) {
    var objParseBoy = new ParseBoy();

    var onUrlReady = function(preppedData, error) {
      if (error) {
        return cbAfterParse(null, error);
      }

      objParseBoy.parseUrl(preppedData, function(Resume) {
        logger.trace('I got Resume for ' + url + ', now sending...');
        return cbAfterParse(Resume.parts);
      });
    };

    processing.runUrl(url, onUrlReady);
  },
};
module.exports = parser;
