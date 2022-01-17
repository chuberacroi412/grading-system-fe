import Nav from "../components/Nav";

export default function Restrict() {
    return (
        <>
        <Nav/>
        <div className='h-screen w-full flex justify-center items-center flex-wrap'>
            <h1 className=" text-xl">You are not allow to access this features :(</h1>
        </div>
        </>
    )
}