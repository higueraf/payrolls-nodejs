const { Schema, model } = require('mongoose');

const EmployeeSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    address: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EmployeeSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Employee', EmployeeSchema);
