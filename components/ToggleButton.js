import { MinusIcon} from '@heroicons/react/outline'

export default function ToggleButton({active}) {
    return (
        <div className='flex border-2 rounded-full bg-blue-100 border-blue-100 py-[1px] px-[1px]'>
            {active ? (
                <>
                    <p className='w-6'/>
                    <p className='rounded-full h-4 w-4  bg-blue-400 border-blue-400 border-4'/>
                </>
            ) : (
                <>
                    <p className='rounded-full h-4  w-4 bg-transparent border-blue-400 border-4'></p>
                    <p className='w-6'/>
                </>
            )}
        </div>
        
    )
}