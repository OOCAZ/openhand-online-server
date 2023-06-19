const numbersTemplateCopy = require("../../models/NumbersModels");
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    const numbersInit = new numbersTemplateCopy({
      number: req.body.number,
    });
    numbersInit
      .save()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.json(err));
  } catch (err) {
    console.log(err);
  }
}
