import { capEach } from "../../uitils/functions/global";

export default function DashboardPageCompement({ children, title }) {
    return <div>
        <h3>{capEach(title) ?? 'Dashboard'} </h3>
        {children}
    </div>
}