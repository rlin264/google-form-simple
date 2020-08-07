const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
    name: {type: String, required: true},
    questions: [Object]
})

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;