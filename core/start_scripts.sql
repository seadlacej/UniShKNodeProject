\c postgres;
DROP DATABASE IF EXISTS pg_db;
CREATE DATABASE pg_db;
\c pg_db
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    status INTEGER,
    created VARCHAR(255),
    updated VARCHAR(255),
    role INTEGER
);

DROP TABLE IF EXISTS reports;
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    geo_coordinates TEXT,
    description TEXT,
    created VARCHAR(255),
    updated VARCHAR(255),
    status INTEGER,
    report_user_id INTEGER,
    FOREIGN KEY (report_user_id) REFERENCES users (id)
);

INSERT INTO users (username, firstname, lastname, email, status, created, updated, role)
VALUES
    ('adminuser', 'admin', 'user', 'admin@gmail.com', 1, '1688290467', '1688290467', 1 ),
    ('regularuser', 'regular', 'user', 'regular@gmail.com', 1, '1688290467', '1688290467', 2),
    ('regularuser2', 'regular2', 'user2', 'regular2@gmail.com', 1, '1688290467', '1688290467', 2 ),
    ('regularuser3', 'regular3', 'user3', 'regular3@gmail.com', 1, '1688290467', '1688290467', 2 );

INSERT INTO reports (type, geo_coordinates, description, created, updated, status, report_user_id)
VALUES
    ('pothole', 'geo_coordinates test', 'test desc', '1688290467', '1688290467', 1, 2 );
