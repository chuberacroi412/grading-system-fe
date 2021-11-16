import { ArrowCircleRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'

export default function RoleItem({name, itemSelect, onClick}) {

    return (
        <div className={` group text-lg cursor-pointer ${itemSelect == name ? `font-semibold text-yellow-400 border-yellow-400 bg-yellow-50 border-md` : 'font-normal text-gray-700 hover:text-gray-500 '} flex justify-between items-center border-b-[1px] border-gray-200 px-4 py-2 `}
                        onClick={onClick}>
            <p>{name}</p>
            <div className={`flex space-x-2 ${itemSelect == name ? `visible` : 'invisible'} group-hover:visible`}>
                <PencilAltIcon className='h-5' />
                <TrashIcon className='h-5' />
            </div>
            
        </div>
    )
}