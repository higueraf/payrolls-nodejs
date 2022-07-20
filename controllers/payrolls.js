const { response } = require('express');
const Payroll = require('../models/payroll');


const getPayrolls = async(req, res = response) => {

    const payrolls = await Payroll.find().populate('user','first_name last_name img')
    res.json({
        ok: true,
        payrolls
    })

}

const createPayroll = async(req, res = response) => {

    const uid = req.uid;
    const payroll = new Payroll({ 
        user: uid,
        ...req.body 
    });
    try { 
        const payrollDB = await payroll.save();
        res.json({
            ok: true,
            payroll: payrollDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const updatePayroll = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;
    try {
        const payroll = await Payroll.findById( id );
        if ( !payroll ) {
            return res.status(404).json({
                ok: true,
                msg: 'Payroll not found by id',
            });
        }
        const cambiosPayroll = {
            ...req.body,
            user: uid
        }
        const payrollActualizado = await Payroll.findByIdAndUpdate( id, cambiosPayroll, { new: true } );
        res.json({
            ok: true,
            payroll: payrollActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const deletePayroll = async(req, res = response) => {

    const id  = req.params.id;
    try {
        const payroll = await Payroll.findById( id );
        if ( !payroll ) {
            return res.status(404).json({
                ok: true,
                msg: 'Payroll not found by id',
            });
        }
        await Payroll.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Payroll deleted'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

module.exports = {
    getPayrolls,
    createPayroll,
    updatePayroll,
    deletePayroll
}