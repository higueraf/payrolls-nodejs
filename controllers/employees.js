const { response } = require('express');
const Employee = require('../models/employee');

const getEmployees = async (req, res = response) => {

    const employees = await Employee.find()
        .populate('user', 'first_name last_name img');
    res.json({
        ok: true,
        employees
    })
}

const getEmployeeById = async (req, res = response) => {

    const id = req.params.id;
    try {
        const employee = await Employee.findById(id)
            .populate('user', 'first_name last_name img');
        res.json({
            ok: true,
            employee
        })
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Unexpected error'
        })
    }
}

const createEmployee = async (req, res = response) => {

    const uid = req.uid;
    const employee = new Employee({
        user: uid,
        ...req.body
    });
    try {
        const employeeDB = await employee.save();
        res.json({
            ok: true,
            employee: employeeDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const updateEmployee = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                ok: true,
                msg: 'Employee not found by id',
            });
        }
        const cambiosEmployee = {
            ...req.body,
            user: uid
        }
        const employeeActualizado = await Employee.findByIdAndUpdate(id, cambiosEmployee, { new: true });
        res.json({
            ok: true,
            employee: employeeActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const deleteEmployee = async (req, res = response) => {

    const id = req.params.id;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                ok: true,
                msg: 'Employee not found by id',
            });
        }
        await Employee.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Record deleted'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
}
