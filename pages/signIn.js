import { useRouter } from "next/dist/client/router"
import { AcademicCapIcon } from '@heroicons/react/outline'

export default function SignIn() {

    const router = useRouter()

    return (
        <div className='bg-yellow-200 md:h-screen h-full w-screen'>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 h-full'>
                <div className='self-center justify-self-center w-1/2'>
                    <AcademicCapIcon className='h-32 text-white '/>
                    <p className='text-2xl'>This is some short introduce</p>
                    <p className='text-light '>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
                    
                    
                </div>
                <div className=' self-center justify-self-center w-1/2 mt-6'>
                    <div className='flex flex-col w-full bg-white py-8 px-6 rounded-lg text-center'>
                        <p className='mb-4 text-lg'>Welcome to grading system</p>
                        <input className='py-1 px-4 rounded-full bg-blue-100 font-thin' type='email' placeholder='email'/>
                        <input className='py-1 px-4 rounded-full bg-blue-100 my-2 font-thin' type='password' placeholder='password'/>
                        <button className=' bg-yellow-400 py-1 px-4 text-md font-medium rounded-full mt-6 hover:bg-yellow-300'>Sign in</button>
                        <button className=' bg-gray-100 py-1 px-4 text-md font-medium rounded-full my-2 hover:bg-gray-200'>Forgot password</button>
                        <p className='font-light'>
                            <span>Does not have an account?</span>
                            <span className='hover:text-yellow-500 cursor-pointer hover:font-normal'> Create one</span>
                        </p>                       
                    </div>                     
                </div>
            </div>
        </div>
    )
}