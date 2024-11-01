import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

const Navbar = ({ setHamburger }) => {
    return (
        <div className='md:flex grid grid-cols-1 place-items-center w-full'>
            <div className='w-full py-3 flex justify-center md:hidden border border-white '>
                <header className='w-full px-2 flex justify-between items-center'>
                    <div className='w-auto h-[40px]'>
                        <img src="/logo.png" alt="" className='w-full h-full object-cover' />
                    </div>
                    <GiHamburgerMenu className='text-3xl text-white' onClick={() => setHamburger(true)} />
                </header>
            </div>
            <Sidebar />
        </div>
    )
}

export default Navbar