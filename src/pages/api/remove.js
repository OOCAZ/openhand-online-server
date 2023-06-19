const numbersTemplateCopy = require("../../models/NumbersModels");

export default async function handler(req, res) {
  const numbersInit = new numbersTemplateCopy({
    number: req.body.number,
  });
  numbersInit.collection
    .deleteMany({ number: req.body.number })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.json(err));
}
