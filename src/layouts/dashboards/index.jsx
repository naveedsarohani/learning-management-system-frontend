import DashboardPageCompement from "../../components/global/DashboardPage"
import { useDelete } from "../../contexts/Delete"

export default function DashboardHomePage() {
  const {destory} = useDelete();

  function handleDelete(){
    destory('/courses', 59, "Php laravel course");
  }

  return (
    <DashboardPageCompement title={""}>
      <h1>This is a dashboard page components</h1>
      <button onClick={handleDelete}>Delete</button>
    </DashboardPageCompement>
  )
}
