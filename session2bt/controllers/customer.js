const fs = require('fs');
const readFile  = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const getCustomer = (req, res) => {
    const result = readFile('data/customer.json');

    return res.status(200).json({result});
};

const createCustomer = (req, res) => {
    const customerId = req.body.customerId;
    const customerUser = req.body.customerUser;

    const result = readFile('data/customer.json');

    const newData = [...result, {customerId, customerUser}];

    writeFile('data/customer.json', newData);

    return res.status(200).json({
        message: "Create Customer successs"
    });
};

const deleteCustomer = (req, res) => {
    const deleteCustomer = Number(req.params.id);

    const result = readFile('data/deleteCustomer.json');

    const newResult = result.filter(item => item.customerId !== deleteCustomer);

    writeFile('data/deleteCustomer.json', newResult);

    return res.status(200).json({
        message: "Delete Customer success"
    });

};

module.exports = {
    getCustomer,
    createCustomer,
    deleteCustomer,
}