const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://khoatien158:220790@cluster0.zdpykhx.mongodb.net/web69`)
        console.log("Connect to db sucessful");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectToDB
};