import React from 'react';

const BlankTable = () => {
    return (
        <div className="overflow-x-auto relative wave">
            <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm overflow-hidden animate-pulse bg-gray-50">
                <thead className="h-10 p-5 bg-gray-50">
                    <tr className="text-nowrap p-5 text-center text-transparent text-sm font-medium bg-gradient-to-r from-[#21bffd] to-[#217bfe]">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <th key={index} className="h-6 w-20 bg-gray-50 rounded"></th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 p-5">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <tr key={index} className="h-8">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <td key={index} className="h-6 w-20 bg-gray-50 rounded"></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlankTable;