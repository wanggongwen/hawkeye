
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for programmer
-- ----------------------------
DROP TABLE IF EXISTS `programmer`;
CREATE TABLE `programmer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `base` varchar(255) DEFAULT NULL,
  `tel` varchar(11) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `entryDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of programmer
-- ----------------------------
INSERT INTO `programmer` VALUES ('1', 'name', 'base', 'tel', 'level', '2016-11-11');
INSERT INTO `programmer` VALUES ('2', 'name', 'base', 'tel', 'level', '2016-11-11');
