import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Overlay from "../components/Overlay";
import { getSupplier } from "../api/itemApi";

// const suppliers = [
//   { id: 1, name: "Supplier A" },
//   { id: 2, name: "Supplier B" },
//   { id: 3, name: "Supplier C" },
// ];

const Order = () => {
  const { state } = useLocation();
  const initialItems = state?.selectedItems || [];
  const [suppliers, setSuppliers] = useState([])
  const [itemList, setItemList] = useState(initialItems);
  const [orderNo, setOrderNo] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [supplier, setSupplier] = useState("");
  const [hamburger, setHamburger] = useState(false)
  const [totals, setTotals] = useState({
    itemTotal: 0,
    discountTotal: 0,
    netAmount: 0,
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      setOrderNo(`ORD-${Math.floor(Math.random() * 100000)}`);
      try {
        const response = await getSupplier()
        if (response && response?.suppliers) {
          setSuppliers(response?.suppliers)
        }
      } catch (error) {
        console.error("Failed to fetch suppliers", error);
      }
    }
    fetchSuppliers()
  }, []);

  useEffect(() => {
    const itemTotal = itemList.reduce((acc, item) => acc + (item.amount || ((item.unitPrice) - (item.discount || 0))), 0);
    const discountTotal = itemList.reduce((acc, item) => acc + (item.discount || 0), 0);
    const netAmount = itemTotal - discountTotal;
    setTotals({ itemTotal, discountTotal, netAmount });
  }, [itemList]);

  const handleExportToExcel = () => {
    const exportData = itemList.map(item => ({
      OrderNo: orderNo,
      OrderDate: format(orderDate, "yyyy-MM-dd"),
      Supplier: suppliers.find(s => s.id === supplier)?.name || "",
      ItemNo: item.itemNo,
      ItemName: item.name,
      StockUnit: item.stockUnit,
      UnitPrice: item.unitPrice,
      PackingUnit: item.packingUnit,
      OrderQty: item.quantity || 1,
      ItemAmount: item.amount || (item.unitPrice * (item.quantity || 1)),
      Discount: item.discount || 0,
      NetAmount: item.quantity ? ((item.unitPrice * item.quantity) - (item.discount || 0)) : (item.unitPrice - (item.discount || 0))
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Order");
    XLSX.writeFile(workbook, `${orderNo}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Order submitted successfully!");
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedList = [...itemList];
    updatedList[index].quantity = Number(quantity);
    updatedList[index].amount = updatedList[index].quantity * updatedList[index].unitPrice;
    setItemList(updatedList);
  };

  const handlePackingUnitChange = (index, packingUnit) => {
    const updatedList = [...itemList];
    updatedList[index].packingUnit = packingUnit;
    setItemList(updatedList);
  };

  return (
    <div className="md:flex w-full overflow-hidden gap-5 text-white">
      <div className="md:w-[25%]">
        <Navbar setHamburger={setHamburger} />
        {hamburger && <Overlay setHamburger={setHamburger} />}
      </div>
      <div className="printable-area md:w-[73%] mx-auto p-4 me-1.5 ms-1.5 backdrop-blur-xl border border-white text-white shadow-md rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Purchase Order Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="md:flex gap-4 justify-evenly items-center">
            <div className="flex flex-col">
              <label className="font-medium">Order No:</label>
              <p className="p-2 border rounded backdrop-blur-xl">{orderNo}</p>
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Order Date:</label>
              <input
                type="date"
                value={format(orderDate, "yyyy-MM-dd")}
                onChange={(e) => setOrderDate(new Date(e.target.value))}
                className="p-2 border rounded backdrop-blur-xl"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Supplier:</label>
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="p-2 border rounded text-black bg-white"
              >
                <option value="" className="text-gray-400">Select Supplier</option>
                {suppliers.map((sup) => (
                  <option className="text-black" key={sup.id} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="text-xl text-center font-semibold mt-4">Selected Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 md:table">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Item No</th>
                  <th className="py-2 px-4 border-b">Item Name</th>
                  <th className="py-2 px-4 border-b">Stock Unit</th>
                  <th className="py-2 px-4 border-b">Unit Price</th>
                  <th className="py-2 px-4 border-b">Packing Unit</th>
                  <th className="py-2 px-4 border-b">Order Qty</th>
                  <th className="py-2 px-4 border-b">Item Amount</th>
                  <th className="py-2 px-4 border-b">Discount</th>
                  <th className="py-2 px-4 border-b">Net Amount</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((item, index) => (
                  <tr key={item._id}>
                    <td className="py-2 px-4 border-b">{item.itemNo}</td>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.stockUnit}</td>
                    <td className="py-2 px-4 border-b">{item.unitPrice}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={item.packingUnit || ""}
                        onChange={(e) => handlePackingUnitChange(index, e.target.value)}
                        className="p-2 border rounded text-black bg-white"
                      >
                        <option value="" className="text-gray-400">Select Packing Unit</option>
                        <option value="Box" className="text-black">Box</option>
                        <option value="Kg" className="text-black">Kg</option>
                        <option value="Piece" className="text-black">Piece</option>
                        <option value="Litre" className="text-black">Litre</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || "1"}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{item.quantity ? (item.quantity * item.unitPrice) : (item.unitPrice)}</td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="number"
                        min="0"
                        value={item.discount || 0}
                        onChange={(e) => {
                          const updatedList = [...itemList];
                          updatedList[index].discount = Number(e.target.value);
                          setItemList(updatedList);
                        }}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item.quantity ? ((item.quantity * item.unitPrice) - (item.discount || 0)) : ((item.unitPrice) - (item.discount || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-2 border-t border-gray-300">
            <h3 className="text-xl font-semibold">Order Totals</h3>
            <div className="flex justify-between mt-2">
              <p>Item Total:</p>
              <p className="font-semibold">{totals.itemTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount Total:</p>
              <p className="font-semibold">{totals.discountTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Net Amount:</p>
              <p>{totals.netAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-6">
            <button
              type="button"
              onClick={handleExportToExcel}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full sm:w-auto mb-2 sm:mb-0"
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
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full sm:w-auto"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default Order;
