import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllQuestion from "../layouts/question/AllQuestion";
import ShowQuestion from "../layouts/question/ShowQuestion";
import EditQuestion from "../layouts/question/EditQuestion";

export default function Question() {
    return <Routes>
        <Route path="/" element={<AllQuestion />} />
        <Route path="/:questionId" element={<ShowQuestion />} />
        <Route path="/edit/:questionId" element={<EditQuestion />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}