import {DocumentSearchIcon, PlusIcon, ArrowNarrowLeftIcon} from '@heroicons/react/outline'

export default function Block({text, icon, onClick}) {
    return (
        <div className='space-y-2 m-2 text-center cursor-pointer' onClick={onClick}>
            <div className='group'>
                <div className='border-gray-600 text-gray-600 m-2 border-2 border-dashed p-6 group-hover:text-yellow-500 group-hover:border-yellow-500 group-active:text-yellow-400 group-active:border-yellow-400'>
                    {icon}   
                </div>
                <p className='text-gray-600 group-hover:text-yellow-500 text-lg font-medium group-active:text-yellow-400'>{text}</p>
            </div>
        </div>
    )
}