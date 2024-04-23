const numbersTemplateCopy = require("../../models/NumbersModels");
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState) {
      console.log(req.body);
      const numbersInit = new numbersTemplateCopy({
        number: req.body.number,
      });
      numbersInit
        .save()
        .then((data) => {
          console.log("Number added");
          res.status(200).json(data);
        })
        .catch((err) => res.json(err));
    } else {
      console.log("Connection to database failed");
      res.status(200).send("Connection to database failed");
    }
  } catch (err) {
    console.log(err);
    res.status(200).send("Connection to database failed");
  }
}
