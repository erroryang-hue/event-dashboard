-- Insert Sample Events
INSERT INTO events (id, name, start_date, end_date, location, description, capacity, status) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Tech Conference 2024', '2024-05-15 09:00:00', '2024-05-17 17:00:00', 'Convention Center', 'Annual tech gathering', 500, 'published'),
('550e8400-e29b-41d4-a716-446655440001', 'Music Festival', '2024-07-20 12:00:00', '2024-07-20 23:00:00', 'City Park', 'Live music and food', 1000, 'published'),
('550e8400-e29b-41d4-a716-446655440002', 'Art Workshop', '2024-06-10 10:00:00', '2024-06-10 14:00:00', 'Community Center', 'Learn painting and sculpture', 50, 'published');

-- Insert Sample Registrations
INSERT INTO registrations (id, event_id, name, email, ticket_type, status) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '550e8400-e29b-41d4-a716-446655440000', 'John Doe', 'john@example.com', 'VIP', 'registered'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '550e8400-e29b-41d4-a716-446655440000', 'Jane Smith', 'jane@example.com', 'General', 'registered'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '550e8400-e29b-41d4-a716-446655440001', 'Bob Johnson', 'bob@example.com', 'General', 'registered');

-- Insert Sample Sales
INSERT INTO sales (id, event_id, registration_id, amount, type, payment_status) VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '550e8400-e29b-41d4-a716-446655440000', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 150.00, 'ticket', 'completed'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '550e8400-e29b-41d4-a716-446655440000', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 150.00, 'ticket', 'completed'),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', '550e8400-e29b-41d4-a716-446655440001', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 75.00, 'ticket', 'completed');
