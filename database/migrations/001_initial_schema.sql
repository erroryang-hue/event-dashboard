-- Drop tables if they exist to ensure clean state
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS events;

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    capacity INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_dates CHECK (end_date >= start_date),
    CONSTRAINT check_capacity CHECK (capacity >= 0)
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    ticket_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'registered',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check_in_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_event_email UNIQUE (event_id, email)
);

-- Create sales table
CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id),
    registration_id UUID REFERENCES registrations(id),
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_amount CHECK (amount >= 0)
);

-- Create indexes for better query performance
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_date ON registrations(registration_date);
CREATE INDEX idx_sales_event_id ON sales(event_id);
CREATE INDEX idx_sales_registration_id ON sales(registration_id);
CREATE INDEX idx_sales_date ON sales(transaction_date);
CREATE INDEX idx_events_start_date ON events(start_date);

-- Create composite indexes
CREATE INDEX idx_registrations_event_status ON registrations(event_id, status);
CREATE INDEX idx_sales_event_status ON sales(event_id, payment_status);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();