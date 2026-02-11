require('dotenv').config();
const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Create sample event
    const eventId = uuidv4();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 15);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 2);

    await query(`
      INSERT INTO events (id, name, description, start_date, end_date, location, capacity, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO NOTHING
    `, [
      eventId,
      'Tech Summit 2026',
      'Annual technology conference featuring industry leaders and innovative solutions',
      startDate,
      endDate,
      'Convention Center, San Francisco',
      1500,
      'published'
    ]);

    console.log('✅ Event created');

    // Create sample registrations
    const ticketTypes = ['VIP', 'General', 'Student', 'Speaker'];
    const registrations = [];

    for (let i = 1; i <= 100; i++) {
      const regId = uuidv4();
      const ticketType = ticketTypes[Math.floor(Math.random() * ticketTypes.length)];
      const status = Math.random() > 0.3 ? 'registered' : 'checked-in';
      
      const regDate = new Date();
      regDate.setDate(regDate.getDate() - Math.floor(Math.random() * 30));

      await query(`
        INSERT INTO registrations (id, event_id, name, email, phone, ticket_type, status, registration_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (event_id, email) DO NOTHING
      `, [
        regId,
        eventId,
        `Attendee ${i}`,
        `attendee${i}@example.com`,
        `+1-555-${String(i).padStart(4, '0')}`,
        ticketType,
        status,
        regDate
      ]);

      registrations.push({ id: regId, ticketType });
    }

    console.log('✅ Registrations created');

    // Create sales records
    for (const reg of registrations) {
      const saleId = uuidv4();
      let amount;
      
      switch (reg.ticketType) {
        case 'VIP':
          amount = 500 + Math.random() * 200;
          break;
        case 'General':
          amount = 200 + Math.random() * 100;
          break;
        case 'Student':
          amount = 50 + Math.random() * 50;
          break;
        case 'Speaker':
          amount = 0;
          break;
        default:
          amount = 150;
      }

      const transDate = new Date();
      transDate.setDate(transDate.getDate() - Math.floor(Math.random() * 30));

      await query(`
        INSERT INTO sales (id, event_id, registration_id, amount, type, payment_status, transaction_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        saleId,
        eventId,
        reg.id,
        amount.toFixed(2),
        'ticket',
        'completed',
        transDate
      ]);
    }

    console.log('✅ Sales records created');

    // Create sponsor sales
    for (let i = 1; i <= 5; i++) {
      const saleId = uuidv4();
      const amount = 5000 + Math.random() * 10000;
      
      await query(`
        INSERT INTO sales (id, event_id, registration_id, amount, type, payment_status, transaction_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        saleId,
        eventId,
        null,
        amount.toFixed(2),
        'sponsorship',
        'completed',
        new Date()
      ]);
    }

    console.log('✅ Sponsorship sales created');
    console.log('🎉 Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();