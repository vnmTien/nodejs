const fs = require('fs');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs'); // mã hoá password
const userModel = require('../models/user.model');
const joi = require("joi");
const { signUpValidator, signInValidator } = require('../validations/user');

const login = async (req, res) => {
    const userName = req.body.username;
    const passwordUser = req.body.password;

    //const result = readFile('data/user.json');
    try {
        const validate = signInValidator.validate(req.body);

        if(validate.error) {
            return res.status(400).json({
                message: validate.error.message
            });
        }

        const checkExitUser = await userModel.findOne({
            username: userName
        });

        // console.log(checkExitUser);

        if (!checkExitUser) {
            return res.status(404).json({ message: "User is not exist" });
        }

        console.log(checkExitUser)

        const checkPasswordUser = bcryptjs.compareSync(passwordUser, checkExitUser.password)

        if (!checkPasswordUser) {
            return res.status(400).json({ message: "Password is wrong" });
        }

        const token = jwt.sign({_id: checkExitUser._id}, process.env.SECRET_KEY, { expiresIn: "1d" });

        // const { password, ...returnUser } = checkExitUser;

        checkExitUser.password = undefined;

        return res.status(200).json({ message: "Dang nhap thanh cong", token, user: checkExitUser});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "error"
        })
    }

};

const getUser = (req, res) => {
    const result = readFile('data/user.json');
    return res.status(200).json({ result });
};

const createUser = async (req, res) => {
    //const userId = req.body.userId;
    const username = req.body.username;
    const password = req.body.password;

    //console.log(userId + ' ' + username + ' ' + password);

    //const result = readFile('data/user.json');

    // console.log('result: ' + result);

    // const newResult = [...result, {userId, username, password: hash}];

    // console.log(newResult);

    // writeFile('data/user.json', newResult);

    // return res.status(200).json({
    //     message: "Create user success"
    // })

    try {
        const validate = signUpValidator.validate(req.body);

        if (validate.error) {
            return res.status(400).json({
                message: validate.error.message
            });
        }

        const checkExitUser = await userModel.findOne({
            username: username
        });

        if (checkExitUser) {
            return res.status(400).json({
                message: "User is exist"
            });
        }

        const salt = bcryptjs.genSaltSync(); // quy định định dạng mã hoá
        const hash = bcryptjs.hashSync(password, salt); // mã hoá password

        const user = new userModel({
            username: username,
            password: hash
        })

        const result = user.save();

        return res.status(200).json({
            message: "User created successfully",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "error"
        })
    }
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