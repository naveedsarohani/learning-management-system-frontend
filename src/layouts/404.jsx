import { useHandler } from "../contexts/Handler"

export default function NotFound404() {
    const { handler: { location, navigate } } = useHandler();

    return <div>
        <h1>404 | The Route [{location.pathname}] not found</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
}