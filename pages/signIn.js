import { useRouter } from "next/dist/client/router"
import { AcademicCapIcon } from '@heroicons/react/outline'
import { useRef, useState } from "react"
import { useStateValue } from "../service/stateProvider"
import { actionTypes } from "../service/recuder"

export default function SignIn() {
    const [state, dispatch] = useStateValue()
    const router = useRouter()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const newPassRef = useRef(null)
    const confirmNewPasRef = useRef(null)
    const forgotPassEmailRef = useRef(null)
    
    const [passwordValid, setPasswordValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [confirmPassValid, setConfirmPassValid] = useState(true)
    const [activeAccountUI, setActiveAccountUI] = useState(false)
    const [forgotPassUI, setForgotPassUI] = useState(false)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [forgotPassEmailValid, setForgotPassEmailValid] = useState(true)

    async function signIn(e) {
        e.preventDefault()  

        const body = JSON.stringify({
            "username": emailRef.current.value,
            "password": passwordRef.current.value
        })

        // Login 
        const result = await fetch('http://localhost:5000/api/auth', {
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

        // Check login success or not
        if (result != null) {

            // If login success ---> get user information
            const userInfo = await fetch(`http://localhost:5000/api/account/${result.userId}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${result.token.access_token}`
                }
            }).then(res => {
                if (res.status == 200)
                    return res.json()
                else
                    res.json().then(res => alert(res.errors))
            })

            // Get user success
            if (userInfo != null) {
                setUser(userInfo)
                setToken(result.token.access_token)
                // store token
                dispatch({
                    type: actionTypes.SET_TOKEN,
                    token: result.token.access_token
                })
                router.push('/')

                // Get access modules
                const url = 'http://localhost:5000/api/Module/RoleModuleMap/' + userInfo.role.id
                const modules = await fetch(url, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${result.token.access_token}`
                    }
                }).then(res => {
                    if(res.status == 200){
                        return res.json()
                    }                        
                    else
                        res.json().then(res => alert(res.errors))
                })

                // Store access module to context
                if(modules != null)
                    dispatch({
                        type: actionTypes.SET_ACCESS_MODULE,
                        access_module: modules
                    })

                // Store user to context and check fist login
                if (userInfo.isFirstLogin == true) {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: userInfo
                    })
                    router.push('/')
                }
                else 
                    setActiveAccountUI(true)
            }
            
        }
        
    }

    const validatePassword = () => {
        if(passwordRef.current.value)
            setPasswordValid(true)
        else
            setPasswordValid(false)
    }

    const validateEmail = () => {
        if(emailRef.current.value && emailRef.current.value.indexOf('@') > -1) {            
            setEmailValid(true)
        }           
        else
            setEmailValid(false)
    }

    const validateConfirmPassword = () => {
        if(newPassRef.current.value && newPassRef.current.value == confirmNewPasRef.current.value) 
            setConfirmPassValid(true)
        else
            setConfirmPassValid(false)
    }

    const validateFogotPassEmail = () => {
        if(forgotPassEmailRef.current.value && forgotPassEmailRef.current.value.indexOf('@') > -1) {            
            setForgotPassEmailValid(true)
        }           
        else
            setForgotPassEmailValid(false)
    }

    async function activeAccount () {

        const body = JSON.stringify({
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.emalil,
            "currentPassword": passwordRef.current.value,
            "newPassword": newPassRef.current.value,
            "confirmNewPassword":  confirmNewPasRef.current.value
        })

        
        const activeResult = await fetch('http://localhost:5000/api/account', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: body
        }).then(res => {
            if(res.status == 200){
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: user
                    })
                    router.push('/')
            }
            else
                res.json().then(res => alert(res.errors))
        })
    }

    async function forgotPassword() {

        const body = JSON.stringify({
            "email": forgotPassEmailRef.current.value
        });

        const result = await fetch('http://localhost:5000/api/account/ResetPassword', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
            body: body
        }).then(res => {
            if(res.status == 200) {
                setForgotPassUI(false)
            }
            else {
                res.json().then(err => alert(err.errors))
            }
        })
    }

    return (
        <div className='bg-yellow-200 md:h-screen h-full w-screen'>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 h-full'>
                <div className='self-center justify-self-center w-1/2'>
                    <AcademicCapIcon className='h-32 text-white '/>
                    <p className='text-2xl'>This is some short introduce</p>
                    <p className='text-light '>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
                    
                    
                </div>
                <div className=' self-center justify-self-center w-1/2 mt-6'>
                    <div className='flex flex-col w-full bg-white py-8 px-6 rounded-lg text-center'>
                        {activeAccountUI ? 
                            <>
                                <p className='mb-4 text-lg'>Active account</p>
                                <p className='font-light'>
                                    Update your password to active account
                                </p> 
                                <input ref={passwordRef} onChange={validatePassword} className='py-1 px-4 rounded-full bg-blue-100 my-2 font-thin' required type='password' placeholder='Current password'/>
                                <p hidden={passwordValid}  className=" text-left text-red-400 font-medium text-sm ml-4">password is required</p>

                                <input ref={newPassRef} defaultValue="" onChange={validateConfirmPassword} className='py-1 px-4 rounded-full bg-blue-100 my-2 font-thin' required type='password' placeholder='New password'/>                               
                                <input ref={confirmNewPasRef} defaultValue="" onChange={validateConfirmPassword} className='py-1 px-4 rounded-full bg-blue-100 my-2 font-thin' required type='password' placeholder='Confirm new password'/>
                                <p hidden={confirmPassValid}  className=" text-left text-red-400 font-medium text-sm ml-4">New password and confirm password are invalid</p>

                                <button onClick={activeAccount} disabled={!passwordValid || !confirmPassValid} className=' bg-yellow-400 py-1 px-4 text-md font-medium rounded-full mt-6 hover:bg-yellow-300'>Active</button>
                            </>
                        :
                        forgotPassUI ?
                            <>
                                <p className='mb-4 text-lg'>Reset password</p>
                                <p className='font-light'>
                                    Type your email to recieve new password
                                </p> 

                                <input ref={forgotPassEmailRef} onChange={validateFogotPassEmail} className='py-1 px-4 rounded-full bg-blue-100 my-2 font-thin' required type='email' placeholder='Your email'/>
                                <p hidden={forgotPassEmailValid} className=" text-left text-red-400 font-medium text-sm ml-4">Email is invalid</p>

                                <button onClick={forgotPassword} disabled={!forgotPassEmailValid}  className=' bg-yellow-400 py-1 px-4 text-md font-medium rounded-full mt-6 hover:bg-yellow-300'>Reset password</button>
                                <button onClick={() => setForgotPassUI(false)} className=' bg-gray-100 py-1 px-4 text-md font-medium rounded-full my-2 hover:bg-gray-200'>Back</button>

                            </>
                       
                        :
                        <>
                            <p className='mb-4 text-lg'>Welcome to grading system</p>

                            <input ref={emailRef} onChange={validateEmail} className='py-1 px-4 rounded-full bg-blue-100 font-thin' type='email' placeholder='email'/>
                            <p hidden={emailValid} className=" text-left text-red-400 font-medium text-sm ml-4">Email is invalid</p>

                            <input ref={passwordRef} onChange={validatePassword} className='py-1 px-4 rounded-full bg-blue-100 my-2 font-thin' required type='password' placeholder='password'/>
                            <p hidden={passwordValid}  className=" text-left text-red-400 font-medium text-sm ml-4">password is required</p>

                            <button onClick={signIn} disabled={!emailValid || !passwordValid} className=' bg-yellow-400 py-1 px-4 text-md font-medium rounded-full mt-6 hover:bg-yellow-300'>Sign in</button>
                            <button onClick={() => setForgotPassUI(true)} className=' bg-gray-100 py-1 px-4 text-md font-medium rounded-full my-2 hover:bg-gray-200'>Forgot password</button>
                            <p className='font-light'>
                                <span>Does not have an account?</span>
                                <span onClick={() => router.push('/signUp')} className='hover:text-yellow-500 cursor-pointer hover:font-normal'> Create one</span>
                            </p>          
                        </>
                        }
                                     
                    </div>                     
                </div>
            </div>
        </div>
    )
}