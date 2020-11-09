DROP DATABASE IF EXISTS contact_tracing_db;

CREATE DATABASE contact_tracing_db;

USE contact_tracing_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE testData (
	id INT AUTO_INCREMENT NOT NULL,
    testDate VARCHAR(255) NOT NULL,
    testResult VARCHAR(255) NOT NULL,
    userId INT references users(id),
    PRIMARY KEY (id)
);

CREATE TABLE loactions (
	id INT AUTO_INCREMENT NOT NULL,
    latitude VARCHAR(255) NOT NULL,
    longitute VARCHAR(255) NOT NULL,
    userId INT references users(id),
    PRIMARY KEY (id)
);

