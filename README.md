# UniShKNodeProject
My final project in UniShK

This is a small project writen in javascript by using Node.JS and Docker. Through this application the users (predefined in DB) can login. At the time of the login they get a JWT Token and with that token can then navigate in different links. The users write, update or delete reports.
There are two types of users, regular and admin. Admin user has full rights to see and edit users and reports and the regular user has only the right to see the reports he has created.

Through this small app the users can write reports regarding the obstacles they find in the road. They can select in the map the point where the obstacle is shown and save the report. The admin then can accept/decline or update the report of the regular user.

In order to start the project just run the command "docker-compose up -d" on root path of the project where the Dockerfile is also located.

## Features

- Add, update, and delete users
- Add, update, and delete reports regarding obstacles in road by setting also the exact location on the map
- Authentication with JWT Token
- Statistics regarding users with most reports, most declined/accepted reports

## Technologies Used

- NodeJS
- Docker
- PostGreSQL
- JWT
- NPM Modules
The most import npm modules used are as follows:
"ejs": "^3.1.9",
"express": "^4.18.2",
"fs": "^0.0.1-security",
"jsonwebtoken": "^9.0.0",
"leaflet": "^1.9.4",
"pg": "^8.11.1",
"sequelize": "^6.32.1"