
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1', '1');
INSERT INTO `user` VALUES ('2', '1', '1');
INSERT INTO `user` VALUES ('3', '1', '1');
INSERT INTO `user` VALUES ('4', '1', '1');
INSERT INTO `user` VALUES ('5', '1', '1');
INSERT INTO `user` VALUES ('6', '1', '1');
INSERT INTO `user` VALUES ('7', '1', '1');
INSERT INTO `user` VALUES ('8', '1', '1');
INSERT INTO `user` VALUES ('9', '1', '1');
INSERT INTO `user` VALUES ('10', '1', '1');
INSERT INTO `user` VALUES ('11', '1', '1');
INSERT INTO `user` VALUES ('12', '1', '1');
