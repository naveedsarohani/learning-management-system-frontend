import { Route, Routes } from "react-router-dom";
import AllCourses from "../layouts/course/AllCourse";
import NotFound404 from "../layouts/404";
import AddCourse from "../layouts/course/AddCourse";
import EditCourse from "../layouts/course/EditCourse";
import ShowCourse from "../layouts/course/ShowCourse";

export default function Courses() {
    return <Routes>
        <Route path="/" element={<AllCourses />} />
        <Route path="/add" element={<AddCourse />} />
        <Route path="/edit/:id" element={<EditCourse />} />
        <Route path="/show/:id" element={<ShowCourse />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}