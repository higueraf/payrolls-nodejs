const { response } = require('express');

const User = require('../models/user');
const Employee = require('../models/employee');
const Payroll = require('../models/payroll');


const getAll = async (req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    const [users, employees, payrolls] = await Promise.all([
        User.find({ first_name: regex }),
        Employee.find({ first_name: regex }),
        Payroll.find({ first_name: regex }),
    ]);

    res.json({
        ok: true,
        users,
        employees,
        payrolls
    })

}

const getDocumentsColletion = async (req, res = response) => {

    const collection = req.params.collection;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    let data = [];

    switch (collection) {
        case 'employees':
            data = await Employee.find({ first_name: regex })
                .populate('user', 'first_name last_name img')
            break;
        case 'payrolls':
            data = await Payroll.find({ name: regex })
                .populate('user', 'first_name last_name img');
            break;
        case 'users':
            data = await User.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Collection must be users/employees/payrolls'
            });
    }
    res.json({
        ok: true,
        resultados: data
    })

}

module.exports = {
    getAll,
    getDocumentsColletion
}