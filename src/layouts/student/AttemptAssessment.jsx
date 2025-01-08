import React, { useEffect, useState } from "react";
import question from "../../uitils/api/question";
import submission from "../../uitils/api/submission";
import answer from "../../uitils/api/answer";
import '../../uitils/functions/check_before_reload'
import blueprint from "../../uitils/blueprint";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { useParams } from "react-router-dom";
import { capEach, capitalize, getCountDown, isLoading, isNullOrEmpty, readFile } from "../../uitils/functions/global";

export default function AttemptAssessment() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([blueprint.question]);
    const [answers, setAnswers] = useState([blueprint.answer]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [remainingTime, setRemainingTime] = useState({});
    const [score, setScore] = useState(0);
    const { credentials: { token, user } } = useAuth();
    const { handler } = useHandler();
    const { assessmentId } = useParams();

    const handleNext = () => {
        if (!selectedOption) return alert("Please select an option before proceeding!");
        let totalScore = score;

        if (findAnswer(questions[currentQuestionIndex].id).is_correct == selectedOption) {
            totalScore += 1;
            setScore(preScore => preScore += 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }

        if (currentQuestionIndex === questions.length - 1) {
            return handleSubmit(totalScore);
        }
    };

    const handleSubmit = async (score) => {
        await submission.store(token, {
            assessment_id: parseInt(assessmentId),
            student_id: user.id,
            retake_count: 1,
            score: score,
        }, handler);
    };

    const findAnswer = questionId => {
        return answers.find(answer => answer.question_id === parseInt(questionId)) ?? blueprint.answer;
    };

    useEffect(() => {
        question.all(token, setQuestions, handler, { assessment_id: parseInt(assessmentId) });
        answer.all(token, setAnswers, handler);
    }, []);

    useEffect(() => {
        if (questions.length > 0 && questions[currentQuestionIndex]) {
            const questionId = questions[currentQuestionIndex].id;
            const timeLimit = questions[currentQuestionIndex].assessment.time_limit;

            getCountDown(new Date().toString(), ({ remainingTime, formattedTime: { minutes, seconds } }) => {
                if (remainingTime !== 0) {
                    setRemainingTime(prevState => ({ ...prevState, [questionId]: `${minutes}:${seconds}` }));
                }
            }, timeLimit);
        }
    }, [questions, currentQuestionIndex]);

    return handler.componentLoaded && <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 relative mt-5 border-2 border-gray-00">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent">{capitalize(questions[0].assessment.title)}</h1>
                <div className="flex items-center">
                    <img
                        src={readFile(user.image)}
                        alt="User Display Picture"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-2">
                        <p className="text-sm font-semibold">{capEach(user.name)}</p>
                        <p className="text-xs text-gray-500">{capEach(user.city.name)}</p>
                    </div>
                </div>
            </div>

            <div>
                {/* Timer */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm">Time remaining</p>
                    <p className="text-lg font-semibold text-gray-800">{remainingTime[questions[currentQuestionIndex].id]}</p>
                </div>

                {/* Question */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4"> Question {currentQuestionIndex + 1} of {questions.length}</h2>
                    <p className="text-gray-700 mb-4">{capitalize(questions[currentQuestionIndex].question_text)}</p>

                    <div className="grid grid-cols-2 gap-4">
                        {questions[currentQuestionIndex].id && typeof findAnswer(questions[currentQuestionIndex].id).answer_text === 'object' && Object.entries(findAnswer(questions[currentQuestionIndex].id).answer_text).map(([key, value]) => <button
                            key={key}
                            onClick={() => setSelectedOption(key)}
                            className={`border rounded-lg p-3 text-left ${selectedOption === key
                                ? "bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white"
                                : "border-gray-300"
                                } hover:bg-blue-100 transition`}
                        >
                            {capitalize(value)}
                        </button>)}


                        {findAnswer(questions[currentQuestionIndex].id).answer_text == "true/false" && ['true', 'false'].map(value => <button
                            key={value}
                            onClick={() => setSelectedOption(value)}
                            className={`border rounded-lg p-3 text-left ${selectedOption === value
                                ? "bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white"
                                : "border-gray-300"
                                } hover:bg-blue-100 transition`}
                        >
                            {capitalize(value)}
                        </button>)}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end items-center mt-6">
                    <button
                        onClick={handleNext}
                        className="right-5 px-4 py-2 bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white rounded-lg"
                    >
                        {currentQuestionIndex === questions.length - 1 ? isLoading(handler, "Submit") : isLoading(handler, "Next")}
                    </button>
                </div>
            </div>
        </div>
    </div>
}