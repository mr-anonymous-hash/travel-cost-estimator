const router = require('express').Router(); 
const {Hotel} =  require('./../models');


router.get('/', async (req, res) => {
    try {
      const hotels = await Hotel.findAll();
      res.json({ success: true, data: hotels });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });


  // router.post('/', async (req, res) => {
  //   const { name, city, checkInDate, checkOutDate } = req.body;

  //   try {
  //     const hotel = await Hotel.create({ name, city, checkInDate, checkOutDate });
  //     res.status(201).json({ success: true, data: hotel });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: error.message });
  //   }
  // });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const hotel = await Hotel.findByPk(id);
  
      if (!hotel) {
        return res.status(404).json({ success: false, error: 'Hotel not found' });
      }
  
      res.json({ success: true, data: hotel });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }); 

  router.post('/', async(req,res) => {
    const { city, nightlyRate,hotelName,roomType,address,amenities,availableRooms} = req.body;
    const  data = { city, nightlyRate,hotelName,roomType,address,amenities,availableRooms};
    console.log(data)
    try {
        const hotel = await Hotel.create(data);
        res.status(201).json({success: true, data: hotel});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});

// router.get('/', async (req, res) => {
//     const { city, checkInDate, checkOutDate } = req.query;
    
//     try {
//       const hotels = await Hotel.findAll({
//         where: {
//           city,
//           checkInDate,
//           checkOutDate
//         }
//       });
      
//       res.json({ success: true, data: hotels });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   });

  module.exports = router;