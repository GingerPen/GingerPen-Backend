const {exec} = require('child_process');
const fs  = require('fs');
const path = require('path');

///Read about child process , we are usind exec command of child_process. We also have other processes
const outputPath = path.join(__dirname,"output");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}
const execute = async (filePath) =>{
    jobId =   path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath,`${jobId}.out`);
    console.log(`Job id isss ${jobId}    ${outPath}`);

    return new Promise((resolve,reject)=>   {
        exec(`cd codes && javac ${jobId}.java && java ${jobId}`,
            /**
             * 
             * @param {*} error: It will tell us about the error while executing the command such as command not found
             * @param {*} stdout: it will tel is about the normal output
             * @param {*} stderr: It will tell us about the error in command line after the command is successfully executed
             */
             (error,stdout,stderr)=>{
                // error && reject({error,stderr});
                // stderr &&   reject(error);
                // resolve(stdout);

                if(error){
                    reject({error,stderr});
                }
                if(stderr){
                    reject(error);
                }
                console.log("Output: " + stdout);
                resolve(stdout);
             });
    }).then((result) => {
        console.log('Do thisresult ' + result);
        return result;
        // throw new Error('Something failed');
    
    })
    .catch((error) => {
        console.error('in catch ' + error.error);
        throw new Error('Something failed: ' + error);
    })
};

module.exports= {
    execute,
}