const Sequelize = require('sequelize');
const Reports = require('../models/reports');
const {REPORT_STATUS_ACCEPTED, REPORT_STATUS_DELETED, REPORT_STATUS_PENDING, isAdminUser} = require('../core/constants');
const { convertUnixTimestamp, getCurrentUnixTime } = require('../core/utils');

const formatUnixDateTime = (reports) => {
  return reports.map(report => {
    report.created = convertUnixTimestamp(report.created);
    report.updated = convertUnixTimestamp(report.updated);
  });
}

const getMyReports = (req, res, next) => {
  Reports.findAll({
    order: [['id', 'ASC']],
    where: {
      report_user_id: req.cookies.userData.id,
    }
  })
  .then(reports => {
      // res.status(200).json({ reports: reports });
      formatUnixDateTime(reports);
      res.render('reports', { reports: reports });
  })
  .catch(err => console.log(err));
};

const getAllReports = (req, res, next) => {
  Reports.findAll({
    order: [['id', 'ASC']]
  })
  .then(reports => {
      // res.status(200).json({ reports: reports });
      formatUnixDateTime(reports);
      res.render('reports', { reports: reports });
  })
  .catch(err => console.log(err));
};

// CRUD Controllers
exports.getReports = (req, res, next) => {
  if (isAdminUser(req)) {
    getAllReports(req, res, next);
  } else {
    getMyReports(req, res, next);
  }
}

exports.getReport = (req, res, next) => {
    const reportId = req.params.id;
    Reports.findByPk(reportId)
        .then(report => {
            if (!report) {
                return res.status(404).json({ message: 'Report not found!' });
            }
            if (!isAdminUser(req) && report.report_user_id != req.cookies.userData.id) {
              return res.status(401).json({ message: 'You are not allowed to see this report!' });
            }
            // res.status(200).json({ report: report });
            res.render('report', { report: report, userRole: req.cookies.userData.role });
        })
        .catch(err => console.log(err));
}

exports.createReport = (req, res, next) => {
  const { type, geo_coordinates, description } = req.body
  const report_user_id = req.cookies.userData.id;
  const status = REPORT_STATUS_PENDING;
  const created = getCurrentUnixTime();
  const updated = getCurrentUnixTime();
  Reports.create({
    type: type,
    geo_coordinates: geo_coordinates,
    description: description,
    report_user_id: report_user_id,
    status: status,
    created: created,
    updated: updated,
  })
    .then(result => {
      console.log('Report created');
      /* res.status(201).json({
        message: 'User report created successfully!',
        report: result
      }); */
      res.redirect('/reports');
    })
    .catch(err => {
      console.log(err);
    }); 
}

exports.updateReport = (req, res, next) => {
  const id = req.params.id;
  const { type, geo_coordinates, description, status } = req.body;
  const updated = getCurrentUnixTime();
  Reports.findByPk(id)
    .then(report => {
      if (!report) {
        return res.status(404).json({ message: 'Report not found!' });
      }
      if (!isAdminUser(req) && report.report_user_id != req.cookies.userData.id) {
        return res.status(401).json({ message: 'You are not allowed to edit this report!' });
      }
      report.type = type;
      report.geo_coordinates = geo_coordinates;
      report.description = description;
      report.status = status;
      report.updated = updated;
      return report.save();
    })
    .then(result => {
      // res.status(200).json({message: 'User report updated!', report: result});
      res.redirect('/reports');
    })
    .catch(err => console.log(err));
}

exports.deleteReport = (req, res, next) => {
  const id = req.body.id;
  const updated = getCurrentUnixTime();
  Reports.findByPk(id)
    .then(report => {
      if (!report) {
        return res.status(404).json({ message: 'Report not found!' });
      }
      if (!isAdminUser(req) && report.report_user_id != req.cookies.userData.id) {
        return res.status(401).json({ message: 'You are not allowed to delete this report!' });
      }
      report.status = REPORT_STATUS_DELETED;
      report.updated = updated;
      return report.save();
    })
    .then(result => {
      // res.status(200).json({message: 'Report has been deleted!', report: result});
      res.redirect('/reports');
    })
    .catch(err => console.log(err));
}
