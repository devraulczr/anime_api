CREATE DATABASE  IF NOT EXISTS `animeflix` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `animeflix`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: animeflix
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `animes`
--

DROP TABLE IF EXISTS `animes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `category` varchar(255) DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animes`
--

LOCK TABLES `animes` WRITE;
/*!40000 ALTER TABLE `animes` DISABLE KEYS */;
INSERT INTO `animes` VALUES (1,'Wind Breaker','https://m.media-amazon.com/images/M/MV5BOGE2NzkwNTctMGUzMS00ZDZiLWI4MTMtZmY1YjhjMjFlNjE3XkEyXkFqcGc@._V1_.jpg',1,'Ação',172),(2,'Dandadan','https://i.pinimg.com/736x/e0/50/07/e05007087720c59b32490afc98ce81f2.jpg',1,'Ação, Fantasia',27),(3,'Tokyo Revangers','https://goyabu.to/wp-content/uploads/2023/03/Tokyo-Revengers-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Drama',23),(4,'Kimetsu no Yaba','https://goyabu.to/wp-content/uploads/2023/04/Kimetsu-no-Yaiba-goyabu.to_.jpg',1,'Ação, Sobrenatural',0),(5,'Ijiranaide','https://goyabu.to/wp-content/uploads/2023/04/Ijiranaide-Nagatoro-san-goyabu.to_.jpg',1,'Comédia, Romance',0),(6,'Black Clover','https://goyabu.to/wp-content/uploads/2023/04/Black-Clover-Todos-os-Episodios-Online-goyabu.to_.jpg',1,'Ação, Magia',999),(7,'Nanatsu Taizai','https://goyabu.to/wp-content/uploads/2023/08/Nanatsu-no-Taizai-Kamigami-no-Gekirin-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Fantasia',1),(8,'Solo Leveling','https://goyabu.to/wp-content/uploads/2024/01/Solo-Leveling-Dublado-Todos-os-Episodios-Online-Goyaby.jpg',1,'Ação, Fantasia',1),(9,'Kaijuu 8-gou','https://goyabu.to/wp-content/uploads/2024/04/Kaijuu-8-gou-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Fantasia',0),(10,'Saerei Gensouki','https://goyabu.to/wp-content/uploads/2023/08/Seirei-Gensouki-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Fantasia',7),(11,'Jojo\'s Bizarre Adventure','https://goyabu.to/wp-content/uploads/2023/08/JoJos-Bizarre-Adventure-Dublado.jpg',1,'Ação, Aventura',0),(12,'Blue lock','https://goyabu.to/wp-content/uploads/2023/07/Blue-Lock-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Esporte',0),(13,'Death note','https://goyabu.to/wp-content/uploads/2023/04/death-note-todos-os-episodios-online-goyabu.jpg',1,'Psicológico, Mistério',0),(14,'Mashle','https://goyabu.to/wp-content/uploads/2023/07/Mashle-Magic-and-Muscles-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Comédia',1),(15,'Spy x Family','https://goyabu.to/wp-content/uploads/2023/08/SPY-×-FAMILY-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Comédia, Aventura',0),(16,'Shingeki no Kyojin','https://goyabu.to/wp-content/uploads/2023/03/shingeki-no-kyojin-todos-os-episodios-min.png',1,'Ação, Drama, Guerra',0),(17,'Naruto Clássico','https://goyabu.to/wp-content/uploads/2023/08/naruto-classico-dublado-todos-os-episodios-goyabu.jpg',1,'Ação, Aventura',2),(18,'Naruto Shippuden','https://goyabu.to/wp-content/uploads/2023/08/Naruto-Shippuden-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Aventura',1),(19,'Dragon Ball','https://goyabu.to/wp-content/uploads/2023/04/Dragon-Ball-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Aventura',1),(20,'Dragon Ball Z','https://goyabu.to/wp-content/uploads/2023/04/Dragon-Ball-Z-Dublado-Todos-os-Episodios.jpg',1,'Ação, Aventura',1),(21,'Dragon Ball Super','https://goyabu.to/wp-content/uploads/2023/04/Dragon-Ball-Super-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Aventura',2),(22,'Dragon Ball GT','https://goyabu.to/wp-content/uploads/2023/04/Dragon-Ball-GT-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Aventura',1),(23,'Dragon Ball Kai','https://goyabu.to/wp-content/uploads/2023/05/dragon-ball-kai-dublado-todos-os-episodios-online-goyabu.jpg',1,'Ação, Aventura',1),(24,'Sakamoto Days','https://goyabu.to/wp-content/uploads/2025/01/Sakamoto-Days-Todos-os-Episodios-Online-Goyabu.jpg',1,'Comédia, Ação',2),(25,'Chainsaw Man','https://goyabu.to/wp-content/uploads/2023/07/Chainsaw-Man-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Fantasia',0),(26,'One Piece','https://goyabu.to/wp-content/uploads/2023/08/One-Piece-Dublado-Todos-os-Episodios.jpg',1,'Ação, Aventura',8),(27,'Tonikaku Kawaii','https://goyabu.to/wp-content/uploads/2023/08/Tonikaku-Kawaii-Dublado-Todos-os-Epsiodios-Online-Goyabu.jpg',1,'Comédia, Romance',2),(28,'Jujutsu Kaisen','https://goyabu.to/wp-content/uploads/2023/07/Jujutsu-Kaisen-2-Temporada-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Fantasia',1),(29,'Rick and Morty: The Anime','https://goyabu.to/wp-content/uploads/2024/08/Rick-and-Morty-The-Anime-Dublado-Todos-os-Episodios-Online-Goyabu-1.jpg',1,'Comédia, Ficção Científica',1),(30,'Giji Harem','https://goyabu.to/wp-content/uploads/2024/07/Giji-Harem-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Comédia, Romance',0),(31,'Overflow','https://goyabu.to/wp-content/uploads/2024/04/Overflow-Dublado-Sem-Censura-Todos-os-Episodios-Online-Goyabu.jpg',0,'Romance, Comédia',7),(32,'Bleach','https://goyabu.to/wp-content/uploads/2023/08/Bleach-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Aventura',3),(33,'Hunter x Hunter','https://goyabu.to/wp-content/uploads/2023/04/Hunter-x-Hunter-2011-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Aventura',0),(34,'Boruto Next Generations','https://goyabu.to/wp-content/uploads/2023/07/Boruto-Naruto-Next-Generations-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Aventura',27),(35,'Tokidoki Bosotto','https://goyabu.to/wp-content/uploads/2024/07/Tokidoki-Bosotto-Russia-go-de-Dereru-Tonari-no-Alya-san-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Comédia',1),(36,'Pokemon (2019)','https://goyabu.to/wp-content/uploads/2023/08/Pokemon-2019-Dublado-Todos-os-Episodios.jpg',1,'Aventura, Família',0),(37,'Ansatsu Kyoushitsu','https://goyabu.to/wp-content/uploads/2023/07/Ansatsu-Kyoushitsu-Dublado.jpg',1,'Ação, Comédia',1),(38,'Black Clover Dublado','https://goyabu.to/wp-content/uploads/2023/07/Black-Clover-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Magia',0),(39,'Solo Leveling - Legendado','https://goyabu.to/wp-content/uploads/2023/04/solo-leveling-todos-os-episodios-online-goyabu-1.jpg',1,'Ação, Fantasia',11),(40,'One punch man','https://goyabu.to/wp-content/uploads/2023/07/One-Punch-Man-Dublado-Todos-os-Episodios-Online-Goyabu.jpg',1,'Ação, Comédia',0),(41,'Jovens Titans','https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVhiF77aRcdTh6mmwivMU-GLA5r-0iN23v5ARMEiNVm9Q1IkG9jUk8JwWfKYifKmNj6HYanv98ewYKaIc27cgxmfvHPsiugKVlK6PorKE_YK1hP3MrQLSF2XgC5-IfkAjrplzlPQkb_o0/s1600/sea1.jpg',1,'Aventura, Ação',0),(43,'Hazure Skill','https://goyabu.to/wp-content/uploads/2025/01/Hazure-Skill-Kinomi-Master-Skill-no-Mi-Tabetara-Shinu-wo-Mugen-ni-Taberareru-You-ni-Natta-Ken-ni-Tsuite-Todos-os-Episodios-Online-Goyabu.jpg',1,NULL,2);
/*!40000 ALTER TABLE `animes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-01 19:36:14
