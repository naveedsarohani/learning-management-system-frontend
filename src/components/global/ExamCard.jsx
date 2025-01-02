import React from 'react';
import blueprint from '../../uitils/blueprint';

const ExamCard = ({ exam = blueprint.exam }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {exam.title}
                    </div>
                    <p className="mt-2 text-gray-600">
                        {exam.description}
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-bold">Passing Percentage:</span> {exam.passing_percentage}%
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-bold">Time Allowed:</span> {exam.time_allowed} minutes
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-bold">Total Retakes:</span> {exam.total_retakes}
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-bold">Instructor:</span> {exam.instructor.name}
                    </p>
                    <button
                        className="mt-3 py-2 px-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded"
                    // onClick={handleAttempt}
                    >
                        Attempt Exam
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamCard;