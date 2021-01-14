# Host: localhost  (Version: 5.5.53)
# Date: 2021-01-14 10:56:06
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "name"
#

DROP TABLE IF EXISTS `name`;
CREATE TABLE `name` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

#
# Data for table "name"
#

/*!40000 ALTER TABLE `name` DISABLE KEYS */;
INSERT INTO `name` VALUES (1,'13232535652','Jack','123456','是李三吖'),(2,'13256458953','Tom','789456','天线宝宝'),(3,'13519870504','Alice','19870504','小蜜蜂'),(4,'13519991208','韩越','19991208','好运来'),(6,'13568956245','null','456123','789456123'),(7,'15635324568','null','123456789','haoyun');
/*!40000 ALTER TABLE `name` ENABLE KEYS */;
