var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    name: String,
    gender: String,
    date: String,
    parent: Array,
    country: String,
    scores: Array,
    username: String,
    password: String
});

var Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;