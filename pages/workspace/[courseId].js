import { useRouter } from "next/dist/client/router"
import { useRef, useState } from "react"
import { useEffect } from "react/cjs/react.development"
import Nav from "../../components/Nav"
import { useStateValue } from "../../service/stateProvider"
import { BadgeCheckIcon, StarIcon} from '@heroicons/react/solid'
import { XCircleIcon} from '@heroicons/react/outline'
import { TrashIcon } from "@heroicons/react/solid";

export default function CourseDetail() {

    const [{user, access_module, token}, dispatch] = useStateValue()
    const router = useRouter()
    const {courseId} = router.query

    const inviteUserCode = useRef(null)
    const nameComponentRef = useRef(null)
    const percentComponentRef = useRef(0)

    const [course, setCourse] = useState()
    const [isMember, setIsMember] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [clone, setClone] = useState(null)
    const [inviteLinkDisplay, setInviteLinkDisplay] = useState(false)
    const [trigger, setTrigger] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    const [displayEdit, setDisplayEdit] = useState(false)

    useEffect(() => {
        async function getCourse() {
            const res = await fetch(`http://localhost:5000/api/course/${courseId}/${user.id}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(res.status == 200) {
                const data = await res.json()

                setCourse(data)
                setIsMember(data.isMember)
                setIsOwner(data.owner.id == user.id)
                setClone(data.scores)
            }
        }

        getCourse()
    }, [])

    useEffect(() => {

    },[trigger])


    async function Join() {
        setTrigger(!trigger)

        const joinRes = await fetch(`http://localhost:5000/api/course/join/${courseId}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({"userId": user.id})
        })

        if(joinRes.status == 200) {
            const res = await fetch(`http://localhost:5000/api/course/${courseId}/${user.id}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(res.status == 200) {
                const data = await res.json()

                setCourse(data)
                setIsMember(data.isMember)
                setIsOwner(data.owner.id == user.id)
            }
        }
    }

    async function invite() {
        if(inviteUserCode.current.value) {
            const inviteUrl = `http://localhost:3000/workspace/${courseId}`
            await fetch(`http://localhost:5000/api/course/invite/${courseId}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    url: inviteUrl,
                    code: inviteUserCode.current.value
                })
            }).then(res => {
                inviteUserCode.current.value = ''
                if(res.status != 200) {
                    res.json().then(err => alert(err.errors))
                }
            })
        }
    }

    function sumPercent(componentScore) {
        let sum = componentScore

        clone.forEach(item => sum = sum + +item.percent )

        return sum
    }

    function add() {
        let dummy = clone.slice()
        const sum = sumPercent(+percentComponentRef.current.value)

        if(nameComponentRef.current.value && percentComponentRef.current.value > 0) {
            if(sum <= 100) {
                dummy.push(
                    {
                        id: null,
                        name: nameComponentRef.current.value,
                        active: false,
                        percent: percentComponentRef.current.value,
                        type: 0,
                        point: 0
                    })

                setClone(dummy)
                setDisplayError(false)
                nameComponentRef.current.value = ''
                percentComponentRef.current.value = 0
            }
            else 
                setDisplayError(true)
        }
    }

    async function saveChange() {
        const sum = sumPercent(+0)

        if(sum == 100) {
            let body = {}
            body.data = []
            clone.forEach(item => {
                body.data.push({
                    id: item.id,
                    name: item.name,
                    percent: item.percent,
                    type: item.type,
                    active: item.active
                })
            })

            setDisplayError(false)
            setDisplayEdit(false)
            nameComponentRef.current.value = ''
            percentComponentRef.current.value = 0
            const url = `http://localhost:5000/api/course/${courseId}`
            const res = await fetch(url, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            if(res.status == 200) {
                const result = await fetch(`http://localhost:5000/api/course/${courseId}/${user.id}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
    
                if(result.status == 200) {
                    const data = await result.json()
    
                    setCourse(data)
                    setIsMember(data.isMember)
                    setIsOwner(data.owner.id == user.id)
                    setClone(data.scores)
                }
            }
            else 
                res.json().then(err => alert(err.errors))
        }
        else 
            setDisplayError(true)
    }

    function removeIndex(index) {
        let dummy = clone.slice()
        dummy.splice(index, 1)

        setClone(dummy)
    }

    function cancel() {
        setClone(course.scores)
        setDisplayError(false)
        setDisplayEdit(false)
        nameComponentRef.current.value = ''
        percentComponentRef.current.value = 0
    }

    return (
        <div>
            <Nav/>
            <div className="fixed px-6 py-4 shadow-lg  bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg top-1/2 left-1/3 mx-auto" hidden={!inviteLinkDisplay}>
                <div className="text-gray-50 text-xl mb-2 flex justify-between items-center">
                    <p>Use this link to invite other people</p>
                    <XCircleIcon onClick={() => setInviteLinkDisplay(false)} className="h-7 cursor-pointer text-gray-200 hover:text-white"/>
                </div>
                <p className="text-blue-500 bg-white rounded-lg px-4 py-2">http://localhost:3000/workspace/{courseId}</p>
            </div>

            <div className='w-screen h-full  bg-blue-50 pt-20 pb-5'>              
                <div className='w-10/12 mx-auto'>
                    <div className="w-full py-5 px-5 pb-40 bg-gradient-to-r from-blue-500 to-yellow-200 text-gray-50 rounded-lg space-y-6 shadow-sm">
                        <h1 className=" text-5xl font-semibold">{course ? course.name : ''}</h1>
                        <h4 className="text-3xl">{course ? course.code : ''}</h4>
                        { isOwner ?
                        <>
                            <section className="w-1/6 flex justify-center rounded-md whitespace-normal space-x-2 border-yellow-300 border-2 py-2 px-4">
                                <p className="text-yellow-300 font-semibold">Owner</p>
                                <StarIcon className="h-6 text-yellow-300"/>
                            </section>
                        </>
                        : isMember ? 
                        <>
                            <section className="w-1/6 flex justify-center rounded-md whitespace-normal space-x-2 border-gray-50 border-2 py-2 px-4">
                                <p>Member</p>
                                <BadgeCheckIcon className="h-6"/>
                            </section>
                        </>:
                        <>
                            <button onClick={Join} className="shadow-md transition duration-150 text-xl font-medium bg-transparent py-2 px-4 rounded-md hover:bg-blue-400 hover:lg hover:scale-105 active:scale-95">Join</button>
                        </>}
                    </div>
                    <div className="flex mt-4">
                        <div className=" w-[20%]">
                            <div className="w-full ">
                                <section className="space-y-2 bg-white p-4 rounded-md mt-2 shadow-sm">
                                    <button className="w-full bg-yellow-500 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4 my-2
                                        hover:text-white
                                        hover:scale-105
                                        hover:bg-yellow-400
                                        transtition duration-150 active:scale-95 ease-out">
                                        View scoreboard
                                    </button>
                                    <button className="w-full bg-yellow-500 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4 my-2 
                                        hover:text-white
                                        hover:scale-105
                                        hover:bg-yellow-400
                                        transtition duration-150 active:scale-95 ease-out">
                                        View report
                                    </button>
                                    <button className="w-full bg-yellow-500 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4 my-2
                                        hover:text-white
                                        hover:scale-105
                                        hover:bg-yellow-400
                                        transtition duration-150 active:scale-95 ease-out">
                                        Report
                                    </button>
                                </section> 
                                {course && course.scores.length > 0 ? 
                                <>
                                    <section hidden={displayEdit} className="bg-white p-4 rounded-md mt-4 shadow-sm">
                                        <p className="my-2 text-xl pb-1 mb-1 border-b-2 border-gray-300">Score Component</p>
                                        {course.scores.map((item, index) => (
                                            <div key={index} className="my-2 flex justify-between">
                                                <p>{item.name} ({item.percent}%)</p>
                                                <p>{item.point}/10</p>                                               
                                            </div>
                                        ))}

                                        <button onClick={() => setDisplayEdit(true)} className="mt-4 w-full bg-yellow-500 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4
                                            hover:text-white
                                            hover:scale-105
                                            hover:bg-yellow-400
                                            transtition duration-150 active:scale-95 ease-out">
                                            Edit
                                        </button>
                                    </section>
                                    <section hidden={!displayEdit} className="bg-white p-4 rounded-md mt-4 shadow-sm">
                                        <p className="my-2 text-xl pb-1 mb-1 border-b-2 border-gray-300">Edit score Component</p>
                                        {clone ? clone.map((item, index) => (
                                            <div key={index} className="my-2 flex justify-between">
                                                <p>{item.name}</p>
                                                <div className="flex items-center gap-x-1">
                                                <p>{item.percent}%</p>
                                                {item.type == 0 ? 
                                                    <TrashIcon onClick={() => removeIndex(index)} className="h-4 text-red-600 cursor-pointer hover:text-red-400"/>
                                                    :<></>
                                                }                                             
                                                </div>
                                                
                                            </div>
                                        )) : <> </>}
                                        <section className="flex pt-4 mt-2 border-t-2 border-gray-300 mb-2">
                                            <p className="w-1/4">Name</p>
                                            <input ref={nameComponentRef} type='text' className="w-3/4 bg-blue-100 font-[350px] outline-none focus:border-[1px] rounded-md px-2 py-1 focus:border-yellow-300"/>                                          
                                        </section>
                                        <section className="flex pb-4 mb-2 border-b-2 border-gray-300">
                                            <p className="w-1/4">Scale</p>
                                            <input ref={percentComponentRef} type='number' className="w-3/4 bg-blue-100 font-[350px] outline-none focus:border-[1px] rounded-md px-2 py-1 focus:border-yellow-300"/>                                          
                                        </section>
                                        <p hidden={!displayError}>*Total scale must be 100%</p>
                                        <button onClick={add} className="mt-4 w-full bg-yellow-500 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4
                                            hover:text-white
                                            hover:scale-105
                                            hover:bg-yellow-400
                                            transtition duration-150 active:scale-95 ease-out">
                                            Add
                                        </button>
                                        <button onClick={saveChange} className="mt-4 w-full bg-yellow-500 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4
                                            hover:text-white
                                            hover:scale-105
                                            hover:bg-yellow-400
                                            transtition duration-150 active:scale-95 ease-out">
                                            Save
                                        </button>
                                        <button onClick={cancel} className="mt-4 w-full bg-gray-400 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4
                                            hover:text-white
                                            hover:scale-105
                                            hover:bg-gray-300
                                            transtition duration-150 active:scale-95 ease-out">
                                            Cancel
                                        </button>
                                    </section>
                                </> 
                                : 
                                <></>}
                                                                  
                            </div>
                        </div>
                        <div className=" w-[60%] mx-4">
                            <div className="w-full bg-white px-4 pt-4 rounded-md mt-4 shadow-sm ">
                                <section className="space-y-2">
                                    <p className=" text-xl pb-1 mb-1 border-b-2 border-gray-300">New post</p>
                                    <textarea placeholder="Write something..." className=" w-full bg-blue-50 rounded-md px-4 py-2" />
                                    <section className=" flex justify-end text-xl border-t-2 border-gray-300">
                                        <button className="bg-yellow-500 outline-none text-base font-normal shadow-sm text-gray-50 rounded-md py-2 px-4 my-2
                                        hover:text-white
                                        hover:scale-105
                                        hover:bg-yellow-400
                                        transtition duration-150 active:scale-95 ease-out">Post</button>
                                    </section>
                                </section>
                            </div>
                            <div className="w-full bg-white px-4 pt-4 rounded-md mt-4 shadow-sm p-4">
                                <section className="space-y-2">
                                    <section className="flex justify-between mx-4 items-center pb-1 mb-1 border-b-2 border-gray-300">
                                        <p className=" text-xl">Author</p>
                                        <p className=" text-sm">20/1/2020</p>
                                    </section>                   
                                    <p className="overflow-hidden w-full rounded-md px-4 py-2">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets co</p>
                                </section>
                            </div>
                        </div>
                        <div className="w-[20%]">
                            <div className="w-full bg-white p-4 rounded-md mt-4 shadow-sm">
                                <button onClick={() => setInviteLinkDisplay(true)} className="w-full bg-yellow-500 outline-none text-base font-medium shadow-sm text-gray-50 rounded-lg py-2 px-4 my-4 
                                    hover:text-white
                                    hover:scale-105
                                    hover:bg-yellow-400
                                    transtition duration-150 active:scale-95 ease-out">
                                    Generate invite link
                                </button>
                                <section className="mt-6">
                                    <input ref={inviteUserCode} placeholder="Type user code..." className=" bg-blue-100 w-full font-[350px] outline-none focus:border-[1px] rounded-md px-2 py-2 focus:border-yellow-300" />
                                    <br />
                                    <button onClick={invite} className="font-medium w-full mt-2 bg-yellow-500 outline-none text-base shadow-sm text-gray-50 rounded-lg py-2 px-4 my-4 
                                        hover:text-white
                                        hover:scale-105
                                        hover:bg-yellow-400
                                        transtition duration-150 active:scale-95 ease-out">
                                        Invite people
                                    </button>
                                </section>
                            </div>
                            <div className="w-full bg-white p-4 rounded-md mt-4 shadow-sm">
                                <section className="space-y-2">
                                    <p className=" text-xl pb-1 mb-1 border-b-2 border-gray-300">Owner</p>
                                    {course ? `${course.owner.firstName}  ${course.owner.lastName}` : <></>}
                                </section>
                                {course && course.accounts.length > 0 ? 
                                <>
                                <section className="mt-2 space-y-2">
                                    <p className="text-xl pb-1 mb-1 border-b-2 border-gray-300">Member</p>
                                    {course.accounts.map((item, index) => (
                                        <p key={index}>{`${item.lastName}  ${item.firstName}`}</p>
                                    ))}
                                </section>   
                                </>
                                : 
                                <></> }
                                                        
                            </div>
                            
                            
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    )
}