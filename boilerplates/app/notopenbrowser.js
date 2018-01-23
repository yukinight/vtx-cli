var fs = require('fs');  
var path = require('path');  

var srcFilePath = path.resolve('./node_modules/roadhog/lib');
var filename = 'runServer.js';
var filedir = path.join(srcFilePath,filename); 

if(fs.existsSync(filedir)){
    var data = fs.readFileSync(filedir).toString();
    var rgx = /[^\n]*\)\(protocol \+[^\n]*/;
    // console.log(data.match(/[^\n]*\)\(protocol \+[^\n]*/g))
    if(rgx.test(data)){  
        var newData = data.replace(rgx,'');
        fs.writeFileSync(filedir, newData);
        console.log('已阻止roadhog自动打开浏览器')
    }
    
}