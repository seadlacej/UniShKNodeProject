const Sequelize = require('sequelize');
const Users = require('../models/users');
const Reports = require('../models/reports');
const {USER_STATUS_ACTIVE, USER_STATUS_DELETED, REGULAR_USER, isAdminUser, REPORT_STATUS_DELETED, REPORT_STATUS_ACCEPTED} = require('../core/constants');

Users.hasMany(Reports, { foreignKey: 'report_user_id' });
Reports.belongsTo(Users, { foreignKey: 'report_user_id' });

// CRUD Controllers

//get all users
exports.getUsers = (req, res, next) => {
  if (isAdminUser(req)) {
    Users.findAll({
      where: {
        status: {
          [Sequelize.Op.ne]: USER_STATUS_DELETED
        }
      }
    })
    .then(users => {
      // res.status(200).json({ users: users });
      res.render('users', { users: users });
    })
    .catch(err => console.log(err));
  } else {
    res.redirect('/');
  }
}

//get user by id
exports.getUser = (req, res, next) => {
  if (isAdminUser(req)) {
    const userId = req.params.id;
    Users.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            // res.status(200).json({ user: user });
            res.render('user', { user: user });
        })
        .catch(err => console.log(err));
      } else {
        res.redirect('/');
      }
}

//create user
exports.createUser = (req, res, next) => {
  if (isAdminUser(req)) {
    const { username, firstname, lastname, email } = req.body
    const status = USER_STATUS_ACTIVE;
    const created = Date.now();
    const updated = Date.now();
    const role = REGULAR_USER;
    Users.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      status: status,
      created: created,
      updated: updated,
      role: role,
    })
    .then(result => {
      console.log('Created User');
      /* res.status(201).json({
        message: 'User created successfully!',
        user: result
      }); */
      res.redirect('/users');
    })
    .catch(err => {
      console.log(err);
    }); 
  } else {
    res.redirect('/');
  }
}

//update user
exports.updateUser = (req, res, next) => {
  if (isAdminUser(req)) {
  const id = req.params.id;
  const { username, firstname, lastname, email } = req.body;
  const updated = Date.now();
  Users.findByPk(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      user.username = username;
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.updated = updated;
      return user.save();
    })
    .then(result => {
      // res.status(200).json({message: 'User updated!', user: result});
      res.redirect('/users');
    })
    .catch(err => console.log(err));
  } else {
    res.redirect('/');
  }
}


//soft delete user
exports.deleteUser = (req, res, next) => {
  if (isAdminUser(req)) {
  const id = req.body.id;
  const updated = Date.now();
  Users.findByPk(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      user.status = USER_STATUS_DELETED;
      user.updated = updated;
      return user.save();
    })
    .then(result => {
      // res.status(200).json({message: 'User has been deleted!', user: result});
      res.redirect('/users');
    })
    .catch(err => console.log(err));
  } else {
    res.redirect('/');
  }
}

exports.getUsersWithHighestReportCount = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('reports.report_user_id')), 'reportCount'],
        'id',
        'email'
      ],
      include: [
        {
          model: Reports,
          attributes: []
        }
      ],
      group: ['users.id'],
      order: [[Sequelize.literal('users.id'), 'DESC']],
      raw: true // To return raw data instead of model instances
    }).then(users => {
      // res.status(200).json({ users: users });
      res.render('usersWithHighestReports', { users: users });
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
};

exports.getUsersWithHighestReportRejected = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('reports.report_user_id')), 'reportCount'],
        'id',
        'email'
      ],
      include: [
        {
          model: Reports,
          attributes: [],
          where: {
            status: REPORT_STATUS_DELETED
          }
        }
      ],
      group: ['users.id'],
      order: [[Sequelize.literal('users.id'), 'DESC']],
      raw: true
    }).then(users => {
      // res.status(200).json({ users: users });
      res.render('usersWithHighestReports', { users: users });
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
};

exports.getUsersWithHighestReportApproved = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('reports.report_user_id')), 'reportCount'],
        'id',
        'email'
      ],
      include: [
        {
          model: Reports,
          attributes: [],
          where: {
            status: REPORT_STATUS_ACCEPTED
          }
        }
      ],
      group: ['users.id'],
      order: [[Sequelize.literal('users.id'), 'DESC']],
      raw: true
    }).then(users => {
      // res.status(200).json({ users: users });
      res.render('usersWithHighestReports', { users: users });
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
};