var fs = require('fs');
var _ = require('lodash');

var removeFiles =  function(dirPath){
    var path = dirPath;
    console.log('[meta-file] removing files at path:', dirPath);
    var files = fs.readdirSync(dirPath);
    _.forEach(files, function(file){
        fs.unlinkSync(dirPath + file);
    });
};

module.exports = removeFiles;