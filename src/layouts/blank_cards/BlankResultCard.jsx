import React from 'react';
import DashboardPageCompement from '../../components/global/DashboardPage';

const BlankResultCard = () => {
    return (
        <DashboardPageCompement title={'specified result'}>
            <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg relative wave">
                <div className="animate-pulse">
                    <div className="mb-6">
                        <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
                        <div className="h-6 w-1/2 bg-gray-200 rounded mt-4"></div>
                        <div className="h-6 w-1/2 bg-gray-200 rounded mt-4"></div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>

                    <div className="mt-6">
                        <div className="h-10 w-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </DashboardPageCompement>
    );
};

export default BlankResultCard;