import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import ShowCourse from "../layouts/course/ShowCourse";
import AddLesson from "../layouts/lesson/AddLesson";

export default function Lesson() {
    return <Routes>
        <Route path="/" element={<ShowCourse />} />
        <Route path="/add-lesson" element={<AddLesson />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}