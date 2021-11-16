import { useRouter } from "next/dist/client/router";
import Block from "../components/Block";
import Nav from "../components/Nav";
import {CogIcon, UserGroupIcon, DocumentDuplicateIcon, ArrowNarrowLeftIcon} from '@heroicons/react/outline'

export default function Advances() {

    const router = useRouter()

    return (
        <div>
            <Nav/>
            <div className='h-screen w-full flex justify-center items-center flex-wrap'>
                <Block text='Role' onClick={() => router.push('/role/role')} icon={<CogIcon className='h-8'/>}/>
                <Block text='Manage user' icon={<UserGroupIcon className='h-8'/>}/>
                <Block text='Manage course' icon={<DocumentDuplicateIcon className='h-8 inline-flex items-center'/>}/>
                <Block text='Back' icon={<ArrowNarrowLeftIcon className='h-8' onClick={() => router.push('/')}/>}/>
            </div>
        </div>
    )
}
