import { useHandler } from "../../contexts/Handler";
import { capEach, handleInputChange, separateBy } from "../../uitils/functions/global";

export default function InputField({ type, name, value = null, className, placeholder, accept, set = null }) {
    const { handler: { validationErrors } } = useHandler();

    return <label>
        {
            (capEach(separateBy(name, '_')))
        }: <input
            className={className ?? 'form-control'}
            type={type ?? ''}
            name={name}
            onChange={set && (e => handleInputChange(e, set))}
            placeholder={placeholder ?? ''}
            value={value}
            accept={accept ?? ''}
        />

        {validationErrors && <span>{validationErrors[name]}</span>}
    </label>
}