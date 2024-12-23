import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllSubmission from "../layouts/submission/AllSubmission";
import ShowSubmission from "../layouts/submission/ShowSubmission";

export default function Submission() {
    return <Routes>
        <Route path="/" element={<AllSubmission />} />
        <Route path="/:submissionId" element={<ShowSubmission />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}