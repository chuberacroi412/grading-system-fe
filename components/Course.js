import Image from 'next/image'
import { CalendarIcon, IdentificationIcon, UserGroupIcon, CodeIcon, PlusCircleIcon} from '@heroicons/react/outline'


export default function Course({name, createdName, yearStart, yearEnd, code, size}) {


    return (
        <div className='group border-[1px] border-gray-300 bg-white shadow-sm rounded-lg hover:border-yellow-500 hover:scale-105 transition transform duration-150 ease-out hover:opacity-80'>
            <div className='p-4'>
                <div className='py-2 font-semibold border-b-2 text-lg border-gray-300'> 
                    <p>{name}</p>
                </div>
                <div className='grid grid-cols-3 my-2 font-thin text-md space-y-1'>
                    <IdentificationIcon className='h-6 text-center'/>
                    <p className=' col-span-2'>{createdName}</p>
                    <CalendarIcon className='h-6'/>
                    <p className='text-sm col-span-2'>{yearStart} - {yearEnd}</p>
                    <UserGroupIcon className='h-6'/>
                    <p className=' col-span-2'>{size} people</p>
                    <CodeIcon className='h-6'/>
                    <p className='col-span-2'>{code}</p>
                </div>
            </div>
            
            <div className=' justify-center items-center space-x-4 flex h-full bg-yellow-500 w-0  overflow-hidden text-gray-50 rounded-lg absolute right-0 top-0 duration-500 transition-all group-hover:w-1/2 group-hover:border-2 group-hover:border-yellow-500 cursor-pointer'>
                <PlusCircleIcon className='h-6 '/>
                <p>Join</p>
            </div>
        </div>
    )
}