const { Schema, model } = require('mongoose');

const RollSchema = Schema({
    payroll: {
        type: Schema.Types.ObjectId,
        ref: 'Payroll',
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

RollSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Roll', RollSchema);
