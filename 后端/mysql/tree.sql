-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tree
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachment` (
  `id` int NOT NULL,
  `post_id` int DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachment`
--

LOCK TABLES `attachment` WRITE;
/*!40000 ALTER TABLE `attachment` DISABLE KEYS */;
INSERT INTO `attachment` VALUES (1,1,'http://tmp/tkWjf2VDTlZ425bebdaf11c751c246cad7e82f9f1183.jpg'),(2,1,'http://tmp/RGBYWTkd0Rtr90031e91cb5d5195a38bc32515d4c01a.jpg'),(3,1,'http://tmp/CsYdGczws3jk745de6073b29e851726b3ef53d6fe27d.jpg'),(4,1,'http://tmp/Xre6j3YGLbsq4899f1e8acfd154a91ef34b025211707.jpg'),(5,1,'http://tmp/tFbMsDPNJkRP961130081a09ef1f27bf6b61e95866e6.jpg'),(6,1,'http://tmp/g3A9UBlvWzuUb2f62f2187c904ffcaed90ba342f984d.jpg'),(7,2,'http://tmp/oWQxwcoRfjei25bebdaf11c751c246cad7e82f9f1183.jpg'),(8,2,'http://tmp/O2PVGeOEAzRC90031e91cb5d5195a38bc32515d4c01a.jpg'),(9,2,'http://tmp/jFuu2CN2IjaZ745de6073b29e851726b3ef53d6fe27d.jpg'),(10,2,'http://tmp/yek2LZmBoZEs4899f1e8acfd154a91ef34b025211707.jpg'),(11,2,'http://tmp/5rlNJfFfXotD961130081a09ef1f27bf6b61e95866e6.jpg'),(12,2,'http://tmp/iHU9QGZlqf2lb2f62f2187c904ffcaed90ba342f984d.jpg'),(13,3,'http://tmp/7xnyLAckeDZp745de6073b29e851726b3ef53d6fe27d.jpg'),(14,3,'http://tmp/2cAKDvUHPz3h959a9a2dc01f00e16e6c42549ec7cb48.jpg'),(15,3,'http://tmp/hwSGbAn2S2CQb2f62f2187c904ffcaed90ba342f984d.jpg'),(16,3,'http://tmp/32uAHZxOrQsJb5ee4031b742a8b84a7e81574f79681b.jpg'),(17,4,'http://tmp/N0RN3KIv6MLw2531cb62c34c9b5b2577ab835fa94418.jpg'),(18,4,'http://tmp/QuqpA9rVrEkb4899f1e8acfd154a91ef34b025211707.jpg'),(19,4,'http://tmp/7z1mVZbbojN9961130081a09ef1f27bf6b61e95866e6.jpg'),(20,4,'http://tmp/OXJ34j2usGcHb2f62f2187c904ffcaed90ba342f984d.jpg'),(21,4,'http://tmp/8wFfdtsy7wtjd765a9fef5840f9afc450edbf4050fd2.jpg'),(22,4,'http://tmp/VS2rojlbqbDde7e3f2f29df830e57e47ad8e9fa26467.jpg'),(23,4,'http://tmp/96W6sRR04Y61f5e45034ff1170f885a0b44f0175d15c.jpg'),(24,5,'http://tmp/1HHEAHwvbRWM90031e91cb5d5195a38bc32515d4c01a.jpg'),(25,5,'http://tmp/a1oKKJLNsf9U745de6073b29e851726b3ef53d6fe27d.jpg'),(26,5,'http://tmp/YsuQbcPDexsX959a9a2dc01f00e16e6c42549ec7cb48.jpg'),(27,6,'http://tmp/xGC7ccl58mPm745de6073b29e851726b3ef53d6fe27d.jpg'),(28,6,'http://tmp/j8jiGscIvZMJ959a9a2dc01f00e16e6c42549ec7cb48.jpg'),(29,6,'http://tmp/lS09Mf3uktIIb2f62f2187c904ffcaed90ba342f984d.jpg'),(30,6,'http://tmp/Jm3YMzlFfIR6b5ee4031b742a8b84a7e81574f79681b.jpg'),(31,3,'http://tmp/LBBVEdrnrly79fc21bc955de6ee51a5fd31173aa0faa.jpg'),(32,3,'http://tmp/tJmgpmDxU23q25bebdaf11c751c246cad7e82f9f1183.jpg'),(33,3,'http://tmp/bXepohsQ6jRy90031e91cb5d5195a38bc32515d4c01a.jpg'),(34,3,'http://tmp/IPeiB4IHaxgB2531cb62c34c9b5b2577ab835fa94418.jpg'),(35,3,'http://tmp/35ynONrM9GvA4899f1e8acfd154a91ef34b025211707.jpg'),(36,3,'http://tmp/bw6ze16TPfjC961130081a09ef1f27bf6b61e95866e6.jpg');
/*!40000 ALTER TABLE `attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `commenter_id` int DEFAULT NULL,
  `ref_comment_id` int DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `commenter_id` (`commenter_id`),
  KEY `ref_comment_id` (`ref_comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,2,NULL,'我'),(2,1,2,NULL,'我不喜欢'),(3,1,2,NULL,'我'),(4,1,2,NULL,'你'),(5,1,2,NULL,'你\n'),(6,1,1,NULL,'好的');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `content` text,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,2,'我成功了','2024-05-12'),(2,1,'第二个我','2024-05-12'),(3,2,'不想敲代码','2024-05-14');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `praise`
--

DROP TABLE IF EXISTS `praise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `praise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `praise`
--

LOCK TABLES `praise` WRITE;
/*!40000 ALTER TABLE `praise` DISABLE KEYS */;
INSERT INTO `praise` VALUES (14,2,2),(15,3,2),(16,1,2),(17,3,1);
/*!40000 ALTER TABLE `praise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `last_login` date DEFAULT NULL,
  `login_days` int DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Liu','http://tmp/ht62PnZ6otbMae6512d78fed3ae205e0e2df4807d8fa.jpeg','2024-05-21',6,'2022211369','12791389113'),(2,'Lin','http://tmp/bwqiAEap1Q4S0822c795dbcbb314a85dbacdb33a9cd8.jpeg','2024-05-21',11,'2022211369','18965595389'),(3,'wang','http://tmp/YIVy7YCzAY43ff1839c29c7f2a6c1af4ca734bcc29bd.jpeg','2024-05-07',1,'2022211','18965595389');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrelation`
--

DROP TABLE IF EXISTS `userrelation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrelation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `relation_type` varchar(255) DEFAULT NULL,
  `related_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrelation`
--

LOCK TABLES `userrelation` WRITE;
/*!40000 ALTER TABLE `userrelation` DISABLE KEYS */;
INSERT INTO `userrelation` VALUES (15,1,'FOLLOW',2),(16,2,'BE_FOLLOWED',1),(33,2,'FOLLOW',2),(34,2,'BE_FOLLOWED',2);
/*!40000 ALTER TABLE `userrelation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-21 21:12:37
