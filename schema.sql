DROP DATABASE IF EXISTS `Tracker_db`;
CREATE DATABASE `Tracker_db`;
USE `Tracker_db`;

CREATE TABLE `department` (
id INT auto_increment primary key,
name varchar(30)
);

CREATE TABLE `role` (
id INT auto_increment primary KEY,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT
);

CREATE TABLE `employee` (
id INT auto_increment PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);

use mysql;
update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';

SELECT * FROM `department`;
SELECT * FROM `role`;
SELECT * FROM `employee`;