DROP DATABASE IF EXISTS bdoctors;
CREATE DATABASE bdoctors;
USE bdoctors;
-- TABELLA DOTTORI
CREATE TABLE doctors (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    specialization VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    address VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- TABELLA RECENSIONI
CREATE TABLE reviews (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    description TEXT(500) NOT NULL,
    rating TINYINT NOT NULL,
    doctor_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);