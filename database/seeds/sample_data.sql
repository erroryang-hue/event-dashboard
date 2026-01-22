-- Insert Sample Events
INSERT INTO events (name, date, location, description) VALUES
('Tech Conference 2024', '2024-05-15', 'Convention Center', 'Annual tech gathering'),
('Music Festival', '2024-07-20', 'City Park', 'Live music and food'),
('Art Workshop', '2024-06-10', 'Community Center', 'Learn painting and sculpture');

-- Insert Sample Registrations
INSERT INTO registrations (event_id, user_name, user_email) VALUES
(1, 'John Doe', 'john@example.com'),
(1, 'Jane Smith', 'jane@example.com'),
(2, 'Bob Johnson', 'bob@example.com');

-- Insert Sample Sales
INSERT INTO sales (event_id, amount, timestamp) VALUES
(1, 150.00, NOW()),
(1, 150.00, NOW()),
(2, 75.00, NOW());
