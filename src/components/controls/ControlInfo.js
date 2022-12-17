/**
 * Renders game information, such as time or number of flags, along with an icon
 * @param icon {JSX.Element} icon to render
 * @param value {string} information to render
 * @returns {JSX.Element}
 * @constructor
 */
const ControlInfo = ({icon, value}) => {
    return (
        <div
            className="flex items-center justify-center items-center flex-row sm:flex-col gap-1 text-zinc-800 mb-3"
        >
            <div className='text-sm sm:text-xl'>
                {icon}
            </div>
            <div className='text-sm sm:text-xl'>
                {value}
            </div>
        </div>
    );
}

export default ControlInfo;
