import { useHandler } from "../../contexts/Handler";

export default function Form({ children, handleSubmit }) {
    const { handler } = useHandler();

    function onSubmit(e) {
        handler.setValidationErrors(false);
        e.preventDefault();

        const data = {};
        for (const [name, value] of (new FormData(e.target)).entries()) {
            data[name] = value;
        };

        handleSubmit(data);
    }

    return <form onSubmit={onSubmit}>
        {children}
    </form>
}