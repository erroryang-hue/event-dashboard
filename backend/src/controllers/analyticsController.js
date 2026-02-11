const Sale = require('../models/Sale');
const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.getDashboardAnalytics = async (req, res, next) => {
  try {
    const [salesData, regData, events] = await Promise.all([
      Sale.getAnalytics(),
      Registration.getAnalytics(),
      Event.findAll()
    ]);

    // Calculate days to next event
    const nextEvent = events.find(e => new Date(e.start_date) > new Date());
    let daysToEvent = 'N/A';
    if (nextEvent) {
      const diff = new Date(nextEvent.start_date) - new Date();
      daysToEvent = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    const data = {
      total_sales: salesData.total_sales || 0,
      total_registrations: regData.total_registrations || 0,
      days_to_event: daysToEvent,
      checked_in: regData.checked_in || 0,
      yet_to_checkin: regData.pending || 0,
      avg_ticket_price: salesData.avg_ticket_price || 0,
      capacity_percentage: 82 // Mocked for now as we need per-event math
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getRegistrationTrend = async (req, res, next) => {
  try {
    // Mock trend for now
    const data = [
      { date: 'Mar 19', count: 500 },
      { date: 'Mar 22', count: 1500 },
      { date: 'Mar 25', count: 1400 },
      { date: 'Mar 28', count: 2800 },
      { date: 'Mar 30', count: 800 },
      { date: 'Sat', count: 1500 }
    ];
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getQuickActions = async (req, res, next) => {
  try {
    const actions = [
      { name: 'Approve Exhibitors', icon: 'building', urgency: 'high' },
      { name: 'Promote Early Bird', icon: 'trending-up', urgency: 'medium' },
      { name: 'Review Sponsors', icon: 'award', urgency: 'low' },
      { name: 'Update Agenda', icon: 'calendar', urgency: 'medium' }
    ];
    res.status(200).json({ success: true, data: actions });
  } catch (error) {
    next(error);
  }
};

exports.getSalesAnalytics = async (req, res, next) => {
  try {
    const salesData = await Sale.getAnalytics();
    const recentSales = await Sale.getRecentSales(10);

    res.status(200).json({
      success: true,
      data: {
        summary: salesData,
        recent: recentSales
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getTicketDistribution = async (req, res, next) => {
  try {
    // Mock ticket distribution data
    const data = [
      { type: 'General', count: 1200, percentage: 60 },
      { type: 'VIP', count: 400, percentage: 20 },
      { type: 'Early Bird', count: 300, percentage: 15 },
      { type: 'Student', count: 100, percentage: 5 }
    ];
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
