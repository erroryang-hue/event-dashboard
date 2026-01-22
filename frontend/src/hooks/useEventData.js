import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';

const useEventData = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await getEvents();
            setEvents(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { events, loading, error, refreshEvents: fetchEvents };
};

export default useEventData;
