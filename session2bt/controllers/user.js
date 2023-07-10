const fs = require('fs');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const userId = Number(req.query.userId);
    const result = readFile('data/user.json');

    const checkUser = result.find(item => item.userId === userId);

    if (!checkUser) {
        return res.status(401).json({message: "Dang nhap ko thanh cong"});
    }

    const token = jwt.sign({userId: checkUser.userId }, process.env.SECRET_KEY, {
        expiresIn:"1d"
    })

    console.log(token);

    return res.status(200).json({message:"Dang nhap thanh cong", token});
};

const getUser = (req, res) => {
    //const data = fs.readFileSync('user.json');
    const result = readFile('data/user.json');

    console.log(result);

    return res.status(200).json({result}); 
};

const createUser = (req, res) => {
    const userId = req.body.userId;
    const username = req.body.username;

    console.log(userId + ' ' + username);

    const result = readFile('data/user.json');

    console.log('result: ' + result);
    
    const newResult = [...result, {userId, username}];

    console.log(newResult);

    writeFile('data/user.json', newResult);

    return res.status(200).json({
        message: "Create user success"
    })
};

const deleteUser = (req, res) => {
    const deleteUser = Number(req.params.id);

    const result = readFile('data/user.json');

    const newResult = result.filter(item => item.userId !== deleteUser);

    writeFile('data/user.json', newResult);

    return res.status(200).json({
        message: "Delete user success"
    });
};

module.exports = {
    getUser,
    createUser,
    deleteUser,
    login
}