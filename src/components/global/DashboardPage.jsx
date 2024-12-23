import { capEach } from "../../uitils/functions/global"

export default function DashboardPageCompement({ children, title }) {
  return (
    <div className="">
      <h3 className="font-bold mt-4 capitalize m-5">
        {capEach(title) ?? "Dashboard"}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  )
}
