const sequelize = require('./database');
const DataTypes = require('sequelize');
const bcrypt = require('bcryptjs');

// User Model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Enhanced Flight Model
const Flight = sequelize.define('Flight', {
  departureAirport: {
    type: DataTypes.STRING,
    allowNull: false
  },
  arrivalAirport: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  carrier: {
    type: DataTypes.STRING,
    allowNull: false
  },
  basePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Added fields
  flightNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departureTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  arrivalTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  class: {
    type: DataTypes.ENUM('economy', 'business', 'first'),
    allowNull: false,
    defaultValue: 'economy'
  }
});

// Enhanced CarRental Model
const CarRental = sequelize.define('CarRental', {
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pickupDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dropOffDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dailyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Added fields
  carModel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carType: {
    type: DataTypes.ENUM('economy', 'compact', 'luxury', 'suv', 'van'),
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  insuranceRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
});

// Enhanced Hotel Model
const Hotel = sequelize.define('Hotel', {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nightlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Added fields
  hotelName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomType: {
    type: DataTypes.ENUM('single', 'double', 'suite', 'deluxe'),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amenities: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  availableRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// Enhanced Booking Model
const Booking = sequelize.define('Booking', {
  markupPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 20.00
  },
  additionalCosts: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  totalCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Added fields
  bookingStatus: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
    defaultValue: 'unpaid'
  },
  bookingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  specialRequests: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Define relationships
User.hasMany(Booking);
Booking.belongsTo(User);

Booking.belongsTo(Flight);
Booking.belongsTo(CarRental);
Booking.belongsTo(Hotel);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Unable to synchronize the database:', err);
  });

// Add method to validate password
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = {
  User,
  Flight,
  CarRental,
  Hotel,
  Booking
};