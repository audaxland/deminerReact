import {useEffect, useState} from "react";

/**
 * Renders an input field to select a number
 * @param label {string} text to render next to the input element
 * @param defaultValue {number} initial value to populate in the input field
 * @param min {number} minimal number to enter
 * @param max {number} maximal number to enter
 * @param onChange {function} callback to send the entered value to the parent component
 * @returns {JSX.Element}
 * @constructor
 */
const NumberSelector = ({label, defaultValue = 0, min, max, onChange}) => {
    /**
     * @type inputValue {number} the value entered the input field
     */
    const [inputValue, setInputValue] = useState(defaultValue);

    /**
     * update the parent component with the value entered
     */
    useEffect(() => {
        if (!!onChange) onChange(inputValue);
    }, [onChange, inputValue]);

    /**
     * Sanitization function to filter the value entered by the user to match requirements
     * @param value {string|number}
     */
    const inputChange = value => {
        const newValue = Number(value.toString().replace(/[^-0-9]/, ''));
        if (value === '' || (isNaN(newValue))) return setInputValue('');
        if ((typeof min !== 'undefined') && (newValue < min) ) return setInputValue(min);
        if ((typeof max !== 'undefined') && newValue > max ) return setInputValue(max);
        setInputValue(newValue);
    }

    return (
        <div className='flex flex-row justify-between items-center gap-2'>
            {(!!label) && <label>{label}</label> }
            <div className='flex flex-row border border-stone-400 rounded-lg overflow-hidden'>
                <input
                    maxLength={max ? max.toString().length + 1 : 5}
                    className='px-3 w-20 rounded-l-lg'
                    value={inputValue}
                    onChange={e => inputChange(e.target.value)}
                    onBlur={() => (inputValue === '') && inputChange(defaultValue)}
                />
                <button
                    className={`bg-stone-200 hover:bg-stone-300 border-l border-stone-400 px-4  text-xl 
                    disabled:text-gray-400 disabled:bg-gray-200 disabled:hover:bg-gray-200`}
                    onClick={() => inputChange((isNaN(Number(inputValue)) ? 0 : Number(inputValue)) - 1)}
                    disabled={(!!min) && (inputValue <= min)}
                >
                    -
                </button>
                <button
                    className={`bg-stone-200 hover:bg-stone-300 border-l border-stone-400 px-4  text-xl 
                    disabled:text-gray-400 disabled:bg-gray-200 disabled:hover:bg-gray-200`}
                    onClick={() => inputChange((isNaN(Number(inputValue)) ? 0 : Number(inputValue)) + 1)}
                    disabled={(!!max) && (inputValue >= max)}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default NumberSelector;
