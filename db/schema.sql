DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

DROP TABLE IF EXISTS crew;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS pirate;

CREATE TABLE crew (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE positions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    crew_id INT,
    FOREIGN KEY (crew_id)
    REFERENCES crew(id)
    ON DELETE SET NULL
);

CREATE TABLE pirate (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position_id INT,
    captain_id INT,
    FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE SET NULL,
    FOREIGN KEY (captain_id) REFERENCES pirate(id) ON DELETE SET NULL
);