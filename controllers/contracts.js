const { response } = require('express');
const Contract = require('../models/contract');

const getContracts = async (req, res = response) => {

    const contracts = await Contract.find()
        .populate('user', 'first_name last_name img');
    res.json({
        ok: true,
        contracts
    })
}

const getContractById = async (req, res = response) => {

    const id = req.params.id;
    try {
        const contract = await Contract.findById(id)
            .populate('user', 'first_name last_name img');
        res.json({
            ok: true,
            contract
        })
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Unexpected error'
        })
    }
}

const createContract = async (req, res = response) => {

    const uid = req.uid;
    const contract = new Contract({
        user: uid,
        ...req.body
    });
    try {
        const contractDB = await contract.save();
        res.json({
            ok: true,
            contract: contractDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const updateContract = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            return res.status(404).json({
                ok: true,
                msg: 'Contract not found by id',
            });
        }
        const cambiosContract = {
            ...req.body,
            user: uid
        }
        const contractActualizado = await Contract.findByIdAndUpdate(id, cambiosContract, { new: true });
        res.json({
            ok: true,
            contract: contractActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const deleteContract = async (req, res = response) => {

    const id = req.params.id;
    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            return res.status(404).json({
                ok: true,
                msg: 'Contract not found by id',
            });
        }
        await Contract.findByIdAndDelete(id);
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
    getContracts,
    createContract,
    updateContract,
    deleteContract,
    getContractById
}
