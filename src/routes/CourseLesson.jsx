import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import ShowCourse from "../layouts/course/ShowCourse";
import AddLesson from "../layouts/lesson/AddLesson";
import EditLesson from "../layouts/lesson/EditLesson";

export default function CourseLesson() {
    return <Routes>
        <Route path="/" element={<ShowCourse />} />
        <Route path="/add-lesson" element={<AddLesson />} />
        <Route path="/edit-lesson/:lessonId" element={<EditLesson />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}