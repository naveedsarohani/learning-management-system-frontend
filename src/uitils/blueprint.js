const user = Object.freeze({
    id: '',
    name: '',
    email: '',
    role: '',
    image: '',
    created_at: '',
    updated_at: '',
    city: {
        id: '',
        name: ''
    }
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

const city = Object.freeze({
    id: '',
    name: ''
});

const exam = Object.freeze({
    id: '',
    instructor_id: '',
    title: '',
    description: '',
    passing_percentage: '',
    time_allowed: '',
    total_retakes: '',
    created_at: '',
    updated_at: '',
    instructor: {
        id: '',
        name: '',
        email: '',
        role: '',
        image: '',
        city_id: '',
        created_at: '',
        updated_at: '',
    },
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
    } ?? '',
    correct_option: '',
    carry_marks: '',
    created_at: '',
    updated_at: '',
    exam: {
        id: '',
        instructor_id: '',
        title: '',
        description: '',
        passing_percentage: '',
        time_allowed: '',
        total_retakes: '',
        created_at: '',
        updated_at: '',
        instructor: {
            id: '',
            name: '',
            email: '',
            role: '',
            image: '',
            city_id: '',
            created_at: '',
            updated_at: '',
        },
    },
});

const examSubmission = Object.freeze({
    id: '',
    exam_id: '',
    student_id: '',
    obtained_marks: '',
    retakes_count: '',
    is_passed: '',
    created_at: '',
    updated_at: '',
    exam: {
        id: '',
        instructor_id: '',
        title: '',
        description: '',
        passing_percentage: '',
        time_allowed: '',
        total_retakes: '',
        created_at: '',
        updated_at: '',
        instructor: {
            id: '',
            name: '',
            email: '',
            role: '',
            image: '',
            city_id: '',
            created_at: '',
            updated_at: '',
        },
    },
    student: {
        id: '',
        name: '',
        email: '',
        role: '',
        image: '',
        city_id: '',
        created_at: '',
        updated_at: '',
        city: {
            id: '',
            name: '',
        },
    },
});

export default {
    user,
    course,
    lesson,
    assessment,
    question,
    answer,
    submission,
    city,
    exam,
    examQuestion,
    examSubmission
};