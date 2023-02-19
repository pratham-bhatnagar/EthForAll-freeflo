const express = require("express");
const Model = require("../models/model");

const router = express.Router();

router.post("/post", async (req, res) => {
  const data = new Model({
    id: req.body.id,
    price: req.body.price,
    orderPlacedTime: req.body.price,
    estimateTimeOfDelivery: req.body.estimateTimeOfDelivery,
    OrderedBy: req.body.OrderedBy,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deliverd',async(req,res)=>{
  try{
   const data = await Model.deleteOne({OrderedBy:req.body.OrderedBy});
   res.json(data)
  }catch(err){
    console.log(err)
  }
})

module.exports = router;
