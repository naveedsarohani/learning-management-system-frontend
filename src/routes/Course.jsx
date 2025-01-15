import { Route, Routes } from "react-router-dom";
import AllCourses from "../layouts/course/AllCourse";
import NotFound404 from "../layouts/404";
import AddCourse from "../layouts/course/AddCourse";
import EditCourse from "../layouts/course/EditCourse";
import ShowCourse from "../layouts/course/ShowCourse";
import EditLesson from "../layouts/lesson/EditLesson";
import AddLesson from "../layouts/lesson/AddLesson";
import AddAssessment from "../layouts/assessment/AddAssessment";
import EditAssessment from "../layouts/assessment/EditAssessment";
import ShowAssessment from "../layouts/assessment/ShowAssessment";
import ShowLesson from "../layouts/lesson/ShowLesson";
import AddQuestion from '../layouts/question/AddQuestion';

export default function Courses() {
    return <Routes>
        <Route path="/" element={<AllCourses />} />
        <Route path="/:courseId" element={<ShowCourse />} />
        <Route path="/add" element={<AddCourse />} />
        <Route path="/edit/:courseId" element={<EditCourse />} />
        <Route path="/edit/:courseId" element={<EditCourse />} />

        {/* lesson */}
        <Route path="/:courseId/add-lesson" element={<AddLesson />} />
        <Route path="/:courseId/edit-lesson/:lessonId" element={<EditLesson />} />
        <Route path="/:courseId/view-lesson/:lessonId" element={<ShowLesson />} />
        <Route path="/:courseId/view-lesson/:lessonId/add-lesson" element={<AddLesson />} />
        
        {/* assessment */}
        <Route path="/:courseId/add-assessment" element={<AddAssessment />} />
        <Route path="/:courseId/edit-assessment/:assessmentId" element={<EditAssessment />} />
        <Route path="/:courseId/view-assessment/:assessmentId" element={<ShowAssessment />} />
        <Route path="/:courseId/view-assessment/:assessmentId/add-question" element={<AddQuestion />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}