import React from 'react'
import { Link } from 'react-router-dom'
import { IoCloseSharp } from "react-icons/io5";

const Overlay = ({ setHamburger }) => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-[#1d2228] h-full z-[999]'>
            <IoCloseSharp className='text-white absolute top-5 right-5 text-2xl' onClick={() => setHamburger(false)} />
            <nav className='flex flex-col justify-center items-center gap-5 h-full'>
                <div className='w-auto h-[100px] mb-5'>
                    <img src="/logo.png" alt="" className='w-full h-full object-contain' />
                </div>
                <Link to={'/supplier'} className='text-center py-2 pb-3 text-white w-[90%]'>Suppliers</Link>
                <Link to={'/item'} className='text-center py-2 pb-3 text-white w-[90%]'>Items</Link>
                <Link to={'/supplierform'} className='text-center py-2 pb-3 text-white w-[90%]'>Create Supplier</Link>
                <Link to={'/itemform'} className='text-center py-2 pb-3 text-white w-[90%]'>Create Item</Link>
            </nav>
        </div>
    )
}

export default Overlay