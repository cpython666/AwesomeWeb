-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: shopdb
-- ------------------------------------------------------
-- Server version	5.7.37-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `name` varchar(20) NOT NULL,
  `price` double NOT NULL,
  `shopclass` varchar(50) DEFAULT NULL,
  `inf` text,
  `url` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES ('a4纸',3,'a4纸，学习用品','用来写字,或者打印东西','./images/shop/a4.png',1),('CliBot机器人',9999,'CliBot机器人，机器人，儿童玩具，智能','非常可爱的玩具，可拼装，舞动造型独特','./images/shop/jiqiren.png',2),('ModelX',8808999936,'ModelX，科技产品，汽车，出行','自动驾驶，新能源汽车','./images/shop/modelX.png',3),('Python培训班',12000,'Python培训班，学习，提高，技能，python','Python基础，提高，爬虫，pyqt5，自动化办公','./images/shop/python.png',4),('Vector2代',3999,'Vector2代，机器人，儿童玩具，智能','智能机器人，电子宠物','./images/shop/vector.png',5),('凤求凰-李白皮肤',168.8,'凤求凰-李白皮肤，虚拟商品，皮肤，王者荣耀','凤兮凤兮归故乡，寻觅四海求真凰。','./images/shop/fengqiuhuang.png',6),('华为P50',4988,'华为P50，科技产品','一机在手，天下我有~','./images/shop/huaweiphone.png',7),('太空八日游',350000000,'太空八日游，太空，火箭，飞船，烧金','宇宙那么大，我想去看看。','./images/shop/sky.png',8),('抽纸',6.9,'抽纸，生活用品','吸水性强，防止铁制品生锈','./images/shop/parper.png',9),('拖鞋',9.98,'拖鞋，衣物，生活用品','穿在脚上','./images/shop/tuoxie.png',10),('星空篮球',59,'星空篮球，运动，比赛，球','用手拍打的球','./images/shop/basket.png',11),('李宁足球',89,'李宁足球，运动，比赛,球类','用脚踢的球','./images/shop/football.png',12),('程序代做',0.99,'程序代做，站长，程序代做，悬赏','站长定制程序','./images/shop/help.png',13),('站长求助',0.5,'站长求助，帮忙，站长，悬赏','需要站长帮助下单','./images/shop/help.png',14),('算法之美',59.9,'算法之美，书籍，算法，学习用品','算法手绘图解，真实项目案例','./images/shop/suanfabook.png',15),('网站代做',0.99,'网站代做，站长，作业代做，悬赏','帮助做网站或者完成网站的某些功能','./images/shop/help.png',16),('羽毛球',6.5,'羽毛球，运动，比赛，球','用羽毛球拍打的球','./images/shop/yumaoqiu.png',17),('袜子',5.01,'袜子，衣物','穿在脚上','./images/shop/wazi.png',18),('遮阳伞',10.8,'遮阳伞，生活用品，出行','全自动晴雨两用遮雨遮阳太阳伞防晒防紫外线定制图案','./images/shop/yusan.png',19),('钢铁侠',378,'钢铁侠，玩具，磁悬浮','手办摆件展示台创意礼物','./images/shop/gangtiexia.png',20),('待删除商品1',22,'删除测试使用','删除待用','./images/shop/help1.png',21),('待删除商品2',10,'删除测试使用','删除测试使用','./images/shop/help1.png',22),('待删除商品3',8,'删除测试使用','删除测试使用','./images/shop/help1.png',23),('2',22,'222','2222','files/e642658d-6c94-4846-a8b9-6049b4016e5d.jpeg',25),('1',11,'111','11111','files/eb846880-3f4f-4dda-89aa-278585de3d43.webp',26),('12',12,'12','12','files/19ac207b-b91e-45d0-853d-c7f353636670.png',28),('2',2,'2','2','files/f453572b-a761-4eab-8769-5e1088c34735.png',44),('1',1,'1','1','files/8b68a5b7-b5aa-4a59-a0e9-a5ffb7781c5a.png',45),('1',1,'1','1','files/c2531805-ce62-4e88-b8ed-1417a810c21d.png',47),('1',1,'1','1','files/baa41863-d7be-4eff-9f64-f75485ce44f1.png',48),('555',1,'1','1','files/58b805e4-fb32-4a61-b083-bbdee4468576.jpeg',49),('5',1,'1','1','files/482bdc45-ad4c-42c1-ab57-5dd33d126dd3.png',53),('111',1,'1','1','files/bf4240d6-7f74-4963-ad10-209ebc0935a0.png',55),('222',22,'2','2','files/b1c86cc0-cd01-4e9c-85c2-08beba1db624.png',56),('222',22,'2','2','files/167ed3b2-d0e8-42dd-9d1e-cc5454eabda5.png',57);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_comment`
--

DROP TABLE IF EXISTS `shop_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop_comment` (
  `id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` text,
  `username` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_comment`
--

LOCK TABLES `shop_comment` WRITE;
/*!40000 ALTER TABLE `shop_comment` DISABLE KEYS */;
INSERT INTO `shop_comment` VALUES (1,'2022-05-26 18:53:07','A4纸可以用来当草稿，做剪纸作品，打印实验报告，学习必备','zhangsan'),(2,'2022-05-26 18:56:31','Clibot机器人，没有特做不到，只有你想不到，让特帮你写实验报告？有钱的话~不如试试！','lisi'),(3,'2022-05-26 18:58:13','自动驾驶，妈妈再也不怕我开车睡觉了~','wangwu'),(6,'2022-05-26 19:02:32','垃圾游戏，狗都不玩，哼','lisi');
/*!40000 ALTER TABLE `shop_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopcar`
--

DROP TABLE IF EXISTS `shopcar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopcar` (
  `username` varchar(60) DEFAULT NULL,
  `shopid` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopcar`
--

LOCK TABLES `shopcar` WRITE;
/*!40000 ALTER TABLE `shopcar` DISABLE KEYS */;
INSERT INTO `shopcar` VALUES ('root',3,12),('root',2,22),('root',1,2),('root',6,7),('root',7,2),('root',11,1),('root',9,1),('root',19,5),('root',17,1),('root',48,3),('root',49,2);
/*!40000 ALTER TABLE `shopcar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('??','1234'),('????','1234'),('admin','1234'),('admin1','123456'),('lisi','1234'),('maliu','1234'),('root','1234'),('wangwu','1234'),('zhangsan','1234'),('王鑫是pig','xswl'),('肖红娇','54250');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'shopdb'
--

--
-- Dumping routines for database 'shopdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-30 16:20:21
