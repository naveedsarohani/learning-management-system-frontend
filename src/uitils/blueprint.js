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

export default { course, lesson };