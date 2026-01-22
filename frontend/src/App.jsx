import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// Placeholder Pages
import Overview from './components/Dashboard/Overview';
import RegistrationList from './components/Registrations/RegistrationList';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import SearchPanel from './components/Search/SearchPanel';

function App() {
    return (
        <Router>
            <div className="flex bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="flex-1 ml-64">
                    <Header />
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="/registrations" element={<RegistrationList />} />
                            <Route path="/analytics" element={<AnalyticsDashboard />} />
                            <Route path="/search" element={<SearchPanel />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
