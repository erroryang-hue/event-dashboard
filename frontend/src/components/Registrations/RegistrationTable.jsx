import React from 'react';

const RegistrationTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Email</th>
                        <th scope="col" className="px-6 py-4">Event</th>
                        <th scope="col" className="px-6 py-4">Date</th>
                        <th scope="col" className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{item.name}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.event}</td>
                            <td className="px-6 py-4">{item.date}</td>
                            <td className="px-6 py-4 text-green-600">Confirmed</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistrationTable;
