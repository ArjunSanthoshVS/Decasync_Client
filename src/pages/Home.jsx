import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Overlay from '../components/Overlay';

const Home = () => {
    const [hamburger, setHamburger] = useState(false)
    return (
        <div className='w-full h-[100vh] md:flex grid grid-cols-1 place-items-center text-white'>
            <div className='md:w-[25%] fixed top-0 md:relative w-full'>
                <Navbar setHamburger={setHamburger} />
                {hamburger && <Overlay setHamburger={setHamburger} />}
            </div>
            <div className='md:w-[73%] flex justify-center items-center'>
                <h1 className='md:text-[90px] text-[50px] font-semibold text-[#f6b517] textShadow'>Welcome...!</h1>
            </div>
        </div>
    )
}

export default Home