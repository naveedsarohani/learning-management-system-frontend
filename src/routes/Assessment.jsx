import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllAssessment from "../layouts/assessment/AllAssessment";
import ShowAssessment from "../layouts/assessment/ShowAssessment";
import EditAssessment from "../layouts/assessment/EditAssessment";

export default function Assessment() {
    return <Routes>
        <Route path="/" element={<AllAssessment />} />
        <Route path="/:assessmentId" element={<ShowAssessment />} />
        <Route path="/edit/:assessmentId" element={<EditAssessment />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}