import React, { useEffect, useState } from 'react';
import RegistrationTable from './RegistrationTable';
import { getRegistrations } from '../../services/api';

const RegistrationList = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            // In a real app we'd fetch from API, for now mock or empty
            // const res = await getRegistrations();
            // setRegistrations(res.data.data);
            // Mock data for UI demo
            setRegistrations([
                { id: 1, name: 'John Doe', email: 'john@example.com', event: 'Tech Conf', date: '2024-05-15' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', event: 'Music Fest', date: '2024-07-20' },
            ]);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch registrations", error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Registration List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <RegistrationTable data={registrations} />
            )}
        </div>
    );
};

export default RegistrationList;
