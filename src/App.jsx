import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/Authentication";
import Dashboard from "./routes/dashboard";
import Student from "./routes/Student";
import NotFound404 from "./layouts/404";

export default function App() {
  return <Routes>
    <Route path="/" element={<h1>Home Page</h1>} />
    <Route path="/auth/*" element={<Authentication />} />
    <Route path="/dashboard/*" element={<Dashboard />} />
    <Route path="/student-profile/*" element={<Student />} />

    {/* Unknow route */}
    <Route path="*" element={<NotFound404 />} />
  </Routes >
}