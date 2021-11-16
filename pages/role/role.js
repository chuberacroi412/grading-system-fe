import Nav from "../../components/Nav";
import RoleItem from "../../components/RoleItem";
import { useState } from "react";
import Permission from "../../components/Permission";
import { PlusCircleIcon} from '@heroicons/react/outline'

export default function Role() {

    const [role, setRole] = useState('')
    const data = [
        {
            id: '1',
            name: 'Account',
            active: true,
            child: [
                {
                    id: '2',
                    name: 'Edit account',
                    active: true
                },
                {
                    id: '3',
                    name: 'View course',
                    active: false
                }
            ]
        },
        {
            id: '4',
            name: 'Workspace',
            active: true,
            child: [
                {
                    id: '5',
                    name: 'Create course',
                    active: true
                }
            ]
        }
    ]

    return (
        <div>
            <Nav/>
            <div className='bg-blue-50 w-full h-screen pt-20 pb-5'>
                <div className='bg-white w-3/4 py-5 mx-auto px-5 rounded-lg space-y-6 shadow-sm grid grid-cols-4'>
                    <div>
                        <p className=' text-center my-auto text-2xl font-semibold text-gray-700'>Role</p>
                    </div>
                    <div className='col-span-3'>                      
                        <p className='text-center text-2xl my-auto  font-semibold text-gray-700'>Permission</p>
                    </div>
                    <div className='border-r-[1px] border-gray-200 pr-2'>                       
                        <RoleItem name='Admin' onClick={() => setRole('Admin')} itemSelect={role}/>
                        <RoleItem name='Teacher' onClick={() => setRole('Teacher')} itemSelect={role}/>
                        <RoleItem name='Student' onClick={() => setRole('Student')} itemSelect={role}/>
                        <button className='flex items-center font-semibold justify-center shadow-md hover:shadow-lg active:shadow-xl w-full mt-4 bg-yellow-500 active:bg-yellow-300 transition-colors ease-out hover:bg-yellow-400 rounded-md text-gray-50 py-1 space-x-2'>
                            <p>Add role</p>
                            <PlusCircleIcon className='h-5'/>
                        </button>
                    </div>
                    <div className='col-span-3 mx-4'>
                        {data.map(per => (
                            <>
                                <Permission name={per.name} isParent={true} active={per.active}/>
                                {per.child.map(child => (
                                    <Permission name={child.name} isParent={false} active={child.active}/>
                                ))}   
                            </>                                                    
                        ))}
                     
                    </div>
                </div>
                
            </div>
        </div>
    )
}