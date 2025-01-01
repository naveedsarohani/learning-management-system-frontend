import React from 'react';

const BlankExamCard = () => {
    return <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* exam Details */}
            <div className="p-6 border-b border-gray-200 animate-pulse">
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
};

export default BlankExamCard;