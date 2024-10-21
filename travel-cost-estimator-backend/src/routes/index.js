const router = require('express').Router();
const {Flight} = require('./../models');
const { CarRental } = require('./../models')
const {Hotel} =  require('./../models');


const auth_route = require('./auth_route')
const flight_route = require('./flight_route');
const car_route = require('./car_route');
const hotel_route = require('./hotel_route');

router.use('/flight', flight_route);
router.use('/', auth_route)
router.use('/cars', car_route);
router.use('/hotels', hotel_route);
router.get('/stats/', async (req, res) => {
    const flight_count = await Flight.count();
    const car_count = await CarRental.count();
    const hotel_count = await Hotel.count();
    res.json({
        flight_count,
        car_count,
        hotel_count
    })
})

module.exports = router;
