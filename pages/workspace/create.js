import Nav from "../../components/Nav";
import { useState, useEffect } from "react";

export default function Create() {

    const [generalData, setGeneralData] = useState(['', '', '', '', ''])
    const [scores, setScores] = useState([])
    const [sum, setSum] = useState(0)
    const [mid, setMid] = useState(0)
    const [final, setFinal] = useState(0)
    const [componentScore, setComponentScore] = useState(0)
    const [componentName, setComponentName] = useState('')

    useEffect(() => {
        let allScore = 0

        if(scores.length > 0)
            scores.forEach(score => allScore = +allScore + +score.percent)

        setSum(+mid + +final + +allScore)
    }, [mid, final, scores])

    const addScore = () => {
        if(componentScore > 0 && componentName != null && componentName !== '') {
        
            if(sum + +componentScore > 100) {
                alert('You can not do it')
            }
            
            else{
                setScores(scores => scores.concat(
                    {
                        name: componentName,
                        percent: +componentScore
                    }))

                setComponentScore(0)
                setComponentName('')
            }

        }       
    }
    const postCourse = () => {
        const name = document.getElementById('name').value
        const code = document.getElementById('code').value
        const size = document.getElementById('size').value
        const yearStart = document.getElementById('yearStart').value
        const yearEnd = document.getElementById('yearEnd').value
        const body = JSON.stringify({
            "name": name,
            "code": code,
            "createdName" : 'Louis',
            "yearStart":yearStart,
            "yearEnd":yearEnd,
            "size":size
        })

        fetch('http://localhost:3001/course', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: body
        })
    }

    return (
        <div>
            <Nav/>
            <div className='bg-blue-50 w-full h-full pt-20 pb-5'>
                <div className='bg-white w-[950px] py-5 mx-auto px-5 rounded-lg space-y-6 shadow-sm'>
                    <div>
                        <p className='text-gray-800 text-3xl font-semibold border-b-2 pb-2'>Sumary Infomation</p>
                        <div className='space-y-4 pt-4 px-8'>
                            <div className='createCourseBlock'>                               
                                <p className='createCourseLabel'>Name </p>
                                <input className='createCourseInput' id='name'
                                    placeholder='Course name'                                   
                                    />
                            </div>
                            <div className='createCourseBlock'>
                                <p className='createCourseLabel' >Code</p>
                                <input className='createCourseInput' id='code'
                                    placeholder='Course code'
                                    />
                            </div>
                            <div className='createCourseBlock'>
                                <p className='createCourseLabel' >Size</p>
                                <input className='createCourseInput' id='size'
                                    placeholder='Course size' type='number' min={0} defaultValue={0}
                                    />
                            </div>
                            <div className='createCourseBlock'>
                                <p className='createCourseLabel'>School year</p>
                                <p className='font-thin'>from: </p>
                                <input className='createCourseInput'
                                    placeholder='from year' type='date' id='yearStart'
                                    
                                    />
                                <p className='font-thin'>to: </p>
                                <input className='createCourseInput'
                                    placeholder='to year' type='date' id='yearEnd'
                                    />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-800 text-3xl font-semibold border-b-2 pb-2'>Score components</p>
                        <div className='space-y-5 pt-4 px-8'>
                            <div className='createCourseBlock'>
                                <p className='createCourseLabel'>Mid exam </p>
                                <input className='createCourseInput'
                                    placeholder='percent of score' type='number' value={mid} min={0}
                                    onChange={(e) => setMid(e.target.value)}
                                />                            
                            </div>
                            <div className='createCourseBlock'>
                                <p className='createCourseLabel'>Final exam </p>
                                <input className='createCourseInput'
                                    placeholder='percent of score' type='number' value={final} min={0}
                                    onChange={(e) => setFinal(e.target.value) }
                                />                            
                            </div>
                            <div className='createCourseBlock'>
                                <p className='createCourseLabel'>Other </p>
                                <p>Name : </p>
                                <input className='createCourseInput'
                                        placeholder='name of component' value={componentName}
                                        onChange={(e) => setComponentName(e.target.value)}
                                />
                                <p>Percent : </p>
                                <input className='createCourseInput'
                                        placeholder='percent of score' value={componentScore} type='number'
                                        onChange={(e) => setComponentScore(e.target.value)}
                                />
                                <button className='py-2 px-5 text-sm text-white font-medium shadow-lg  bg-yellow-500 rounded-lg
                                        hover:shadow-xl hover:bg-yellow-400 transtition duration-100 active:scale-95 ease-out '
                                        onClick={() => addScore()}
                                >
                                    Add
                                </button>
                            </div>
                            <div className='py-4'>
                                <table className='table-fixed'>
                                    <thead>
                                        <tr className='bg-yellow-500 text-white border-b-[1px] border-white'>
                                            <th className='w-60 font-medium'>Name of score components</th>
                                            <th className='w-40 font-medium border-l-[1px] '>Percent (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='bg-yellow-100 text-gray-800 border-b-[1px] border-white'>
                                            <td className='px-2'>Middle exam</td>
                                            <td className='text-center border-l-[1px] border-white'>{mid} %</td>
                                        </tr>
                                        <tr className='bg-yellow-100 text-gray-800 border-b-[1px] border-white'>
                                            <td className='px-2'>Final exam</td>
                                            <td className='text-center border-l-[1px] border-white'>{final} %</td>
                                        </tr>
                                        {scores.map((item, key) => (
                                        <tr key={key} className='bg-yellow-100 text-gray-800 border-b-[1px] border-white'>
                                            <td className='px-2'>{item.name}</td>
                                            <td className='text-center border-l-[1px] border-white'>{item.percent} %</td>
                                        </tr>
                                        ))}
                                        <tr className='bg-yellow-100 text-gray-800 border-b-[1px] border-white'>
                                            <td className='px-2'>Sum</td>
                                            <td className='text-center border-l-[1px] border-white'>{sum} %</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>  
                    <div className='flex flex-wrap justify-end w-full space-x-4 pr-8'>
                        <button className='px-2 py-1 font-medium border-[1px] rounded-lg text-gray-400 border-gray-400 shadow-sm
                                        hover:shadow-md hover:text-gray-500 hover:border-gray-500'>Cancel</button>
                        <button className='px-2 py-1 font-medium border-[1px] rounded-lg text-white bg-yellow-500 border-yellow-500 shadow-md
                                        hover:shadow-lg hover:bg-yellow-400 hover:border-yellow-400'
                                        onClick={postCourse}
                                        >Create</button>
                    </div>                  
                </div>
                
            </div>
        </div>
    )
}