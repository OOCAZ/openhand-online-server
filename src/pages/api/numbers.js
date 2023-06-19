const numbersTemplateCopy = require("../../models/NumbersModels");
import mongoose from "mongoose";

export default async function handler(req, res) {
  const numbers = await numbersTemplateCopy.find();
  res.send(numbers);
}
