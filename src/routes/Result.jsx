import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllResult from "../layouts/result/AllResult";
import ShowResult from "../layouts/result/ShowResult";

export default function Result() {
    return <Routes>
        <Route path="/" element={<AllResult />} />
        <Route path="/:resultId" element={<ShowResult />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}