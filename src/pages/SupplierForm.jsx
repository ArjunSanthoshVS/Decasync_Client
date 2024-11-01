import React, { useState, useEffect } from "react";
import { createSupplier } from "../api/supplierApi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Overlay from "../components/Overlay";

const SupplierForm = () => {
    const [loading, setLoading] = useState(false);
    const [supplierNo, setSupplierNo] = useState("");
    const [hamburger, setHamburger] = useState(false)
    const [supplierData, setSupplierData] = useState({
        name: "",
        address: "",
        taxNo: "",
        country: "",
        mobile: "",
        email: "",
        status: "Active",
    });

    useEffect(() => {
        setSupplierNo(`SUP-${Math.floor(Math.random() * 100000)}`);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplierData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fullSupplierData = { supplierNo, ...supplierData };

        try {
            const response = await createSupplier(fullSupplierData);
            setLoading(false);

            if (!response.error) {
                toast.success(response.message || "Supplier created successfully!");
                setSupplierData({
                    name: "",
                    address: "",
                    taxNo: "",
                    country: "",
                    mobile: "",
                    email: "",
                    status: "Active",
                });
                setSupplierNo(`SUP-${Math.floor(Math.random() * 100000)}`);
            } else {
                toast.error(response.message || "Error while creating supplier!");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error submitting supplier:", error.message);
            toast.error("Failed to create supplier. Please try again.");
        }
    };

    return (
        <div className="md:flex w-full gap-5 overflow-hidden text-white">
            <div className="md:w-[25%]">
                <Navbar setHamburger={setHamburger} />
                {hamburger && <Overlay setHamburger={setHamburger} />}
            </div>
            <div className="md:w-[73%] mx-auto p-4 me-1.5 ms-1.5 backdrop-blur-xl border border-white  shadow-md rounded-lg mt-8">
                <ToastContainer />
                <h2 className="text-2xl font-bold text-center mb-6">Supplier Form</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="flex flex-col">
                        <label className="font-medium">Supplier No:</label>
                        <input
                            type="text"
                            className="p-2 border rounded backdrop-blur-xl"
                            value={supplierNo}
                            readOnly
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">Supplier Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="p-2 border rounded"
                            value={supplierData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter supplier name"
                        />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="font-medium">Address:</label>
                        <textarea
                            name="address"
                            className="p-2 border rounded"
                            value={supplierData.address}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter supplier address"
                        ></textarea>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">TAX No:</label>
                        <input
                            type="number"
                            name="taxNo"
                            className="p-2 border rounded"
                            value={supplierData.taxNo}
                            onChange={handleInputChange}
                            placeholder="Enter supplier tax number"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">Country:</label>
                        <select
                            name="country"
                            className="p-2 border rounded text-black bg-white"
                            value={supplierData.country}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" className="text-gray-400">Select Country</option> {/* Placeholder in gray */}
                            <option value="India" className="text-black">India</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">Mobile No:</label>
                        <input
                            type="text"
                            name="mobile"
                            className="p-2 border rounded"
                            value={supplierData.mobile}
                            onChange={handleInputChange}
                            pattern="\d{10}"
                            maxLength={10}
                            required
                            placeholder="Enter 10-digit mobile number"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="p-2 border rounded"
                            value={supplierData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter supplier email"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">Status:</label>
                        <select
                            name="status"
                            className="p-2 border rounded text-black bg-white"  // Ensuring text is black and background is white
                            value={supplierData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Active" className="text-black">Active</option>
                            <option value="Inactive" className="text-black">Inactive</option>
                            <option value="Blocked" className="text-black">Blocked</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierForm;
