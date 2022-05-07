const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "output");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const execute = async (filePath) => {
    command = "";

    jobId = path.basename(filePath).split('.')[0];
    type = path.basename(filePath).split('.')[1];

    const outPath = path.join(outputPath, `${jobId}.out`);
    switch (type) {
        case "java":
            command = `cd utils && cd codes && javac ${jobId}.java && java ${jobId}`;
            break;
        case "py":
            command = `python ${jobId}.py`;
            break;
    }

    return new Promise((resolve, reject) => {
        exec(command,
            /**
             * 
             * @param {*} error: It will tell us about the error while executing the command such as command not found
             * @param {*} stdout: it will tel is about the normal output
             * @param {*} stderr: It will tell us about the error in command line after the command is successfully executed
             */

            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(error);
                resolve(stdout);
            });
    }).then((result) => {
        return result;
    }).catch((error) => {
        return error.stderr;
    })
};

module.exports = {
    execute,
}