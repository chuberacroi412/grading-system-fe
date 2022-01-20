import Nav from "../../components/Nav";
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'
import Course from "../../components/Course";
import SignIn from "../signIn";
import { useStateValue } from "../../service/stateProvider";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";

export default function Courses({coursesData}) {

    const [{user, access_module, token}, dispatch] = useStateValue()
    const router = useRouter()
    const classCodeRef = useRef(null)

    const [courses, setCourse] = useState([])
    const [pagination, setPagination] = useState(null)

    const [pageQuery, setPageQuery] = useState(0)
    const [amountQuery, setAmountQuery] = useState(10)
    const [sortQuery, setSortQuery] = useState(null)
    const [asc, setAsc] = useState(null)

    const [searchAction, setSearchAction] = useState(false) // just use to trigger search action
    const searchQuery = useRef(null)

    useEffect(() => {
        async function loadCourses() {
            const res = await fetch('http://localhost:5000/api/course', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })

            if(res.status == 200) {
                const data = await res.json()
                setPagination(data)
                setCourse(data.data)
            }
         
        }
        
        loadCourses()

    },[])

    useEffect(() => {
        async function changePage() {

            if(pagination) {
                const checkQueryPage = pageQuery
                if(checkQueryPage + 1 > pagination.totalPage) {
                    setPageQuery(checkQueryPage - 1)
                    return
                }
    
                const url = buildQueryUrl()
                const res = await fetch(url, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
        
                if(res.status == 200) {
                    const data = await res.json()
        
                    setPagination(data)
                    setCourse(data.data)
                }
            }
        }

        changePage()

    },[pageQuery, asc, sortQuery, searchAction])

    function formatDate(dateTime) {
        return Intl.DateTimeFormat('en-US').format(Date.parse(dateTime))
    }

    function buildQueryUrl() {

        // Base url
        let url = 'http://localhost:5000/api/course?'  

        // Amount
        url += 'amount=' + amountQuery

        // Page
        url += '&page=' + pageQuery

        // Sort 
        if(sortQuery && asc !== null)
            url += '&sort=' + sortQuery + asc

        // Search
        if(searchQuery.current.value != null)
            url += "&searchText=" + searchQuery.current.value

        return url;
    }

    async function Join(courseId) {

        const res = await fetch(`http://localhost:5000/api/course/join/${courseId}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({"userId": user.id})
        })

        if(res.status == 200) 
            router.push(`/workspace/${courseId}`)
        else
            res.json().then(err => alert(err.errors))
    }

    async function joinWithCode() {

        if(classCodeRef.current.value) {

            const res = await fetch(`http://localhost:5000/api/course/JoinWithCode/${classCodeRef.current.value}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({"userId": user.id})
        })

        if(res.status == 200) {
            const courseId = await res.json()
            router.push(`/workspace/${courseId}`)
        }            
        else
            res.json().then(err => alert(err.errors))
        }
        
    }

    return (
        <>
        {!user ? <SignIn/> :
        <div>
            <Nav/>
            <div className='w-screen h-full bg-blue-50 pt-20 pb-5'>
                <div className='bg-white w-3/4 py-5 mx-auto px-5 rounded-lg space-y-6 shadow-sm'>
                    <div className='flex py-2 px-4 bg-gray-50 w-1/2 rounded-full mx-auto'>
                        <input ref={searchQuery} className='w-full border-none outline-none bg-transparent text-gray-600 font-thin'/>
                        <SearchIcon onClick={() => setSearchAction(!searchAction)} className='h-6 font-bold p-1 bg-yellow-500 rounded-full text-gray-50 cursor-pointer hover:text-white hover:bg-yellow-400'/>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/4 border-r-[1px] border-gray-300'>
                            <div className='pl-2'>
                                <p className='text-xl mr-8 text-gray-700 p-1 font-semibold'>Sort type</p>
                                <div className='ml-2'>
                                    <form>
                                    <div className='flex items-center'>
                                        <input onClick={() => setAsc(null)} type="radio" name="radio" value="1"/>
                                        <span className='ml-2'>None</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input onClick={() => setAsc('_desc')} type="radio" name="radio" value="2" />
                                        <span className='ml-2'>Desc</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input onClick={() => setAsc('')} type="radio" name="radio" value="3" />
                                        <span className='ml-2'>Asc</span>
                                    </div>
                                    </form>                                   
                                </div>
                                <p className='text-xl mt-8 mr-8 text-gray-700 p-1 font-semibold'>Sort field</p>
                                <div className='ml-2'>
                                    <form>
                                    <div className='flex items-center'>
                                        <input onClick={() => setSortQuery('')} type="radio" name="radio" value="3" />
                                        <span className='ml-2'>None</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input onClick={() => setSortQuery('name')} type="radio" name="radio" value="1"/>
                                        <span className='ml-2'>Course name</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input onClick={() => setSortQuery('code')} type="radio" name="radio" value="2" />
                                        <span className='ml-2'>Course code</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input onClick={() => setSortQuery('size')} type="radio" name="radio" value="3" />
                                        <span className='ml-2'>Size</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input onClick={() => setSortQuery('school_year')} type="radio" name="radio" value="3" />
                                        <span className='ml-2'>School year</span>
                                    </div>
                                    </form>                                   
                                </div>
                                <section className="mt-6 ml-2 mr-4">
                                    <input ref={classCodeRef} placeholder="Type class code..." className=" bg-blue-100 w-full font-[350px] outline-none focus:border-[1px] rounded-md px-2 py-2 focus:border-yellow-300" />
                                    <br />
                                    <button onClick={joinWithCode} className="font-medium w-full mt-2 bg-yellow-500 outline-none text-base shadow-sm text-gray-50 rounded-lg py-2 px-4 my-4 
                                        hover:text-white
                                        hover:scale-105
                                        hover:bg-yellow-400
                                        transtition duration-150 active:scale-95 ease-out">
                                        Join with code
                                    </button>
                                </section>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-x-4 gap-y-4 flex-wrap w-3/4 ml-4'>
                            {courses.map(course => (
                                <Course key={course.id} join={Join} id={course.id} name={course.name} createdName={course.owner.firstName + course.owner.lastName} code={course.code} size={course.size} yearStart={formatDate(course.yearStart)} yearEnd={formatDate(course.yearEnd)}/>
                            ))}
                        </div>
                    </div> 
                    <div className='w-1/2 mx-auto flex space-x-2 my-2 items-center justify-center'>
                        {pagination ? 
                        <>            
                        <ChevronLeftIcon onClick={() => setPageQuery(pagination.page - +1)} className='h-8 text-gray-500 hover:text-yellow-500 cursor-pointer active:text-yellow-400'/>
                        
                        <p onClick={() => setPageQuery(0)} hidden={!(pagination.page > 1)} className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin cursor-pointer hover:text-yellow-400'>1</p>
                        <p hidden={!(pagination.page > 2)} className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin cursor-pointer hover:text-yellow-400'>...</p>
                        <p onClick={() => setPageQuery(pagination.page - +1)} hidden={pagination.page <= 0} className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin cursor-pointer hover:text-yellow-400'>{pagination.page}</p>

                        <p className='pt-1 w-8 h-8 text-sm text-center rounded-full border-[1px] font-medium border-yellow-500 text-yellow-500 cursor-pointer'>{pagination.page + +1}</p>
                        {pagination.totalPage > 1 ? 
                        <>
                            <p onClick={() => setPageQuery(pagination.page + +1)} hidden={!(pagination.totalPage - pagination.page > 1)} className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin cursor-pointer hover:text-yellow-400'>{pagination.page + +2}</p>
                            <p onClick={() => setPageQuery(pagination.page + +2)} hidden={!(pagination.totalPage - pagination.page > 2)} className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin cursor-pointer hover:text-yellow-400'>{pagination.page + +3}</p>
                            <p hidden={!(pagination.totalPage - pagination.page > 4)} className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin'>...</p>
                            <p onClick={() => setPageQuery(pagination.totalPage - +1)} hidden={!(pagination.totalPage - pagination.page > 3)} className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin cursor-pointer hover:text-yellow-400'>{pagination.totalPage}</p>
                        </>
                        :
                        <></>}

                        <ChevronRightIcon onClick={() => setPageQuery(pagination.page + +1)} className='h-8 text-gray-500 hover:text-yellow-500 cursor-pointer active:text-yellow-400'/>
                        </> : <></>}
                    </div>                  
                </div>
            </div>
        </div>
        }
        </>
    )
}
