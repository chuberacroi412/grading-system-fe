import Nav from "../components/Nav";
import Block from '../components/Block'
import {DocumentSearchIcon, PlusIcon, ArrowNarrowLeftIcon} from '@heroicons/react/outline'
import { useRouter } from "next/dist/client/router";

export default function Workspace(){
    
    const router = useRouter()
    
    return (

     <div>
            <Nav/>
            <div className='flex align-middle items-center h-screen w-full justify-center'>
                <Block text='Join' icon={<DocumentSearchIcon className='h-8'/>} onClick={() => router.push('/workspace/courses')} />
                <Block text='Create' icon={<PlusIcon className='h-8'/>} onClick={() => router.push('/workspace/create')}/>
                <Block className='flex-1' text='Back' icon={<ArrowNarrowLeftIcon className='h-8 mx-auto'/>} onClick={() => router.push('/')}/>
            </div>      
        </div>
    )
}