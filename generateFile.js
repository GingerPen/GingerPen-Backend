const fs = require('fs');
const path = require('path');

const dirCodes = path.join(__dirname, "codes");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive : true});
}

const generateFile = async (format, code) => {
    const jobId = "GingerPen"
    const fileName  = `${jobId}.${format}`
    const filepath = path.join(dirCodes,fileName);
    await fs.writeFileSync(filepath,code);
    return filepath;
};

module.exports = {
    generateFile,
}