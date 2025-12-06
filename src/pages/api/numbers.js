import mongoose from "mongoose";
import numbersTemplateCopy from "../../models/NumbersModels.js";

export default async function handler(req, res) {
  try {
    if (!mongoose.connection.readyState) {
      const session = await mongoose
        .connect(process.env.DATABASE_ACCESS)
        .then(async function (models) {
          let numbers = mongoose.model("mytable");
          const numbers2 = await numbers.find();
          res.status(200).send(numbers2);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      let numbers = mongoose.model("mytable");
      const numbers2 = await numbers.find();
      res.status(200).send(numbers2);
    }
  } catch (err) {
    console.log(err);
    res.status(200).send("Connection to database failed");
  }
}
