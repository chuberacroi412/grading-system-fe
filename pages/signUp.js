
export default function SignUp() {

    return (
        <div className='h-screen w-screen bg-yellow-200 pt-20 text-gray-800'>
            <div className='flex flex-col min-w-max w-1/4 mx-auto my-auto pt-8 pb-4 px-6 rounded-lg bg-white space-y-2'>
                <p className='text-2xl text-center font-semibold pb-2 mb-2 border-b-2 border-gray-200'>Sign Up</p>
                <input className='py-1 px-4 rounded-full bg-blue-100 font-thin outline-none' placeholder='email'/>
                <input className='py-1 px-4 rounded-full bg-blue-100 font-thin outline-none' placeholder='password'/>
                <input className='py-1 px-4 rounded-full bg-blue-100 font-thin outline-none' placeholder='confirm password'/>
                <p>Using for ?</p>
                <form>
                    <input className='mr-1' type='radio' name='role' value='teacher'/>
                    <label>teacher</label>
                    <br/>
                    <input className='mr-1' type='radio' name='role' value='student'/>
                    <label>student</label>
                </form>
                <div className='flex justify-evenly mt-4 font-light pt-2'> 
                    <button className='px-6 py-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400 hover:shadow-xl transtition duration-100 active:scale-95 ease-out'>
                        Cancel
                    </button>
                    <button className='px-6 py-2 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 hover:shadow-xl transtition duration-100 active:scale-95 ease-out'>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}