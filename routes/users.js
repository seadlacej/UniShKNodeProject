const controller = require('../controllers/users');
const router = require('express').Router();

router.get('/with_highest_report_number', controller.getUsersWithHighestReportCount);
router.get('/with_highest_report_rejected', controller.getUsersWithHighestReportRejected);
router.get('/with_highest_report_approved', controller.getUsersWithHighestReportApproved);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.post('/', controller.createUser);
router.post('/remove', controller.deleteUser);
router.post('/:id', controller.updateUser);

module.exports = router;
