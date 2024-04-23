import mongoose from "mongoose";

const numbersTemplateCopy = require("../../models/NumbersModels");

export default async function handler(req, res) {
  const numbersInit = new numbersTemplateCopy({
    number: req.body.number,
  });
  if (mongoose.connection.readyState) {
    numbersInit.collection
      .deleteMany({ number: req.body.number })
      .then((data) => {
        console.log("Number removed");
        res.status(200).json(data);
      })
      .catch((err) => res.json(err));
  } else {
    console.log("Connection to database failed");
    res.status(200).send("Connection to database failed");
  }
}
