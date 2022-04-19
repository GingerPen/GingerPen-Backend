const {exec} = require('child_process');
const { fs } = require('fs');

const output = path.join(__dirname,"output");

if(!fs.existsSync(output)){
    fs.mkdirSync(output,{recursive:true});
}
const execute = (filePath) =>{
    return new Promise((resolve,reject)=>   {
        
    });
};

module.exports= {
    execute,
}