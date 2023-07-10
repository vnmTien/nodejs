const readFile = require('../utils/readFile');
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    //Nếu như người dùng đã đăng nhập thì mới sử dụng được
    const bearToken = req.headers.authorization; // token có dạng: bear + token

    if(!bearToken) {
        console.log('bearToken: ' + bearToken);
        return res.status(401).json({ message: "Ban chua dang nhap"});
    }
    const token = bearToken.split(' ')[1];

    const verify_token = jwt.verify(token, process.env.SECRET_KEY);

    if(!verify_token) {
        return res.status(401).json({ message: "Ban chua dang nhap"});
    }

    const userId = verify_token.userId;
    console.log(userId);
    const result = readFile('data/user.json');
    //const userId = Number(req.query.userId);

    const checkUser = result.find(item => item.userId == userId);

    if(checkUser){
        next();
    }

    return res.status(401).json({message: "Bạn chưa đăng nhập"});
};

module.exports = authentication;