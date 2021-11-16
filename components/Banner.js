import Image from 'next/image'

export default function Banner() {
    return (
        <div className='relative h-[300px] sm:h-[400px] lg:h-[550px] xl:[700px] 2xl:[900px]'>
            <Image src='https://wallpaperaccess.com/full/6107194.jpg' 
            layout='fill'
            objectFit='cover'
            
            />
            <div className='absolute top-1/2 text-center w-full text-white font-thin text-3xl'>
                <p>Too much paper to enter the points ?</p>
                <button className=' bg-gray-50 text-base font-bold shadow-lg text-yellow-600 rounded-full py-2 px-4 my-4 
                    hover:text-yellow-400
                    hover:shadow-2xl
                    hover:bg-white
                    transtition duration-150 active:scale-95 ease-out'>
                    Let us help!
                </button>
            </div>
        </div>
    )
}