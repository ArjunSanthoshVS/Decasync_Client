import React, { useEffect, useState } from 'react';
import { getOrderList } from '../api/orderApi';
import Navbar from '../components/Navbar';
import Overlay from '../components/Overlay';
import * as XLSX from 'xlsx';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hamburger, setHamburger] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrderList();
                if (response && response.orders) {
                    setOrders(response.orders);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleExportToExcel = () => {
        const exportData = orders.map(order => ({
            OrderNo: order.orderNo,
            OrderDate: new Date(order.orderDate).toLocaleDateString(),
            Supplier: order.supplier.name || "",
            ItemTotal: order.itemTotal,
            Discount: order.discount || 0,
            NetAmount: order.netAmount
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
        XLSX.writeFile(workbook, `Order_List.xlsx`);
    };


    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="md:flex gap-2 overflow-hidden text-white">
            <div className="md:w-[25%]">
                <Navbar setHamburger={setHamburger} />
                {hamburger && <Overlay setHamburger={setHamburger} />}
            </div>
            <div className="md:w-[73%] mx-auto p-4 backdrop-blur-xl border border-white shadow-md rounded-lg mt-8">
                <h2 className="text-2xl font-bold text-center mb-6">Order List</h2>

                {loading ? (
                    <p className="text-center">Loading orders...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 hidden md:table">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Order No</th>
                                    <th className="py-2 px-4 border-b">Order Date</th>
                                    <th className="py-2 px-4 border-b">Supplier</th>
                                    <th className="py-2 px-4 border-b">Item Total</th>
                                    <th className="py-2 px-4 border-b">Discount</th>
                                    <th className="py-2 px-4 border-b">Net Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="py-2 px-4 border-b">{order.orderNo}</td>
                                        <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-b">{order.supplier.name}</td>
                                        <td className="py-2 px-4 border-b">{order.itemTotal}</td>
                                        <td className="py-2 px-4 border-b">{order.discount}</td>
                                        <td className="py-2 px-4 border-b">{order.netAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="md:hidden space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="backdrop-blur-xl p-4 border rounded-lg shadow">
                                    <p><strong>Order No:</strong> {order.orderNo}</p>
                                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                                    <p><strong>Supplier:</strong> {order.supplier.name}</p>
                                    <p><strong>Item Total:</strong> {order.itemTotal}</p>
                                    <p><strong>Discount:</strong> {order.discount}</p>
                                    <p><strong>Net Amount:</strong> {order.netAmount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className='flex flex-col sm:flex-row justify-end mt-6'>

                    <button
                        type="button"
                        onClick={handleExportToExcel}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full sm:w-auto mb-2 sm:mb-0 me-3"
                    >
                        Export to Excel
                    </button>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full sm:w-auto mb-2 sm:mb-0"
                    >
                        Print Order
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderList;
