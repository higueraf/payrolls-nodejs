const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Database Online');
    } catch (error) {
        throw new Error('Error Database Connection');
    }
}

module.exports = {
    dbConnection
}