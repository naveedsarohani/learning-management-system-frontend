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

export default { course, lesson, assessment, question, answer };