import React from 'react';
import blueprint from '../../uitils/blueprint';

const AssessmentCard = ({ assessment = blueprint.assessment }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {assessment.title}
                    </div>
                    <p className="mt-2 text-gray-600">
                        {assessment.type} Assessment
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-bold">Time Limit:</span> {assessment.time_limit} minutes
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-bold">Retakes Allowed:</span> {assessment.retakes_allowed}
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-bold">Course:</span> {assessment.course.title}
                    </p>
                    <button
                        className="mt-3 py-2 px-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded"
                    // onClick={handleAttempt}
                    >
                        Attempt Assessment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentCard;