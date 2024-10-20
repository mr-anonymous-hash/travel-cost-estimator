const calculateTotalCost = async (req, res) => {
    try {
      const { flightId, carRentalId, hotelId, markupPercentage = 20, additionalCosts = 0 } = req.body;
      
      let totalBaseCost = 0;
      
      if (flightId) {
        const flight = await Flight.findByPk(flightId);
        totalBaseCost += parseFloat(flight.basePrice);
      }
      
      if (carRentalId) {
        const carRental = await CarRental.findByPk(carRentalId);
        const days = Math.ceil((new Date(carRental.dropOffDate) - new Date(carRental.pickupDate)) / (1000 * 60 * 60 * 24));
        totalBaseCost += parseFloat(carRental.dailyRate) * days;
      }
      
      if (hotelId) {
        const hotel = await Hotel.findByPk(hotelId);
        const nights = Math.ceil((new Date(hotel.checkOutDate) - new Date(hotel.checkInDate)) / (1000 * 60 * 60 * 24));
        totalBaseCost += parseFloat(hotel.nightlyRate) * nights;
      }
      
      const markup = (totalBaseCost * markupPercentage) / 100;
      const totalCost = totalBaseCost + markup + parseFloat(additionalCosts);
      
      const booking = await Booking.create({
        markupPercentage,
        additionalCosts,
        totalCost
      });
      
      res.json({
        success: true,
        data: {
          baseCost: totalBaseCost,
          markup,
          additionalCosts,
          totalCost,
          bookingId: booking.id
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  module.exports = {
    calculateTotalCost
  }