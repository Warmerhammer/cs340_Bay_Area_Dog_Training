-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_odonneri
-- ------------------------------------------------------
-- Server version	10.6.8-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `id_customer` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `number_of_dogs_enrolled` int(11) NOT NULL,
  PRIMARY KEY (`id_customer`),
  UNIQUE KEY `id_customer` (`id_customer`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Bob Xavier','xavier@123.com','555-555-5555',2),(2,'Britney Blaze','bblaze@test.com','123-456-7890',1),(3,'Tony Soprano','tonys@ygmail.com','373-122-3104',1);
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dog_Has_Training_Sessions`
--

DROP TABLE IF EXISTS `Dog_Has_Training_Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dog_Has_Training_Sessions` (
  `id_dog` int(11) NOT NULL,
  `id_training_session` int(11) NOT NULL,
  `customer_feedback` text DEFAULT NULL,
  PRIMARY KEY (`id_dog`,`id_training_session`),
  KEY `id_training_session` (`id_training_session`),
  CONSTRAINT `Dog_Has_Training_Sessions_ibfk_1` FOREIGN KEY (`id_dog`) REFERENCES `Dogs` (`id_dog`) ON DELETE CASCADE,
  CONSTRAINT `Dog_Has_Training_Sessions_ibfk_2` FOREIGN KEY (`id_training_session`) REFERENCES `Training_Sessions` (`id_training_session`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dog_Has_Training_Sessions`
--

LOCK TABLES `Dog_Has_Training_Sessions` WRITE;
/*!40000 ALTER TABLE `Dog_Has_Training_Sessions` DISABLE KEYS */;
INSERT INTO `Dog_Has_Training_Sessions` VALUES (1,1,'playmates were a little rambunctious'),(2,3,'twas fine'),(3,2,NULL);
/*!40000 ALTER TABLE `Dog_Has_Training_Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dogs`
--

DROP TABLE IF EXISTS `Dogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dogs` (
  `id_dog` int(11) NOT NULL AUTO_INCREMENT,
  `id_customer` int(11) NOT NULL,
  `fully_vaccinated` tinyint(1) NOT NULL DEFAULT 0,
  `temperament` varchar(255) DEFAULT NULL,
  `name` char(145) NOT NULL,
  `age` int(11) NOT NULL,
  `breed` char(145) DEFAULT NULL,
  PRIMARY KEY (`id_dog`),
  UNIQUE KEY `id_dog` (`id_dog`),
  KEY `id_customer` (`id_customer`),
  CONSTRAINT `Dogs_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `Customers` (`id_customer`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dogs`
--

LOCK TABLES `Dogs` WRITE;
/*!40000 ALTER TABLE `Dogs` DISABLE KEYS */;
INSERT INTO `Dogs` VALUES (1,2,1,'works well with others','Fluffy',2,'Pomeranian'),(2,3,1,'grumpy','Hana',12,'Beagle'),(3,1,1,'loves to be pet','Obi',6,'Golden Doodle'),(4,1,1,'peppy','Mighty',1,'Chihuahua');
/*!40000 ALTER TABLE `Dogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Packages`
--

DROP TABLE IF EXISTS `Packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Packages` (
  `id_package` int(11) NOT NULL,
  `id_session_type` varchar(255) NOT NULL,
  `package_sessions` varchar(255) NOT NULL,
  `sale_price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_package`),
  KEY `id_session_type` (`id_session_type`),
  CONSTRAINT `Packages_ibfk_1` FOREIGN KEY (`id_session_type`) REFERENCES `Session_Types` (`id_session_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Packages`
--

LOCK TABLES `Packages` WRITE;
/*!40000 ALTER TABLE `Packages` DISABLE KEYS */;
INSERT INTO `Packages` VALUES (1,'Group','1','10'),(2,'Puppy','1','11'),(3,'Single','1','12'),(4,'Group','5','47.5'),(5,'Puppy','5','52.25'),(6,'Single','5','57'),(7,'Group','10','90'),(8,'Puppy','10','89.1'),(9,'Single','10','108'),(10,'Group','15','142.5'),(11,'Puppy','15','127.5'),(12,'Single','15','140.25');
/*!40000 ALTER TABLE `Packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Purchases`
--

DROP TABLE IF EXISTS `Purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Purchases` (
  `id_purchase` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `id_customer` int(11) NOT NULL,
  `id_package` int(11) NOT NULL,
  PRIMARY KEY (`id_purchase`,`id_package`),
  UNIQUE KEY `id_purchase` (`id_purchase`),
  KEY `fk_Purchases_Customers1` (`id_customer`),
  KEY `fk_Purchases_Packages1` (`id_package`),
  CONSTRAINT `fk_Purchases_Customers1` FOREIGN KEY (`id_customer`) REFERENCES `Customers` (`id_customer`) ON DELETE SET NULL,
  CONSTRAINT `fk_Purchases_Packages1` FOREIGN KEY (`id_package`) REFERENCES `Packages` (`id_package`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Purchases`
--

LOCK TABLES `Purchases` WRITE;
/*!40000 ALTER TABLE `Purchases` DISABLE KEYS */;
INSERT INTO `Purchases` VALUES (1,3,3,1),(2,1,1,4),(3,1,2,10);
/*!40000 ALTER TABLE `Purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session_Types`
--

DROP TABLE IF EXISTS `Session_Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Session_Types` (
  `id_session_type` varchar(7) NOT NULL,
  `max_capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_session_type`),
  UNIQUE KEY `id_session_type` (`id_session_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session_Types`
--

LOCK TABLES `Session_Types` WRITE;
/*!40000 ALTER TABLE `Session_Types` DISABLE KEYS */;
INSERT INTO `Session_Types` VALUES ('GROUP',15),('PRIVATE',1),('PUPPY',10);
/*!40000 ALTER TABLE `Session_Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trainer_Has_Training_Sessions`
--

DROP TABLE IF EXISTS `Trainer_Has_Training_Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Trainer_Has_Training_Sessions` (
  `id_trainer` int(11) NOT NULL,
  `id_training_session` int(11) NOT NULL,
  PRIMARY KEY (`id_trainer`,`id_training_session`),
  KEY `id_training_session` (`id_training_session`),
  CONSTRAINT `Trainer_Has_Training_Sessions_ibfk_1` FOREIGN KEY (`id_trainer`) REFERENCES `Trainers` (`id_trainer`) ON DELETE CASCADE,
  CONSTRAINT `Trainer_Has_Training_Sessions_ibfk_2` FOREIGN KEY (`id_training_session`) REFERENCES `Training_Sessions` (`id_training_session`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trainer_Has_Training_Sessions`
--

LOCK TABLES `Trainer_Has_Training_Sessions` WRITE;
/*!40000 ALTER TABLE `Trainer_Has_Training_Sessions` DISABLE KEYS */;
INSERT INTO `Trainer_Has_Training_Sessions` VALUES (1,2),(1,3),(3,1);
/*!40000 ALTER TABLE `Trainer_Has_Training_Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trainers`
--

DROP TABLE IF EXISTS `Trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Trainers` (
  `id_trainer` int(11) NOT NULL AUTO_INCREMENT,
  `wages` decimal(19,2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `number_of_sessions_taught` int(11) DEFAULT 0,
  `start_date` date NOT NULL,
  `preferred_schedule` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_trainer`),
  UNIQUE KEY `id_trainer` (`id_trainer`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trainers`
--

LOCK TABLES `Trainers` WRITE;
/*!40000 ALTER TABLE `Trainers` DISABLE KEYS */;
INSERT INTO `Trainers` VALUES (1,25.50,'Jessi Smith','smith@badtraining.com',NULL,200,'2003-12-01','M, T, W, T, F'),(2,32.50,'Lazy Suzan','lsuzan@badtraining.com',NULL,1,'2021-05-06',NULL),(3,45.00,'Peter Gibbons','pgibbons@badtraining.com',NULL,30,'2022-01-04','Sundays');
/*!40000 ALTER TABLE `Trainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Training_Sessions`
--

DROP TABLE IF EXISTS `Training_Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Training_Sessions` (
  `id_training_session` int(11) NOT NULL AUTO_INCREMENT,
  `date_scheduled` datetime NOT NULL,
  `id_session_type` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id_training_session`),
  UNIQUE KEY `id_training_session` (`id_training_session`),
  KEY `id_session_type` (`id_session_type`),
  CONSTRAINT `Training_Sessions_ibfk_1` FOREIGN KEY (`id_session_type`) REFERENCES `Session_Types` (`id_session_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Training_Sessions`
--

LOCK TABLES `Training_Sessions` WRITE;
/*!40000 ALTER TABLE `Training_Sessions` DISABLE KEYS */;
INSERT INTO `Training_Sessions` VALUES (1,'2022-07-10 15:00:00','PUPPY'),(2,'2022-07-13 20:00:00','GROUP'),(3,'2022-07-15 20:00:00','GROUP');
/*!40000 ALTER TABLE `Training_Sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-11 23:53:11
