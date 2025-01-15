const city = Object.freeze({
    id: '',
    name: ''
});

const user = Object.freeze({
    id: '',
    name: '',
    email: '',
    role: '',
    image: '',
    created_at: '',
    updated_at: '',
    city: city
});

const course = Object.freeze({
    id: '',
    user_id: '',
    title: '',
    description: '',
    image: '',
    created_at: '',
    updated_at: '',
    user: user
});

const enrollment = Object.freeze({
    id: '',
    course_id: '',
    user_id: '',
    created_at: '',
    course: course,
    student: user
});

const lesson = Object.freeze({
    id: '',
    course_id: '',
    title: '',
    content: '',
    created_at: '',
    updated_at: '',
    course: course
});

const assessment = Object.freeze({
    id: '',
    course_id: '',
    title: '',
    type: '',
    time_limit: '',
    retakes_allowed: '',
    unlocks_at: '',
    created_at: '',
    updated_at: '',
    course: course
});

const question = Object.freeze({
    id: '',
    assessment_id: '',
    question_text: '',
    type: '',
    created_at: '',
    updated_at: '',
    assessment: assessment
})

const answer = Object.freeze({
    id: '',
    question_id: '',
    answer_text: '',
    is_correct: '',
    created_at: '',
    updated_at: '',
    question: question
});

const submission = Object.freeze({
    id: '',
    assessment_id: '',
    student_id: '',
    score: '',
    retake_count: '',
    submitted_at: '',
    student: user,
    assessment: assessment
});

const exam = Object.freeze({
    id: '',
    instructor_id: '',
    title: '',
    description: '',
    passing_percentage: '',
    time_allowed: '',
    starts_at: '',
    created_at: '',
    updated_at: '',
    instructor: user,
});

const examQuestion = Object.freeze({
    id: '',
    exam_id: '',
    question_text: '',
    answers: {
        A: '',
        B: '',
        C: '',
        D: '',
    },
    correct_option: '',
    carry_marks: '',
    created_at: '',
    updated_at: '',
    exam: exam
});

const examSubmission = Object.freeze({
    id: '',
    exam_id: '',
    student_id: '',
    total_questions: '',
    obtained_marks: '',
    total_marks: '',
    total_correct: '',
    total_wrong: '',
    created_at: '',
    updated_at: '',
    exam: exam,
    student: user
});

const progress = Object.freeze({
    id: '',
    user_id: '',
    course_id: '',
    lesson_index: '',
    progress_status: '',
    completion_percentage: '',
    created_at: '',
    updated_at: '',
    user: user,
    course: course,
    lesson: lesson
});

export default {
    user,
    enrollment,
    course,
    lesson,
    assessment,
    question,
    answer,
    submission,
    city,
    exam,
    examQuestion,
    examSubmission,
    progress
};