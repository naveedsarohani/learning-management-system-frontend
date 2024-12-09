export default function Form({ children, handleSubmit }) {
    function onSubmit(e) {
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