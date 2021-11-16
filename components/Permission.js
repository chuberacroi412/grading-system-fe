
import ToggleButton from './ToggleButton'


export default function Permission({name, isParent, active}) {
    return (
        <div className={`flex justify-between items-center rounded-md text-gray-700 px-4 py-[0.4rem] cursor-pointer ${isParent ? 'bg-yellow-500 hover:bg-yellow-400' : 'hover:bg-yellow-50'}`}>
            <p className={`${isParent ? 'font-normal text-gray-50' : 'pl-4 font-light'}`}>{name}</p>
            <ToggleButton active={active}/>
        </div>
    )
}