import mongoose from "mongoose";

const numbersTemplate = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.mytable || mongoose.model("mytable", numbersTemplate);
