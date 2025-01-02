import React, { useState, useEffect } from 'react'
import blueprint from '../../uitils/blueprint'
import courseapi from '../../uitils/api/course'
import lesson from '../../uitils/api/lesson'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/Authentication'
import { useHandler } from '../../contexts/Handler'
import { capEach, capitalize, formatDate, isNullOrEmpty, readFile } from '../../uitils/functions/global'
import NoContent from '../../components/global/NoContent'
import LessonCard from '../../components/global/LessonCard'

const Course = () => {
    const { courseId } = useParams();
    const { credentials: { token } } = useAuth();
    const { handler } = useHandler();
    const [course, setCourse] = useState(blueprint.course);
    const [lessons, setLessons] = useState([blueprint.lesson]);

    useEffect(() => {
        courseapi.show(courseId, token, setCourse, handler);
        lesson.all(token, setLessons, handler, { course_id: courseId })
    }, []);


    return (
        <div className="course-page">
            <div className="course-header">
                <img src={readFile(course.image)} alt={course.title} />
                <div className="course-info">
                    <h1>{capitalize(course.title)}</h1>
                    <p>{capitalize(course.description)}</p>
                    <p>
                        Created by{' '}
                        <span>
                            {capEach(course.user.name)} ({capitalize(course.user.role)})
                        </span>
                    </p>
                    <div className="course-meta">
                        <p>
                            <strong>ID:</strong> {course.id}
                        </p>
                        <p>
                            <strong>Created at:</strong> {formatDate(course.created_at)}
                        </p>
                        <p>
                            <strong>Updated at:</strong> {course.updated_at}
                        </p>
                    </div>
                </div>
            </div>
            <div className="course-content">
                <h2>Course Content</h2>
                <div>
                    {!isNullOrEmpty(lessons[0].id)
                        ? lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)
                        : <NoContent message='There are not lessons for this course' />}
                </div>
            </div>
            <div className="enroll-button">
                <button>Enroll Now</button>
            </div>
        </div>
    );
};

export default Course;