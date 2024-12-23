import { Route, Routes } from "react-router-dom";
import NotFound404 from "../layouts/404";
import AllAnswer from "../layouts/answer/AllAnswer";
import ShowAnswer from "../layouts/answer/ShowAnswer";

export default function Answer() {
    return <Routes>
        <Route path="/" element={<AllAnswer />} />
        <Route path="/:answerId" element={<ShowAnswer />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}