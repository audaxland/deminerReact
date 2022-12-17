/**
 * Renders a simple button
 * @param children {string|JSX.Element} button text
 * @param onClick {function} action on click
 * @param disabled {boolean} disabled status of the button
 * @returns {JSX.Element}
 * @constructor
 */
const ActionButton = ({children, onClick, disabled}) => {
    return (
        <button
            className="border border-zinc-300 flex items-center justify-center px-3 sm:w-36 h-7 sm:h-10 text-sm
            rounded-md shadow-sm text-zinc-800 bg-zinc-100/30 hover:bg-zinc-200 active:bg-zinc-300
            disabled:text-zinc-500 hover:bg-zinc-100/30"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default ActionButton;
