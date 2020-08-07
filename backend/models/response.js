const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    survey: String,
    responses: Object
})

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;