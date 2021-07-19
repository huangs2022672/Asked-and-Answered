const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    assign_to: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    resolved: {
        type: boolean,
        required: true
    }
  })

module.exports = Question = mongoose.model('Question', QuestionSchema);
