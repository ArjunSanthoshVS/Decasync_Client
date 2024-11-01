import React, { useEffect, useState } from 'react';
import { getSupplier } from '../api/itemApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Overlay from '../components/Overlay';

const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hamburger, setHamburger] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await getSupplier();
                if (response && response.suppliers) {
                    setSuppliers(response.suppliers);
                }
            } catch (error) {
                console.error("Failed to fetch suppliers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    return (
        <div className='md:flex gap-2 overflow-hidden text-white' >
            <div className='md:w-[25%]'>
                <Navbar setHamburger={setHamburger} />
                {hamburger && <Overlay setHamburger={setHamburger} />}
            </div>
            <div className="md:w-[73%] mx-auto p-4 me-1.5 ms-1.5 backdrop-blur-xl border border-white  shadow-md rounded-lg mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-center mb-6">Supplier List</h2>
                    <button
                        onClick={() => navigate('/supplierform')}
                        className="bg-[#f6b517] text-white px-4 py-2 rounded hover:bg-[#f6b717dd] font-semibold"
                    >
                        Add Supplier
                    </button>
                </div>

                {loading ? (
                    <p className="text-center">Loading suppliers...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 hidden md:table">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Supplier No</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Address</th>
                                    <th className="py-2 px-4 border-b">Tax No</th>
                                    <th className="py-2 px-4 border-b">Country</th>
                                    <th className="py-2 px-4 border-b">Mobile</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map((supplier) => (
                                    <tr key={supplier._id}>
                                        <td className="py-2 px-4 border-b">{supplier.supplierNo}</td>
                                        <td className="py-2 px-4 border-b">{supplier.name}</td>
                                        <td className="py-2 px-4 border-b">{supplier.address}</td>
                                        <td className="py-2 px-4 border-b">{supplier.taxNo}</td>
                                        <td className="py-2 px-4 border-b">{supplier.country}</td>
                                        <td className="py-2 px-4 border-b">{supplier.mobile}</td>
                                        <td className="py-2 px-4 border-b">{supplier.email}</td>
                                        <td className="py-2 px-4 border-b">{supplier.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="md:hidden space-y-4">
                            {suppliers.map((supplier) => (
                                <div key={supplier._id} className="backdrop-blur-xl p-4 border rounded-lg shadow">
                                    <p><strong>Supplier No:</strong> {supplier.supplierNo}</p>
                                    <p><strong>Name:</strong> {supplier.name}</p>
                                    <p><strong>Address:</strong> {supplier.address}</p>
                                    <p><strong>Tax No:</strong> {supplier.taxNo}</p>
                                    <p><strong>Country:</strong> {supplier.country}</p>
                                    <p><strong>Mobile:</strong> {supplier.mobile}</p>
                                    <p><strong>Email:</strong> {supplier.email}</p>
                                    <p><strong>Status:</strong> {supplier.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Supplier;
