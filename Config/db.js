const mongoose = require('mongoose')
const db = async () => {
    try {
        await mongoose.connect('mongodb+srv://kalpeshrnw:ERkbgSDbX3MTvcnD@cluster0.uidiwwz.mongodb.net/JWTRollBased')
        console.log("Database Connected...")

    } catch (err) {
        console.error(err.message)
    }
}
module.exports = db 