import React, { useEffect, useState } from 'react';
import { getItems } from '../api/itemApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Overlay from '../components/Overlay';

const Item = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [hamburger, setHamburger] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemsResponse = await getItems();
                if (itemsResponse && itemsResponse.items) {
                    setItems(itemsResponse.items);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelect = (item) => {
        setSelectedItems(prevSelected => {
            return prevSelected.includes(item)
                ? prevSelected.filter(i => i !== item)
                : [...prevSelected, item];
        });
    };

    const handleOrderClick = () => {
        navigate('/orderform', { state: { selectedItems } });
    };

    return (
        <div className='md:flex w-full gap-2 overflow-hidden text-white'>
            <div className='md:w-[25%]'>
                <Navbar setHamburger={setHamburger} />
                {hamburger && <Overlay setHamburger={setHamburger} />}
            </div>

            <div className="md:w-[73%] mx-auto p-4 me-1.5 ms-1.5 backdrop-blur-xl border border-white  shadow-md rounded-lg mt-8">
                <div className='flex justify-between items-center mb-6'>
                    <h2 className="text-2xl font-bold">Item List</h2>

                    <button
                        onClick={() => navigate('/itemform')}
                        className="bg-[#f6b517] text-white px-4 py-2 rounded hover:bg-[#f6b717dd] font-semibold"
                    >
                        Add Item
                    </button>
                </div>
                {loading ? (
                    <p className="text-center">Loading items...</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 md:table">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Select</th>
                                        <th className="py-2 px-4 border-b">Item No</th>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Category</th>
                                        <th className="py-2 px-4 border-b">Stock Unit</th>
                                        <th className="py-2 px-4 border-b">Unit Price</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                        <th className="py-2 px-4 border-b">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item._id}>
                                            <td className="py-2 px-4 border-b">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleSelect(item)}
                                                    checked={selectedItems.includes(item)}
                                                />
                                            </td>
                                            <td className="py-2 px-4 border-b">{item.itemNo}</td>
                                            <td className="py-2 px-4 border-b">{item.name}</td>
                                            <td className="py-2 px-4 border-b">{item.category}</td>
                                            <td className="py-2 px-4 border-b">{item.stockUnit}</td>
                                            <td className="py-2 px-4 border-b">{item.unitPrice}</td>
                                            <td className="py-2 px-4 border-b">{item.status}</td>
                                            <td className="py-2 px-4 border-b"><img className='w-[40px] h-[40px]' src={item.images[0]} alt="" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <button
                            onClick={handleOrderClick}
                            disabled={!selectedItems.length}
                            className="w-full mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Order Selected Items
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Item;
