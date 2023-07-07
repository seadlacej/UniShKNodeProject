# UniShKNodeProject
My final project in UniShK

This is a small project writen in javascript by using Node.JS and Docker. Through this application the users (predefined in DB) can login. At the time of the login they get a JWT Token and with that token can then navigate in different links. The users write, update or delete reports.
There are two types of users, regular and admin. Admin user has full rights to see and edit users and reports and the regular user has only the right to see the reports he has created.

Through this small app the users can write reports regarding the obstacles they find in the road. They can select in the map the point where the obstacle is shown and save the report. The admin then can accept/decline or update the report of the regular user.

In order to start the project just run the command "docker-compose up -d" on root path of the project where the Dockerfile is also located.
To test open in browser the URL "localhost:8080" and you can login through the admin user by its email "admin@gmail.com". The users can login only through the email as it is the only parameter that will get verified by JWT. For more information regarding the predefined users open the file "/core/start_scripts.sql".

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
- NPM Modules: "ejs", "express", "fs", "jsonwebtoken", "leaflet", "pg", "sequelize" etc.
