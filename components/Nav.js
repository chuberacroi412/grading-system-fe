import {useRouter} from 'next/dist/client/router'
import { AcademicCapIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'

export default function Nav({isTransparent}) {

    const router = useRouter()
    const [change, setChange] = useState(false)

    useEffect(() => {
        const rollFunction = () => {
            if(window.scrollY > 100)
                setChange(true)
            else
                setChange(false)

        }

        window.addEventListener('scroll', rollFunction)

        return () => window.removeEventListener('scroll', rollFunction)
    }, [])

    return (
        <div className={`flex w-full space-x-12 text-xl font-semibold  text-white py-4 px-8 transition-colors duration-300 ease-in ${ !change && isTransparent ? 'bg-transparent' : 'bg-yellow-500 '} shadow-md  fixed z-50`}>
            <AcademicCapIcon onClick={() => router.push('/')} className='h-8 homeNav'/>
            <p className='homeNav' onClick={() => router.push('/')}>Home</p>
            <p className='homeNav' onClick={() => router.push('/account')}>Account</p>
            <p className='homeNav' onClick={() => router.push('/workspace')}>Workspace</p>
            <p className='flex-1 homeNav' onClick={() => router.push('/advances')}>Advances</p>
            <p className='homeNav' onClick={() => router.reload('/')}>Sign out</p>
        </div>
    )
}

