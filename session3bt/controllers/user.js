const fs = require('fs');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs'); // mã hoá password

const login = (req, res) => {
    const userName = req.body.username;
    const passwordUser = req.body.password;

    const result = readFile('data/user.json');

    const checkExitUser = result.find(item => item.username === userName);

    if (!checkExitUser) {
        return res.status(404).json({message: "Khong ton tai user"});
    }

    const checkPasswordUser = bcryptjs.compareSync(passwordUser, checkExitUser.password)

    if (!checkPasswordUser) {
        return res.status(400).json({message: "Sai mat khau"});
    }

    const token = jwt.sign({userId: checkExitUser.userId}, process.env.SECRET_KEY, {expiresIn:"1d"});

    const { password, ...returnUser } = checkExitUser;
    
    return res.status(200).json({message:"Dang nhap thanh cong", token, user: returnUser});

};

const getUser = (req, res) => {
    const result = readFile('data/user.json');
    return res.status(200).json({result}); 
};

const createUser = (req, res) => {
    const userId = req.body.userId;
    const username = req.body.username;
    const password = req.body.password;

    console.log(userId + ' ' + username + ' ' + password);

    const salt = bcryptjs.genSaltSync(); // quy định định dạng mã hoá
    const hash = bcryptjs.hashSync(password, salt); // mã hoá password

    const result = readFile('data/user.json');

    console.log('result: ' + result);
    
    const newResult = [...result, {userId, username, password: hash}];

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