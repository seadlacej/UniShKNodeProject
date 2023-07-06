const Sequelize = require('sequelize');
const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const sequelize = require('./core/database');
const {HOST, PORT, USER_STATUS_DELETED, REGULAR_USER} = require('./core/constants');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const Users = require('./models/users');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const { use } = require('./routes/users');

const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const verifyAndDecodeJWT = async (req, res, next) => {
  if (req.headers['authorization'] || req.cookies.token) {
      let splittedValue = req.headers['authorization'] ? req.headers['authorization'].split(' ') : [];
      if (splittedValue.length == 2 || req.cookies.token) {
          let jwtToken = splittedValue[1];
          if (req.cookies.token) {
            jwtToken = req.cookies.token;
          } 
          try {
              let out = jwt.verify(jwtToken, JWT_SECRET_KEY);
              if (req.cookies.userData && out.email === req.cookies.userData.email) {
                req.token = out;
                next();
              } else {
                res.clearCookie('userData');
                res.clearCookie('token');
                throw new Error('Invalid auth. Email does not exist.');
              }
          } catch(error) {
              next(error);
          }
      } else {
          next('invalid auth');
      }
  } else {
    res.render('login');
  }
};


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.get('/', verifyAndDecodeJWT, (req, res, next) => {
  const userRole = req.cookies.userData ? req.cookies.userData.role : REGULAR_USER;
    fs.readFile('homepage.html', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        const renderedHTML = ejs.render(data, { userRole });
        res.send(renderedHTML);
      }); 
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));



app.post('/login', async (req, res) => {
  const jwt = require('jsonwebtoken');
  const { email } = req.body;
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
  const user = await Users.findOne({
    where: { 
      email, 
      status: {
        [Sequelize.Op.ne]: USER_STATUS_DELETED
      }
    },
  });
  res.cookie('token', token);
  if (user) {
    res.cookie('userData', user.dataValues)
  }
  res.redirect('/')
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  res.clearCookie('userData');
  res.clearCookie('token');
  res.redirect('/login');
});

app.use('/users', verifyAndDecodeJWT, require('./routes/users'));
app.use('/reports', verifyAndDecodeJWT, require('./routes/reports'));

//error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
  });
  
  //sync database
sequelize
.sync()
.then(result => {
    console.log("Database connected");
    app.listen(PORT, HOST);
})
.catch(err => console.log(err));

//  app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);