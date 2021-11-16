import Nav from "../../components/Nav";
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'
import Course from "../../components/Course";

export default function Courses({coursesData}) {


    return (
        <div>
            <Nav/>
            <div className='w-screen h-full bg-blue-50 pt-20 pb-5'>
                <div className='bg-white w-3/4 py-5 mx-auto px-5 rounded-lg space-y-6 shadow-sm'>
                    <div className='flex py-2 px-4 bg-gray-50 w-1/2 rounded-full mx-auto'>
                        <input className='w-full border-none outline-none bg-transparent text-gray-600 font-thin'/>
                        <SearchIcon className='h-6 font-bold p-1 bg-yellow-500 rounded-full text-gray-50 cursor-pointer hover:text-white hover:bg-yellow-400'/>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/4 border-r-[1px] border-gray-300'>
                            <div className='pl-2'>
                                <p className='text-xl mr-8 text-gray-700 p-1 font-semibold'>Sort type</p>
                                <div className='ml-2'>
                                    <form>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="1"/>
                                        <span className='ml-2'>None</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="2" />
                                        <span className='ml-2'>Desc</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="3" />
                                        <span className='ml-2'>Asc 3</span>
                                    </div>
                                    </form>                                   
                                </div>
                                <p className='text-xl mt-8 mr-8 text-gray-700 p-1 font-semibold'>Sort field</p>
                                <div className='ml-2'>
                                    <form>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="3" />
                                        <span className='ml-2'>None</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="1"/>
                                        <span className='ml-2'>Course name</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="2" />
                                        <span className='ml-2'>Course code</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="3" />
                                        <span className='ml-2'>Size</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="3" />
                                        <span className='ml-2'>Teacher name </span>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" name="radio" value="3" />
                                        <span className='ml-2'>School year</span>
                                    </div>
                                    </form>                                   
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-x-4 gap-y-4 flex-wrap w-3/4 ml-4'>
                            {coursesData.map(course => (
                                <Course key={course.id} name={course.name} createdName={course.createdName} code={course.code} size={course.size} yearStart={course.yearStart} yearEnd={course.yearEnd}/>
                            ))}
                        </div>
                    </div> 
                    <div className='w-1/2 mx-auto flex space-x-2 my-2 items-center justify-center'>
                        <ChevronLeftIcon className='h-8 text-gray-500 hover:text-yellow-500 cursor-pointer active:text-yellow-400'/>
                        <p className='pt-1 w-8 h-8 text-sm text-center rounded-full border-[1px] font-medium border-yellow-500 text-yellow-500 cursor-pointer'>1</p>
                        <p className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin cursor-pointer hover:text-yellow-400'>2</p>
                        <p className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin'>3</p>
                        <p className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin'>...</p>
                        <p className='pt-1 w-8 h-8 text-sm text-center text-gray-600 font-thin'>15</p>
                        <ChevronRightIcon className='h-8 text-gray-600'/>
                    </div>                  
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const coursesData = await fetch('http://localhost:3001/course').then((res) => res.json())

    return {
        props: {
            coursesData
        }
    }
}