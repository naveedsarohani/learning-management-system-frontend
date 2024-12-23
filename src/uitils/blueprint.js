const user = Object.freeze({
    id: '',
    name: '',
    email: '',
    role: '',
    image: '',
    created_at: '',
    updated_at: ''
});

const course = Object.freeze({
    id: '',
    user_id: '',
    title: '',
    description: '',
    image: '',
    created_at: '',
    updated_at: '',
    user: {
        id: '',
        name: '',
        email: '',
        role: '',
        image: '',
        created_at: '',
        updated_at: '',
    }
});

const lesson = Object.freeze({
    id: '',
    course_id: '',
    title: '',
    content: '',
    created_at: '',
    updated_at: '',
    course: {
        id: '',
        user_id: '',
        title: '',
        description: '',
        image: '',
        created_at: '',
        updated_at: '',
    }
});

const assessment = Object.freeze({
    id: '',
    course_id: '',
    title: '',
    type: '',
    time_limit: '',
    retakes_allowed: '',
    created_at: '',
    updated_at: '',
    course: {
        id: '',
        userId: '',
        title: '',
        description: '',
        image: '',
        created_at: '',
        updated_at: ''
    }
});

const question = Object.freeze({
    id: '',
    assessment_id: '',
    question_text: '',
    type: '',
    created_at: '',
    updated_at: '',
    assessment: {
        id: '',
        course_id: '',
        title: '',
        type: '',
        time_limit: '',
        retakes_allowed: '',
        created_at: '',
        updated_at: ''
    }
})

const answer = Object.freeze({
    id: '',
    question_id: '',
    answer_text: '',
    is_correct: '',
    created_at: '',
    updated_at: '',
    question: {
        id: '',
        assessment_id: '',
        question_text: '',
        type: '',
        created_at: '',
        updated_at: '',
        assessment: {
            id: '',
            course_id: '',
            title: '',
            type: '',
            time_limit: '',
            retakes_allowed: '',
            created_at: '',
            updated_at: ''
        }
    }
});

const submission = Object.freeze({
    id: '',
    assessment_id: '',
    student_id: '',
    score: '',
    retake_count: '',
    submitted_at: '',
    student: {
        id: '',
        name: '',
        email: '',
        role: '',
        image: '',
        created_at: '',
        updated_at: ''
    },
    assessment: {
        id: '',
        course_id: '',
        title: '',
        type: '',
        time_limit: '',
        retakes_allowed: '',
        created_at: '',
        updated_at: ''
    }
});

export default { user, course, lesson, assessment, question, answer, submission };