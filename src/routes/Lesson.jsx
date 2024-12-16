import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllLesson from "../layouts/lesson/AllLesson";
import ShowLesson from "../layouts/lesson/ShowLesson";
import EditLesson from "../layouts/lesson/EditLesson";

export default function Lesson() {
    return <Routes>
        <Route path="/" element={<AllLesson />} />
        <Route path="/:lessonId" element={<ShowLesson />} />
        <Route path="/edit/:lessonId" element={<EditLesson/>} />


        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}