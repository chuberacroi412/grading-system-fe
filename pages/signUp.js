import { useRouter } from "next/dist/client/router"
import { useRef, useState } from "react"

export default function SignUp() {

    const router = useRouter()
    const emailRef = useRef(null)
    const lastNameRef = useRef(null)
    const firstNameRef = useRef(null)
    const [type, setType] = useState()
    const [lastNameVallid, setLastNameVallid] = useState(true)
    const [firstNameVallid, setFirstNameVallid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)

    async function signUp(e) {
        e.preventDefault()  
        alert('yes')
        const body = JSON.stringify({
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
            "email": emailRef.current.value,
            "type": type,
            "code": null,
            "birthDay": null
        })

        const result = await fetch('http://localhost:5000/api/account', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: body
        }).then(res => {
            if(res.status == 200)
                return res.json()
            else 
                res.json().then(res => alert(res.errors))
        })

        if(result)
            router.push('/signIn')

    }

    const validateLastName = () => {
        if(lastNameRef.current.value)
            setLastNameVallid(true)
        else
            setLastNameVallid(false)
    }

    const validateFirstName = () => {
        if(firstNameRef.current.value)
            setFirstNameVallid(true)
        else
            setFirstNameVallid(false)
    }

    const validateEmail = () => {
        if(emailRef.current.value && emailRef.current.value.indexOf('@') > -1) {            
            setEmailValid(true)
        }           
        else
            setEmailValid(false)
    }

    return (
        <div className='h-screen w-screen bg-yellow-200 pt-20 text-gray-800'>
            <div className='flex flex-col min-w-max w-1/4 mx-auto my-auto pt-8 pb-4 px-6 rounded-lg bg-white space-y-2'>
                <p className='text-2xl text-center font-semibold pb-2 mb-2 border-b-2 border-gray-200'>Sign Up</p>

                <input ref={emailRef} onChange={validateEmail} className='py-1 px-4 rounded-full bg-blue-100 font-thin outline-none' placeholder='email'/>
                <p hidden={emailValid} className=" text-left text-red-400 font-medium text-sm ml-4">Email is invalid</p>

                <input ref={lastNameRef} onChange={validateLastName} className='py-1 px-4 rounded-full bg-blue-100 font-thin outline-none' placeholder='last name'/>
                <p hidden={lastNameVallid} className=" text-left text-red-400 font-medium text-sm ml-4">Last name is required</p>

                <input ref={firstNameRef} onChange={validateFirstName} className='py-1 px-4 rounded-full bg-blue-100 font-thin outline-none' placeholder='first name'/>
                <p hidden={firstNameVallid} className=" text-left text-red-400 font-medium text-sm ml-4">First name is required</p>

                <p>Using for ?</p>
                <form>
                    <input className='mr-1' type='radio' name='role' value='student' onClick={() => setType(0)} defaultChecked/>
                    <label>student</label>
                    <br/>
                    <input className='mr-1' type='radio' name='role' value='teacher' onClick={() => setType(1)}/>
                    <label>teacher</label>
                </form>
                <div className='flex justify-evenly mt-4 font-light pt-2'> 
                    <button onClick={() => router.push('/signIn')} className='px-6 py-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400 hover:shadow-xl transtition duration-100 active:scale-95 ease-out'>
                        Cancel
                    </button>
                    <button onClick={signUp} className='px-6 py-2 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 hover:shadow-xl transtition duration-100 active:scale-95 ease-out'>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}