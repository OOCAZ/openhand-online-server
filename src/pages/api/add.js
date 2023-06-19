const numbersTemplateCopy = require("../../models/NumbersModels");
import mongoose from "mongoose";

export default async function handler(req, res) {
  const numbersInit = new numbersTemplateCopy({
    number: req.body.number,
  });
  numbersInit
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
}
