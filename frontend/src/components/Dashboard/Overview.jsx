import React from 'react';
import { FaMoneyBillWave, FaClipboardList, FaCalendarCheck } from 'react-icons/fa';
import StatCard from './StatCard';
import QuickActions from './QuickActions';
import RegistrationTrend from './RegistrationTrend';
import RegistrationBreakdown from './RegistrationBreakdown';
import AttendanceChart from './AttendanceChart';
import EventNumbers from './EventNumbers';
import EventWebsitePreview from './EventWebsitePreview';

const Overview = () => {
    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Sales"
                    value="$58,760.41"
                    icon={<FaMoneyBillWave className="text-orange-500" />}
                    color="bg-orange-50"
                />
                <StatCard
                    title="Registrations"
                    value="11,480"
                    icon={<FaClipboardList className="text-green-500" />}
                    color="bg-green-50"
                />
                <StatCard
                    title="Days to Event"
                    value="15"
                    icon={<FaCalendarCheck className="text-pink-500" />}
                    color="bg-pink-50"
                />
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <QuickActions />
                </div>
                <div className="lg:col-span-1">
                    <RegistrationTrend />
                </div>
                <div className="lg:col-span-1">
                    <RegistrationBreakdown />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <AttendanceChart />
                </div>
                <div className="lg:col-span-1">
                    <EventWebsitePreview />
                </div>
                <div className="lg:col-span-1">
                    <EventNumbers />
                </div>
            </div>
        </div>
    );
};

export default Overview;
