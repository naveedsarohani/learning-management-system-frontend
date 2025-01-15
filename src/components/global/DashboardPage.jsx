import { useEffect } from "react"
import { capEach } from "../../uitils/functions/global"
import { useAuth } from "../../contexts/Authentication";

export default function DashboardPageCompement({ children, title }) {
  const { credentials: { user: { name } } } = useAuth();
  useEffect(() => {
    document.title = `${capEach(name)} ` + (title && `– ${capEach(title)}`);
  }, [title]); 0

  return (
    <div className="">
      <h3 className="font-bold mt-4 capitalize m-5">
        {capEach(title) ?? "Dashboard"}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  )
}
