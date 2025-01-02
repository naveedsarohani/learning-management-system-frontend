import { capitalize } from "../../uitils/functions/global";

export default function NoContent({ message = 'No content found in the database' }) {
    return <h1>{capitalize(message)}</h1>
}