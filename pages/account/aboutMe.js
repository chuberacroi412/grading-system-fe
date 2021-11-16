import Nav from "../../components/Nav";
import Image from 'next/image'
import { FireIcon, SparklesIcon} from '@heroicons/react/solid'
import {CakeIcon, CreditCardIcon  ,UserIcon} from '@heroicons/react/outline'


export default function AboutMe() {

    return (
        <div>
            <Nav/>
            <div className='w-screen h-screen bg-blue-50 pt-20 pb-5 font-light text-gray-900'>
                <div className='grid grid-cols-4 bg-white w-3/4 py-5 mx-auto px-5 rounded-lg space-y-6 shadow-sm'>
                    <div className='space-y-2'>
                        <div className='relative h-[170px]'>
                            <Image src='https://wallpaperaccess.com/full/6107194.jpg' layout='fill' objectFit='contain'/>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <UserIcon className='h-6'/>
                            <p className='inline-flex'> Kaz Brekker</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <CakeIcon className='h-6'/>
                            <p className='inline-flex'>27-01-1999</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <CreditCardIcon className='h-6'/>
                            <p className='inline-flex'>123456</p>
                        </div>
                        <button className='text-gray-50 text-base font-bold shadow-lg bg-yellow-500 rounded-xl py-2 px-4 my-4 
                                hover:bg-yellow-400
                                hover:shadow-2xl
                                hover:text-white
                                transtition duration-100 active:scale-95 ease-out w-full
                                '>
                            Edit
                        </button>
                    </div>
                    <div className='col-span-3 ml-8'>
                        <div className='border-b-2 pb-2 border-gray-400'>
                            <div className='flex items-center'>
                                <p className='font-semibold text-3xl'>Your study archive</p>
                                <FireIcon className='h-8 text-red-600' />
                                <FireIcon className='h-8 text-red-600' />
                            </div>
                            <p className='inline-flex mr-1 font-normal text-gray-600'>Beginner</p>
                            <SparklesIcon className='text-yellow-400 h-4 inline-flex'/>
                        </div>
                        <ul className=' list-disc ml-4 my-4 space-y-4 font-normal text-lg'>
                            <li>Total course: 120</li>
                            <li>Course complete: 100</li>
                            <li>Course in process: 20</li>
                            <li>Average score: 8.5</li>
                            <li>Time get summary score of course greater than 9.0 : 2</li>
                            <li>Time get summary score of course equal 10 : 1</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}