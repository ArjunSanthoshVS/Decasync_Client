import React, { useState, useEffect } from "react";
import { createItem, getSupplier, uploadItemImage } from "../api/itemApi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Overlay from "../components/Overlay";

const ItemForm = () => {
  const [loading, setLoading] = useState(false);
  const [itemNo, setItemNo] = useState("");
  const [suppliers, setSuppliers] = useState([])
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [hamburger, setHamburger] = useState(false)
  const [itemData, setItemData] = useState({
    name: "",
    location: "",
    brand: "",
    category: "",
    supplier: "",
    stockUnit: "",
    unitPrice: "",
    status: "Enabled",
    images: []
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      setItemNo(`ITEM-${Math.floor(Math.random() * 100000)}`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append("images", file));

    try {
      const response = await uploadItemImage(formData)
      setItemData((prevData) => ({ ...prevData, images: response.imageUrls }))
      setIsImageUploaded(true);
    } catch (error) {
      console.error("Failed to upload images", error);
      setIsImageUploaded(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullItemData = { itemNo, ...itemData };

    try {
      const response = await createItem(fullItemData);
      setLoading(false);

      if (!response.error) {
        toast.success(response.message || "Supplier created successfully!");
        setItemData({
          name: "",
          location: "",
          brand: "",
          category: "",
          supplier: "",
          stockUnit: "",
          unitPrice: "",
          status: "Enabled",
          images: []
        });
        setItemNo(`ITEM-${Math.floor(Math.random() * 100000)}`);
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
    <div className="md:flex w-full overflow-hidden gap-5 text-white">
      <div className="md:w-[25%]">
        <Navbar setHamburger={setHamburger} />
        {hamburger && <Overlay setHamburger={setHamburger} />}
      </div>
      <div className="md:w-[73%] mx-auto p-4 me-1.5 ms-1.5 backdrop-blur-xl border border-white  shadow-md rounded-lg mt-2">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-6">Item Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="font-medium">Item No:</label>
            <input
              type="text"
              className="p-2 border rounded backdrop-blur-xl"
              value={itemNo}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Item Name:</label>
            <input
              type="text"
              name="name"
              className="p-2 border rounded"
              value={itemData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter item name"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Inventory Location:</label>
            <input
              type="text"
              name="location"
              className="p-2 border rounded"
              value={itemData.location}
              onChange={handleInputChange}
              required
              placeholder="Enter item inventory location"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Brand:</label>
            <input
              type="text"
              name="brand"
              className="p-2 border rounded"
              value={itemData.brand}
              onChange={handleInputChange}
              required
              placeholder="Enter item brand"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Category:</label>
            <input
              type="text"
              name="category"
              className="p-2 border rounded"
              value={itemData.category}
              onChange={handleInputChange}
              placeholder="Enter item category"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Supplier:</label>
            <select
              name="supplier"
              className="p-2 border rounded text-black bg-white"
              value={itemData.supplier}
              onChange={handleInputChange}
            >
              <option className="text-gray-400" value="">Select Supplier</option>
              {suppliers?.map((supplier) => (
                <option className="text-black" key={supplier?._id} value={supplier?._id}>{supplier?.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Stock Unit:</label>
            <select
              name="stockUnit"
              className="p-2 border rounded text-black bg-white"
              value={itemData.stockUnit}
              onChange={handleInputChange}
            >
              <option value="" className="text-gray-400">Select Unit</option>
              <option value="Box" className="text-black">Box</option>
              <option value="Kg" className="text-black">Kg</option>
              <option value="Piece" className="text-black">Piece</option>
              <option value="Liter" className="text-black">Liter</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Unit Price:</label>
            <input
              type="number"
              name="unitPrice"
              className="p-2 border rounded"
              value={itemData.unitPrice}
              onChange={handleInputChange}
              required
              placeholder="Enter item unit price"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="font-medium">Item Images:</label>
            <input
              type="file"
              name="images"
              className="p-2 border rounded"
              onChange={handleImageUpload}
              multiple
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Status:</label>
            <select
              name="status"
              className="p-2 border rounded text-black bg-white"
              value={itemData.status}
              onChange={handleInputChange}
            >
              <option value="Enabled" className="text-black">Enabled</option>
              <option value="Disabled" className="text-black">Disabled</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full p-2 rounded mt-4 ${isImageUploaded ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              disabled={!isImageUploaded}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
