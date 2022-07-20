const { response } = require('express');
const Roll = require('../models/roll');

const getRolls = async (req, res = response) => {

    const rolls = await Roll.find()
        .populate('user', 'first_name last_name img')
        .populate('employee', 'fist_name last_name img')
    res.json({
        ok: true,
        rolls
    })
}

const getRollById = async (req, res = response) => {

    const id = req.params.id;
    try {
        const roll = await Roll.findById(id)
            .populate('user', 'first_name last_name img')
            .populate('employee', 'first_name last_name img');
        res.json({
            ok: true,
            roll
        })
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Unexpected error'
        })
    }
}

const createRoll = async (req, res = response) => {

    const uid = req.uid;
    const roll = new Roll({
        user: uid,
        ...req.body
    });
    try {
        const rollDB = await roll.save();
        res.json({
            ok: true,
            roll: rollDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const updateRoll = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const roll = await Roll.findById(id);
        if (!roll) {
            return res.status(404).json({
                ok: true,
                msg: 'Roll not found by id',
            });
        }
        const cambiosRoll = {
            ...req.body,
            user: uid
        }
        const rollUpdated = await Roll.findByIdAndUpdate(id, cambiosRoll, { new: true });
        res.json({
            ok: true,
            roll: rollUpdated
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const deleteRoll = async (req, res = response) => {

    const id = req.params.id;
    try {
        const roll = await Roll.findById(id);
        if (!roll) {
            return res.status(404).json({
                ok: true,
                msg: 'Roll not found by id',
            });
        }
        await Roll.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Roll deleted'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

module.exports = {
    getRolls,
    createRoll,
    updateRoll,
    deleteRoll,
    getRollById
}
