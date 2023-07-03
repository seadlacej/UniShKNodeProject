const controller = require('../controllers/reports');
const router = require('express').Router();

router.get('/', controller.getReports);
router.get('/:id', controller.getReport);
router.post('/', controller.createReport);
router.post('/remove', controller.deleteReport);
router.post('/:id', controller.updateReport);

module.exports = router;
