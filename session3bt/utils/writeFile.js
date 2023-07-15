const fs = require('fs');

const writeToFile = (url, data) => {
    const newData = fs.writeFileSync(url,JSON.stringify(data));

    return newData;
}

module.exports = writeToFile;