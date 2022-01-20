import Nav from "../components/Nav";
import Block from '../components/Block'
import {DocumentSearchIcon, PlusIcon, ArrowNarrowLeftIcon} from '@heroicons/react/outline'
import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import { useStateValue } from "../service/stateProvider";
import SignIn from "./signIn";
import Restrict from "./restrict";

export default function Workspace(){
    
    const router = useRouter()
    const [{user, access_module}, dispatch] = useStateValue()

    const canAccess = () => {
        let modueExcept = false
        access_module.forEach(module => {
            if(module.name == 'Workspace' && module.active == true)
                modueExcept = true
        });

        return modueExcept
    }
    return (
        <>
        {!user ? <SignIn/>: 
        !canAccess() ? <Restrict/> :
        <div>
            <Nav/>
            <div className='flex align-middle items-center h-screen w-full justify-center'>
                <Block text='Join' icon={<DocumentSearchIcon className='h-8'/>} onClick={() => router.push('/workspace/courses')} />
                <Block text='Create' icon={<PlusIcon className='h-8'/>} onClick={() => router.push('/workspace/create')}/>
                <Block className='flex-1' text='Back' icon={<ArrowNarrowLeftIcon className='h-8 mx-auto'/>} onClick={() => router.push('/')}/>
            </div>      
        </div>}
        </>
     
    )
}