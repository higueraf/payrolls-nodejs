const User = require('../models/user');
const fs = require('fs');

const Employee = require('../models/employee');
const Payroll = require('../models/payroll');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}


const updateImage = async (tipo, id, fileName) => {

    let oldPath = '';

    switch (tipo) {
        case 'employees':
            const employee = await Employee.findById(id);
            if (!employee) {
                return false;
            }
            oldPath = `./uploads/employees/${employee.img}`;
            deleteImage(oldPath);
            employee.img = fileName;
            await employee.save();
            return true;

        case 'payrolls':
            const payroll = await Payroll.findById(id);
            if (!payroll) {
                return false;
            }
            oldPath = `./uploads/payrolls/${payroll.img}`;
            deleteImage(oldPath);
            payroll.img = fileName;
            await payroll.save();
            return true;

        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return false;
            }
            oldPath = `./uploads/payrolls/${user.img}`;
            deleteImage(oldPath);
            user.img = fileName;
            await user.save();
            return true;
    }
}

module.exports = { updateImage };
