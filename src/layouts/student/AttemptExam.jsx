import React, { useEffect, useState } from "react"
import question from "../../uitils/api/exam_question"
import blueprint from "../../uitils/blueprint"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { useParams } from "react-router-dom"
import { capEach, capitalize, isLoading, isNullOrEmpty, padZero, readFile, where } from "../../uitils/functions/global"
import submission from '../../uitils/api/exam_submission';
import { DateTime } from "luxon"
import { debounce } from 'lodash';

export default function AttemptExam() {
    const [currentQuestionIndex, setCurrentQuestionindex] = useState(0)
    const [questions, setQuestions] = useState([blueprint.examQuestion])
    const [selectedOption, setSelectedOption] = useState(null)
    const [remainingTime, setRemainingTime] = useState(false);
    const [autoSubmitted, setAutoSubmitted] = useState(false);
    const [attempted, setAttempted] = useState({})
    const { credentials: { token, user } } = useAuth();
    const { handler } = useHandler();
    const { examId } = useParams();

    const handleNext = ({ autoSubmit = false }) => {
        if (autoSubmit) {
            handleSubmit(attempted);
            return;
        }

        else if (!autoSubmit && !selectedOption) return alert("Please select an option before proceeding!");

        selectedOption && setAttempted(pre => {
            return {
                ...pre,
                [currentQuestionIndex]: selectedOption
            }
        });

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionindex(prev => prev + 1);
        }

        if (currentQuestionIndex === questions.length - 1) {
            const attemptedQuestions = { ...attempted };
            if (selectedOption) {
                attemptedQuestions[currentQuestionIndex] = selectedOption
            }

            handleSubmit(attemptedQuestions);
            return;
        }

        if (attempted[currentQuestionIndex + 1]) {
            setSelectedOption(attempted[currentQuestionIndex + 1]);
        } else {
            setSelectedOption(null);
        }
    }

    const handlePrev = () => {
        setSelectedOption(attempted[currentQuestionIndex - 1])
        if (currentQuestionIndex > 0) {
            setCurrentQuestionindex(prev => prev - 1)
        }
    }

    const handleSubmit = async (attempted) => {
        const answers = Object.values(attempted);
        const correctOptions = where(questions, { getOnlyProperty: 'correct_option' })

        let totalCorrect = 0;
        let totalWrong = 0;
        let obtainedMarks = 0;

        answers.map((answer, index) => {
            if (correctOptions[index] === answer) {
                obtainedMarks += parseFloat(questions[index].carry_marks);
                totalCorrect += 1;
            }
            else totalWrong += 1;
        })

        const totalMarks = questions.reduce((value, question) => {
            return value + parseFloat(question.carry_marks);
        }, 0);

        await submission.store(token, {
            student_id: user.id, exam_id: examId,
            total_questions: questions.length,
            obtained_marks: obtainedMarks, total_marks: totalMarks,
            total_correct: totalCorrect, total_wrong: totalWrong,
        }, handler).then(() => {
            handler.navigate(-1);
        });
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (Object.keys(attempted).length > 0) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [attempted]);

    useEffect(() => {
        question.all(token, setQuestions, handler, { exam_id: examId });
    }, []);

    const handleAutoSubmit = debounce(() => {
        const examAttemptPath = /.*\/me\/exams\/\d+\/attempt$/;
        if (examAttemptPath.test(handler.location.pathname)) {
            handleNext({ autoSubmit: true });
        }
    }, 500);

    useEffect(() => {
        if (remainingTime === 'Times up!' && !autoSubmitted) {
            setAutoSubmitted(true);
            handleAutoSubmit();
        }
    }, [remainingTime, handleAutoSubmit]);

    useEffect(() => {
        if (!isNullOrEmpty(questions[currentQuestionIndex].exam.starts_at)) {
            const startTime = DateTime
                .fromSQL(questions[currentQuestionIndex].exam.starts_at)
                .plus({ minutes: questions[currentQuestionIndex].exam.time_allowed });

            const intervalId = setInterval(() => {
                const currentTime = DateTime.now();
                const diff = startTime.diff(currentTime);

                if (diff.as('seconds') <= 0) {
                    setRemainingTime('Times up!');
                    clearInterval(intervalId);
                } else {
                    const hours = Math.floor(diff.as('hours')) % 24;
                    const minutes = Math.floor(diff.as('minutes')) % 60;
                    const seconds = Math.floor(diff.as('seconds')) % 60;

                    setRemainingTime(`${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`);
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [questions]);

    return handler.componentLoaded && questions[0].exam && < div className="w-full flex justify-center items-center" >
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 relative mt-5 border-2 border-gray-00">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent">{capitalize(questions[0].exam.title)}</h1>
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
                    <p className="text-lg font-semibold text-gray-800">{remainingTime}</p>
                </div>

                {/* Question */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4"> Question {currentQuestionIndex + 1} of {questions.length}</h2>
                    <p className="text-gray-700 mb-4">{capitalize(questions[currentQuestionIndex].question_text)}</p>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-4">
                        {questions[currentQuestionIndex].answers.D && Object.entries(questions[currentQuestionIndex].answers).map(([key, value]) => <button
                            key={key}
                            onClick={() => setSelectedOption(key)}
                            className={`border rounded-lg p-3 text-left ${selectedOption === key
                                ? "bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white"
                                : "border-gray-300"
                                } hover:bg-green-100 transition`}
                        >
                            {capitalize(value)}
                        </button>)}


                        {!questions[currentQuestionIndex].answers.D && ['true', 'false'].map(value => <button
                            key={value}
                            onClick={() => setSelectedOption(value)}
                            className={`border rounded-lg p-3 text-left ${selectedOption === value
                                ? "bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white"
                                : "border-gray-300"
                                } hover:bg-green-100 transition`}
                        >
                            {capitalize(value)}
                        </button>)}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="px-4 py-2 bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white rounded-lg disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white rounded-lg"
                    >
                        {currentQuestionIndex === questions.length - 1 ? isLoading(handler, "Submit") : isLoading(handler, "Next")}
                    </button>
                </div>
            </div>
        </div>
    </div >
}