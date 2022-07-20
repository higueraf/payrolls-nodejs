const { Schema, model } = require('mongoose');

const ContractSchema = Schema({
    name: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    typeContract: {
        type: String,
    },
    position: {
        type: String,
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

ContractSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Contract', ContractSchema);
