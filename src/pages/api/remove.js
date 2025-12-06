import mongoose from "mongoose";
import numbersTemplateCopy from "../../models/NumbersModels.js";

export default async function handler(req, res) {
  const numbersInit = new numbersTemplateCopy({
    number: req.body.number,
  });
  if (!mongoose.connection.readyState) {
    //connection logic
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
    numbersInit.collection
      .deleteMany({ number: req.body.number })
      .then((data) => {
        console.log("Number removed");
        res.status(200).json(data);
      })
      .catch((err) => res.json(err));
  } else {
    numbersInit.collection
      .deleteMany({ number: req.body.number })
      .then((data) => {
        console.log("Number removed");
        res.status(200).json(data);
      })
      .catch((err) => res.json(err));
  }
}
