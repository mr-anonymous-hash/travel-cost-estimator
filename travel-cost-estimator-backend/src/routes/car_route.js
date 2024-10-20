const router = require('express').Router()
const { CarRental } = require('./../models')


router.get('/', async (req, res) => {
    try {
      const cars = await CarRental.findAll();
      res.json({ success: true, data: cars });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

router.post('/', async(req, res)=>{
    const { pickupLocation,dailyRate,carModel, carType,insuranceRate } = req.body;
    const data = { pickupLocation,dailyRate,carModel, carType,insuranceRate }
    try{
      const car = CarRental.create(data)
      res.json({success:true, data:car})
    }catch(error){
      res.status(500).json({success:false, error:error.message})
    }
})

router.get('/rentals', async (req, res) => {
    const { pickupLocation, pickupDate, dropOffDate } = req.query;
    
    try {
      const carRentals = await CarRental.findAll({
        where: {
          pickupLocation,
          pickupDate,
          dropOffDate
        }
      });
      
      res.json({ success: true, data: carRentals });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  module.exports = router