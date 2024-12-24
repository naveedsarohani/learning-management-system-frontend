import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllAssessment from "../layouts/assessment/AllAssessment";
import ShowAssessment from "../layouts/assessment/ShowAssessment";
import EditAssessment from "../layouts/assessment/EditAssessment";
import AddQuestion from '../layouts/question/AddQuestion';
import AddAssessment from "../layouts/assessment/AddAssessment";
import ShowQuestion from "../layouts/question/ShowQuestion";

export default function Assessment() {
    return <Routes>
        <Route path="/" element={<AllAssessment />} />
        <Route path="/add" element={<AddAssessment />} />
        <Route path="/:assessmentId" element={<ShowAssessment />} />
        <Route path="/:assessmentId/add-question" element={<AddQuestion />} />
        <Route path="/edit/:assessmentId" element={<EditAssessment />} />

        {/* question */}
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/view-question/:questionId" element={<ShowQuestion />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}