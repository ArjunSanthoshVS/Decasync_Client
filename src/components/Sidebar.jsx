import React from 'react'
import { FaGithub, FaLinkedinIn, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[25%] h-[100vh] fixed md:flex md:flex-col bg-[#1d2228] top-0 left-0 justify-between pt-10 items-center text-nowrap font-semibold rounded-tr-2xl rounded-br-2xl gap-5 hidden border border-white'>
            <div className='flex flex-col w-full items-center gap-5'>
                <div className='w-auto h-[100px] mb-5'>
                    <img src="/logo.png" alt="" className='w-full h-full object-contain' />
                </div>
                <Link to={'/supplier'} className='bg-[#00000000] backdrop-blur-2xl text-center py-2 pb-3 border border-[#bdbdbd] text-white w-[90%] rounded-lg'>Suppliers</Link>
                <Link to={'/item'} className='bg-[#00000000] backdrop-blur-2xl text-center py-2 pb-3 border border-[#bdbdbd] text-white w-[90%] rounded-lg'>Items</Link>
                <Link to={'/order'} className='bg-[#00000000] backdrop-blur-2xl text-center py-2 pb-3 border border-[#bdbdbd] text-white w-[90%] rounded-lg'>Orders</Link>
                <Link to={'/supplierform'} className='bg-[#00000000] backdrop-blur-2xl text-center py-2 pb-3 border border-[#bdbdbd] text-white w-[90%] rounded-lg'>Create Supplier</Link>
                <Link to={'/itemform'} className='bg-[#00000000] backdrop-blur-2xl text-center py-2 pb-3 border border-[#bdbdbd] text-white w-[90%] rounded-lg'>Create Item</Link>
            </div>
            <div>

                <div className='flex mt-5 justify-center items-center gap-5 text-3xl'>
                    <a href="https://arjunsanthoshportfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
                        <FaUser className="hover:text-[#f6b517] transition-all" />
                    </a>
                    <a href="https://www.linkedin.com/in/arjun-santhosh-94a663220/" target='_blank' rel="noopener noreferrer">
                        <FaLinkedinIn className="hover:text-[#f6b517] transition-all" />
                    </a>
                    <a href="https://github.com/ArjunSanthoshVS" target='_blank' rel="noopener noreferrer">
                        <FaGithub className="hover:text-[#f6b517] transition-all" />
                    </a>
                </div>
                <p className='text-sm m-3'>Made by Arjun Santhosh</p>
            </div>
        </div>
    )
}

export default Sidebar