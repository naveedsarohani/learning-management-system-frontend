import React from 'react';
import blueprint from '../../uitils/blueprint';

const ProgressBar = ({ progress = blueprint.progress }) => {
    return (
        <div className="w-full h-4 bg-gray-200 rounded">
            <div
                className="relative h-full bg-green-500 rounded"
                style={{ width: `${progress.completion_percentage}%` }}
            >

                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-600">
                    {progress.completion_percentage}%
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;