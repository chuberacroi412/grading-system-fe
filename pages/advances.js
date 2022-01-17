import { useRouter } from "next/dist/client/router";
import Block from "../components/Block";
import Nav from "../components/Nav";
import {CogIcon, UserGroupIcon, DocumentDuplicateIcon, ArrowNarrowLeftIcon} from '@heroicons/react/outline'
import { useStateValue } from "../service/stateProvider";
import SignIn from "./signIn";
import Restrict from "./restrict";

export default function Advances() {

    const router = useRouter()
    const [{user, access_module}, dispatch] = useStateValue()

    const canAccess = () => {
        let modueExcept = false
        access_module.forEach(module => {
            if(module.name == 'Advances' && module.active == true)
                modueExcept = true
        });
        console.log('it is false')
        return modueExcept
    }
    return (
        <>
        {!user ? <SignIn/> :
            !canAccess() ? <Restrict/> :
            <div>
            <Nav/>
            <div className='h-screen w-full flex justify-center items-center flex-wrap'>
                <Block text='Role' onClick={() => router.push('/role/role')} icon={<CogIcon className='h-8'/>}/>
                <Block text='Manage user' icon={<UserGroupIcon className='h-8'/>}/>
                <Block text='Manage course' icon={<DocumentDuplicateIcon className='h-8 inline-flex items-center'/>}/>
                <Block text='Back' icon={<ArrowNarrowLeftIcon className='h-8' onClick={() => router.push('/')}/>}/>
            </div>
        </div> }
        </>
    )
}
