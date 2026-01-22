const { client } = require('../config/database');

const seedData = async () => {
    try {
        // Check if data exists
        const res = await client.query('SELECT COUNT(*) FROM events');
        if (parseInt(res.rows[0].count) > 0) {
            console.log('Data already seeded.');
            return;
        }

        // Insert sample events
        const query = `
      INSERT INTO events (name, date, location, description) VALUES
      ('Tech Conference 2024', '2024-05-15', 'Convention Center', 'Annual tech gathering'),
      ('Music Festival', '2024-07-20', 'City Park', 'Live music and food'),
      ('Art Workshop', '2024-06-10', 'Community Center', 'Learn painting and sculpture')
    `;
        await client.query(query);
        console.log('Sample data inserted successfully.');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
};

module.exports = seedData;
