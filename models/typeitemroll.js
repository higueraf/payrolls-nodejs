const { Schema, model } = require('mongoose');

const TypeItemRollSchema = Schema({
    description: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

TypeItemRollSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('TypeItemRoll', TypeItemRollSchema);
