-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema notesdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `notesdb` ;

-- -----------------------------------------------------
-- Schema notesdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `notesdb` DEFAULT CHARACTER SET utf8 ;
USE `notesdb` ;

-- -----------------------------------------------------
-- Table `Notes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Notes` ;

CREATE TABLE IF NOT EXISTS `Notes` (
  `idNotes` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `message` VARCHAR(250) NOT NULL,
  `priority` ENUM('High', 'Medium', 'Low') NULL,
  PRIMARY KEY (`idNotes`))
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO noteuser@localhost;
 DROP USER noteuser@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'noteuser'@'localhost' IDENTIFIED BY '12341234';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `Notes`
-- -----------------------------------------------------
START TRANSACTION;
USE `notesdb`;
INSERT INTO `Notes` (`idNotes`, `name`, `title`, `message`, `priority`) VALUES (1, 'Andrew', 'Create \'Notes\' app', 'Create a new app for my Skill Distillery Week 11 Homework', '1');
INSERT INTO `Notes` (`idNotes`, `name`, `title`, `message`, `priority`) VALUES (2, 'Andrew', 'Choose Groomsmen outfit', 'Research and decide on a outfit for my Groomsmen', '2');

COMMIT;