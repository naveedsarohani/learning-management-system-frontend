import { useHandler } from "../../contexts/Handler";
import { capEach, handleInputChange, separateBy } from "../../uitils/functions/global";

export default function TextArea({ name, value = null, set, className, placeholder }) {
    const { handler: { validationErrors } } = useHandler()

    return <label>
        {/* {capEach(separateBy(name, '_'))} */}
        <textarea
            name={name}
            className={`${className}`}
            onChange={set && (e => handleInputChange(e, set))}
            placeholder={placeholder ?? ''}
        >
            {value ?? ''}
        </textarea>

        {validationErrors && <span className="text-red-500 font-normal">{validationErrors[name]}</span>}
    </label>
}