/**
 * Renders a button as a large box with text in the middle. This is used to select the game size
 * @param text {string} main text to render
 * @param subTextBold {string} sub text to render in bold
 * @param subText {string} sub text to render as normal text
 * @param onClick {function} callback action for onClick event
 * @returns {JSX.Element}
 * @constructor
 */
const ButtonBox = ({text, subTextBold = '', subText = '', onClick}) => {
    return (
        <button
            className='flex flex-col justify-center items-center text-center bg-sky-50/50 rounded border
            border-stone-400 text-stone-800 relative hover:-top-0.5 hover:bg-sky-100/50 hover:shadow *
            hover:shadow-stone-100 hover:text-stone-900'
            type='button'
            onClick={onClick}
        >
            <h3 className='text-2xl font-bold'>
                {text}
            </h3>
            <div className='flex flex-row gap-1'>
                <h4 className='font-bold'>{subTextBold}</h4>
                <h4>{subText}</h4>
            </div>
        </button>
    );
}

export default ButtonBox;
