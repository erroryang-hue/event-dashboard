import { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';

const useEventData = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventsAPI.getAll();
            const body = response.data;
            const items = Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : []);
            setEvents(items);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { events, loading, error, refreshEvents: fetchEvents };
};

export default useEventData;
