import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/Authentication";
import Dashboard from "./routes/dashboard";
import Student from "./routes/Student";
import NotFound404 from "./layouts/404";
import { useDelete } from "./contexts/Delete";
import { DeleteModal } from "./components/global/DeleteModal";
import { useEffect } from "react";
import { useHandler } from "./contexts/Handler";
import Profile from "./routes/Profile";

export default function App() {
  const { deletion: { isBeingDeleted }, isDeleted, setIsDeleted } = useDelete();
  const { handler: { navigate } } = useHandler();

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false);
      navigate(0);
    }
  }, [isDeleted]);

  return <>
    {isBeingDeleted && <DeleteModal />}

    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />

      <Route path="/auth/*" element={<Authentication />} />
      <Route path="/profile/*" element={<Profile />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/student-profile/*" element={<Student />} />

      {/* Unknow route */}
      <Route path="*" element={<NotFound404 />} />
    </Routes >
  </>
}