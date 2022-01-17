import Head from 'next/head'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import SignIn from './signIn'
import {LightningBoltIcon, ClockIcon, ChipIcon} from '@heroicons/react/outline'
import { useRouter } from "next/dist/client/router"
import { useStateValue } from '../service/stateProvider'

export default function Home() {
  const router = useRouter()
  const [{user, access_module}, dispatch] = useStateValue()
  return (   
    <>
     {console.log(user)}
     {console.log(access_module)}
    {!user ? <SignIn/>: 
    <div className="w-full">
    <Head>
      <title>Grading system</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav isTransparent={true}/>
    <Banner/>
    <main className='bg-blue-50'>
      <div className='w-5/6 mx-auto bg-white p-6 text-gray-800 space-y-6'>
        <p className='text-4xl font-semibold mt-4 pb-4 border-b-4 border-gray-300'>Why should you choose grading system ?</p>
        <div className='grid grid-cols-2 px-10'> 
        
          <LightningBoltIcon className='h-60 text-center w-full mx-auto mt-4'/>
          <div className='text-lg  mt-4'>
            <p className='text-2xl border-b-[1px] pb-2 border-gray-300'>We are really fast</p>
            <p className='mt-4'>With a using future teachnology to fast forward our page, this is some lorem to introduce about how this page can ever fast like that. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>
          </div>

          <div className='text-lg  mt-4'>
            <p className='text-2xl border-b-[1px] pb-2 border-gray-300'>We save your time</p>
            <p className='mt-4'>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          </div>
          <ClockIcon className='h-60 text-center w-full mx-auto mt-4'/>

          <ChipIcon className='h-60 text-center w-full mx-auto  mt-4'/>
          <div className='text-lg mt-4'>
            <p className='text-2xl border-b-[1px] pb-2 border-gray-300'>We always using new teachnology</p>
            <p className='mt-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy</p>
          </div>
          
          <div className='col-span-2 align-middle justify-self-center mt-8'>
            <button className='bg-yellow-500 text-base font-bold shadow-xl text-gray-50 rounded-full py-2 px-4 my-4 
                  hover:bg-yellow-400
                  hover:shadow-2xl
                  hover:text-white
                  transtition duration-150 active:scale-95 ease-out'>Rate us</button>
          </div>
        </div>
      </div>
    </main>
    <footer className='w-full bg-gray-900 text-gray-50 py-10 px-16 text-md'>
      <p className='text-2xl'>About us</p>
      <p>This is project for advances website class, not for bussiness</p>
      <p>School: Ho Chi Minh City of Science</p>
      <p>Student: La Mạnh Tuấn</p>
      <p>Id: 1712872</p>
    </footer>
  </div>}
    </>
    
  )
}
