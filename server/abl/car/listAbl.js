const { mergeEvaluated } = require("ajv/dist/compile/util.js");
const carDao = require("../../dao/car-dao.js");

async function ListAbl(req, res) {
  try {
    const carList = carDao.list();

    if(carList.length === 0){
      return res.json({
        code: "carNotFound",
        message: "V databázy se nenachází žádné auto."
    });
    }
    
    res.status(200).json(carList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;