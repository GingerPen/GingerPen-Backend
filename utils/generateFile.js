const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const dirCodes = path.join(__dirname, "codes");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive : true});
}

const generateFileJava = async (format, code) => {
    const unique = crypto.randomBytes(4).readUInt32LE(0);
    var one = code.indexOf('class');
    var two = code.indexOf('{'); 
    var className = (code.substring(one+5,two)).trim();
    //console.log(className);
    const jobId = className+unique;
    var three = code.indexOf(className);
    var position = three+(className.length);
    var code1 = code;
    var code1 = [code1.slice(0, position), unique, code1.slice(position)].join('');
    console.log(code1);
    const fileName  = `${jobId}.${format}`;
    const filePath = path.join(dirCodes,fileName);
    await fs.writeFileSync(filePath,code1);
    return filePath;
};

const generateFilePy = async (format, code) => {
    const jobId = "GingerPen"+crypto.randomBytes(4).readUInt32LE(0);
    console.log(code);
    const fileName  = `${jobId}.${format}`;
    const filepath = path.join(dirCodes,fileName);
    await fs.writeFileSync(filepath,code);
    return filepath;
};

const deleteFileJava = async(filePath)=>{
    var arr = [];
    arr= filePath.split('.');
    var filePath1 = arr[0]+'.class';
    //console.log(filePath1);
    await fs.unlinkSync(filePath);
    await fs.unlinkSync(filePath1);
};

const deleteFilePy = async(filePath)=>{
    await fs.unlinkSync(filePath);
};

module.exports = {
    generateFileJava,
    generateFilePy,
    deleteFileJava,
    deleteFilePy
};