import { useHandler } from "../../contexts/Handler";
import { capEach, handleInputChange, separateBy } from "../../uitils/functions/global";

export default function SelectField({ data = [], name, value = null, className, selected, set = null }) {
    const { handler: { validationErrors } } = useHandler();

    return <label>
        {
            (capEach(separateBy(name, '_')))
        }: <select name={name}>
            <option
                defaultValue={true}
                disabled={true}
            >
                {value ?? 'Please choose any one of the the following'}
            </option>

            {data.map(role => <option
                defaultValue={selected === role}
                key={role}
                value={role}
                onChange={set && (e => handleInputChange(e, set))}
            >
                {capEach(role)}
            </option>)}
        </select>

        {validationErrors && <span>{validationErrors[name]}</span>}
    </label>
}