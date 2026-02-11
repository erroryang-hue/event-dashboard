// ============= analyticsRoutes.js =============
const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getRegistrationTrend,
  getSalesAnalytics,
  getQuickActions,
  getTicketDistribution
} = require('../controllers/analyticsController');

router.get('/dashboard', getDashboardAnalytics);
router.get('/registrations/trend', getRegistrationTrend);
router.get('/sales', getSalesAnalytics);
router.get('/quick-actions', getQuickActions);
router.get('/tickets/distribution', getTicketDistribution);

module.exports = router;