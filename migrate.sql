-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: travel_cost
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `markupPercentage` decimal(5,2) DEFAULT '20.00',
  `additionalCosts` decimal(10,2) DEFAULT '0.00',
  `totalCost` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bookingStatus` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `paymentStatus` enum('unpaid','paid','refunded') DEFAULT 'unpaid',
  `bookingDate` datetime DEFAULT NULL,
  `specialRequests` text,
  `UserId` int DEFAULT NULL,
  `FlightId` int DEFAULT NULL,
  `CarRentalId` int DEFAULT NULL,
  `HotelId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `FlightId` (`FlightId`),
  KEY `CarRentalId` (`CarRentalId`),
  KEY `HotelId` (`HotelId`),
  CONSTRAINT `Bookings_ibfk_21` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Bookings_ibfk_22` FOREIGN KEY (`FlightId`) REFERENCES `Flights` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Bookings_ibfk_23` FOREIGN KEY (`CarRentalId`) REFERENCES `CarRentals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Bookings_ibfk_24` FOREIGN KEY (`HotelId`) REFERENCES `Hotels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookings`
--

LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarRentals`
--

DROP TABLE IF EXISTS `CarRentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarRentals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pickupLocation` varchar(255) NOT NULL,
  `pickupDate` datetime DEFAULT NULL,
  `dropOffDate` datetime DEFAULT NULL,
  `dailyRate` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `carModel` varchar(255) NOT NULL,
  `carType` enum('economy','compact','luxury','suv','van') NOT NULL,
  `available` tinyint(1) DEFAULT '1',
  `insuranceRate` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarRentals`
--

LOCK TABLES `CarRentals` WRITE;
/*!40000 ALTER TABLE `CarRentals` DISABLE KEYS */;
INSERT INTO `CarRentals` VALUES (1,'JFK Airport','2024-10-10 00:00:00','2024-10-15 00:00:00',59.99,'2024-10-20 19:17:37','2024-10-20 19:17:37','Toyota Corolla','compact',1,12.50),(2,'LAX Airport','2024-11-05 00:00:00','2024-11-10 00:00:00',99.99,'2024-10-20 19:17:37','2024-10-20 19:17:37','BMW X5','luxury',1,25.00),(3,'SFO Airport','2024-12-01 00:00:00','2024-12-05 00:00:00',79.99,'2024-10-20 19:17:37','2024-10-20 19:17:37','Ford Explorer','suv',1,18.00),(4,'test',NULL,NULL,2.00,'2024-10-20 18:44:45','2024-10-20 18:44:45','test','compact',1,0.20);
/*!40000 ALTER TABLE `CarRentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flights`
--

DROP TABLE IF EXISTS `Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departureAirport` varchar(255) NOT NULL,
  `arrivalAirport` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `carrier` varchar(255) NOT NULL,
  `basePrice` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `flightNumber` varchar(255) NOT NULL,
  `departureTime` time NOT NULL,
  `arrivalTime` time NOT NULL,
  `availableSeats` int NOT NULL DEFAULT '0',
  `class` enum('economy','business','first') NOT NULL DEFAULT 'economy',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flights`
--

LOCK TABLES `Flights` WRITE;
/*!40000 ALTER TABLE `Flights` DISABLE KEYS */;
INSERT INTO `Flights` VALUES (1,'JFK','LAX','2024-10-10 00:00:00','Delta',199.99,'2024-10-20 19:16:31','2024-10-20 19:16:31','DL123','10:30:00','14:00:00',50,'economy'),(2,'LAX','SFO','2024-11-12 00:00:00','United',99.99,'2024-10-20 19:16:31','2024-10-20 19:16:31','UA456','08:00:00','09:30:00',30,'business'),(3,'test','test','2024-10-21 00:00:00','Delta',80.00,'2024-10-20 17:49:14','2024-10-20 17:49:14','25','13:30:00','14:40:00',0,'economy');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hotels`
--

DROP TABLE IF EXISTS `Hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hotels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `checkInDate` datetime DEFAULT NULL,
  `checkOutDate` datetime DEFAULT NULL,
  `nightlyRate` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `hotelName` varchar(255) NOT NULL,
  `roomType` enum('single','double','suite','deluxe') NOT NULL,
  `address` varchar(255) NOT NULL,
  `amenities` json DEFAULT NULL,
  `availableRooms` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hotels`
--

LOCK TABLES `Hotels` WRITE;
/*!40000 ALTER TABLE `Hotels` DISABLE KEYS */;
INSERT INTO `Hotels` VALUES (1,'New York','2024-10-10 00:00:00','2024-10-15 00:00:00',150,'2024-10-20 19:17:54','2024-10-20 19:17:54','Hilton Midtown','suite','123 5th Ave, New York, NY','[\"Free Wi-Fi\", \"Pool\", \"Gym\"]',5),(2,'Los Angeles','2024-11-10 00:00:00','2024-11-15 00:00:00',120,'2024-10-20 19:17:54','2024-10-20 19:17:54','Sheraton LA','double','456 Sunset Blvd, Los Angeles, CA','[\"Free Wi-Fi\", \"Restaurant\"]',10),(3,'San Francisco','2024-12-01 00:00:00','2024-12-05 00:00:00',180,'2024-10-20 19:17:54','2024-10-20 19:17:54','Fairmont SF','deluxe','789 Market St, San Francisco, CA','[\"Free Wi-Fi\", \"Spa\", \"Parking\"]',3);
/*!40000 ALTER TABLE `Hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `phoneNumber` varchar(255) DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'john.doe@example.com','$2a$10$E7AfiUj3sdo3gkqh2qfWZOBmOlJBNv8FgD6/wJzW7Cv0RnSlP11GS','John','Doe','user','555-1234','2024-10-01 00:00:00','2024-10-20 19:18:53','2024-10-20 19:18:53'),(2,'jane.smith@example.com','$2a$10$KqG.YyYVkkxr1M0YyK9CwePO5sHmltiRPwQXzBHi8iA6FYrSZ4/2O','Jane','Smith','admin','555-5678','2024-10-05 00:00:00','2024-10-20 19:18:53','2024-10-20 19:18:53');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21  0:38:37
