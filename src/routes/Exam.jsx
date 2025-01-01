import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllExam from "../layouts/exam/AllExam";
import AddExam from "../layouts/exam/AddExam";
import ShowExam from "../layouts/exam/ShowExam";
import EditExam from "../layouts/exam/EditExam";
import AddQuestion from "../layouts/exam_question/AddQuestion";

export default function Exam() {
    return <Routes>
        <Route path="/" element={<AllExam />} />
        <Route path="/add" element={<AddExam />} />
        <Route path="/:examId" element={<ShowExam />} />
        <Route path="/edit/:examId" element={<EditExam />} />

        {/* question */}
        <Route path="/:examId/add-question" element={<AddQuestion />} />
        {/* <Route path="./view-question/:questionId" element={<ShowQuestion />} /> */}

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}