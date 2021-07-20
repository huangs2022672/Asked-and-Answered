const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    body: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "questions"
    },
    solution: {
        type:Boolean,
        default: false
    }
  });

module.exports = Question = mongoose.model('Answer', AnswerSchema);