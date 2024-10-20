const router = require('express').Router()
const {Flight} = require('./../models');

const bookingController = require('./../controllers/booking_controller');
  
  router.post('/calculate-total', bookingController.calculateTotalCost);
  
  // Add flight search route

  router.get('/', async (req, res) => {

    try {
      const flights = await Flight.findAll();
      res.json({ success: true, data: flights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.post('/', async (req, res) => {
    const { departureAirport, arrivalAirport, date, carrier,basePrice,flightNumber, departureTime,arrivalTime } = req.body;
    const data = { departureAirport, arrivalAirport, date, carrier ,basePrice,flightNumber, departureTime,arrivalTime};
    try {
      const flights = await Flight.create(data);
  
      res.json({ success: true, data: flights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // router.get('/', async (req, res) => {
  //   const { departureAirport, arrivalAirport, date, carrier } = req.query;
    
  //   try {
  //     const flights = await Flight.findAll({
  //       where: {
  //         departureAirport,
  //         arrivalAirport,
  //         date,
  //         ...(carrier !== 'All' && { carrier })
  //       }
  //     });
      
  //     res.json({ success: true, data: flights });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: error.message });
  //   }
  // });

  module.exports = router