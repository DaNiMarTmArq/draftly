-- -----------------------------------------------------
-- Schema mydb (UTF-8 MB4)
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `draftly`;
CREATE SCHEMA IF NOT EXISTS `draftly` DEFAULT CHARACTER SET utf8mb4;
USE `draftly`;

-- -----------------------------------------------------
-- Table `authors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `authors`;
CREATE TABLE IF NOT EXISTS `authors` (
  `idauthors` CHAR(36)            NOT NULL,
  `name`      VARCHAR(100)        NOT NULL,
  `email`     VARCHAR(255)        NOT NULL,
  `image_url` VARCHAR(255)        NULL,
  PRIMARY KEY (`idauthors`),
  UNIQUE KEY  `name_UNIQUE`  (`name`),
  UNIQUE KEY  `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `idcategories` INT          NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idcategories`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table `posts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `idposts`       CHAR(36)     NOT NULL,
  `title`         VARCHAR(255) NOT NULL,
  `description`   TEXT         NULL,
  `creation_date` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                                 ON UPDATE CURRENT_TIMESTAMP,
  `author_id`     CHAR(36)     NOT NULL,
  `category_id`   INT          NOT NULL,
  PRIMARY KEY (`idposts`),
  KEY `author_id_idx`   (`author_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `fk_posts_author`
      FOREIGN KEY (`author_id`)
      REFERENCES `authors` (`idauthors`)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT `fk_posts_category`
      FOREIGN KEY (`category_id`)
      REFERENCES `categories` (`idcategories`)
      ON DELETE RESTRICT
      ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;