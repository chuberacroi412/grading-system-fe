import Nav from "../components/Nav";
import {UserIcon, DocumentIcon, ArrowNarrowLeftIcon} from '@heroicons/react/outline'
import Block from "../components/Block";
import { useRouter } from "next/dist/client/router";

export default function Account() {

    const router = useRouter()

    return (
        <div>
           <Nav/>
            <div className='flex items-center h-screen w-full justify-center'>
                <Block text='Course' icon={<UserIcon className='h-8'/>}/>
                <Block text='About me' icon={<DocumentIcon className='h-8'/>} onClick={() => router.push('/account/aboutMe')}/>
                <Block className='flex-1' text='Back' icon={<ArrowNarrowLeftIcon className='h-8 mx-auto'/>} onClick={() => router.push('/')}/>
            </div>
        </div>
    )
}