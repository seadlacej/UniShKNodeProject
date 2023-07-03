# UniShKNodeProject
My final project in UniShK

This is a small project writen in javascript by using Node.JS and Docker. Through this application the users (predefined in DB) can login. At the time of the login they get a JWT Token and with that token can then navigate in different links. The users write, update or delete reports.
There 2 types of users, regular and admin. Admin user has full rights to see and edit and the regular user has only the right to see what he has created.

Through this small app the users can write reports regarding the obstacles they find in the road. The can select in the map the point where the obstacle is shown and save the report. The admin then can accept/decline or update the report of the regular user.

The most import npm modules used are as follows:
"ejs": "^3.1.9",
"express": "^4.18.2",
"fs": "^0.0.1-security",
"jsonwebtoken": "^9.0.0",
"leaflet": "^1.9.4",
"pg": "^8.11.1",
"sequelize": "^6.32.1"
