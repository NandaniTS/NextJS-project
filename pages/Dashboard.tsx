import React, { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { useRouter } from "next/router";

type ResponseData = {
  id: number;
  name: string;
  price: number;
  review: number;
  description: string;
};

const Dashboard = () => {
  let [data, setData] = useState<ResponseData[]>([]);
  let [newItem, setNewItem] =  useState<ResponseData>({
    id:0,
    name: "",
    price: 0,
    review: 0,
    description: "",
  })

  let [updatedItemData,setUpdateItemData]=useState<ResponseData>({
    id:0,
    name: "",
    price: 0,
    review: 0,
    description: "",
  })
  const router = useRouter();

  let [show,setShow]=useState<Boolean>(false)
    const logout = () => {
    router.push("/");
  };

  const getData = async () => {
    try {
      const response = await fetch("/api/posts/Data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setData(result);
      console.log(result);
      // setData(response)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getItemById = async (id:number) => {
    setShow(!show);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setUpdateItemData(result);
     
      // console.log(response.json());
      // setData(response)
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async () => {
    try {
      const response = await fetch("/api/posts/Data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (response.status === 200) {
        const res = await response.json();
        setData((prevData) => [...prevData, res]);
        
        
        console.log(res);
      }        
      getData();
      setNewItem({
        id: 0,
        name: "",
        price: 0,
        review: 0,
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id:number) => {
    try {
      console.log(id)
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        body:JSON.stringify({
          'id':id
      }),

      });
      if (response.status == 200) {
        setData(data.filter((data) => data.id !== id));
        console.log("Item Deleted Successfully");
        getData();
      } else {
        console.log("Error in deleting item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (id: number) => {
    try { 
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItemData),
      });
      if (response.status === 200) {
        const updatedItem = await response.json();
        setData(data.map((item) => (item.id === id ? updatedItem : item)));
        // setUpdateItemData({id:" "})
        setUpdateItemData({
          id: 0,
          name: "",
          price: 0,
          review: 0,
          description: "",
        });
        setShow(!show)
        console.log("Item Updated Successfully");
      } else {
        console.log("Error in updating item");
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 border h-[100vh]">
        <div className=" p-5 text-center text-2xl font-semibold">
          <h1>Ecom Master</h1>
        </div>
        <div className="w-full">
          <ul>
            <li className="w-[80%] text-white bg-blue-500 p-4 mx-auto py-3 rounded-lg text-center font-semibold text-xl my-2 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              Dashboard
            </li>
            <li className="w-[80%] text-white bg-blue-500 p-4 mx-auto py-3 rounded-lg text-center font-semibold text-xl my-2 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              Products
            </li>
            <li className="w-[80%] text-white bg-blue-500 p-4 mx-auto py-3 rounded-lg text-center font-semibold text-xl my-2 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              Customers
            </li>
            <li className="w-[80%] text-white bg-blue-500 p-4 mx-auto py-3 rounded-lg text-center font-semibold text-xl my-2 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              Reports
            </li>
            <li className="w-[80%] text-white bg-blue-500 p-4 mx-auto py-3 rounded-lg text-center font-semibold text-xl my-2 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              Orders
            </li>
            <li className="w-[80%] text-white bg-blue-500 p-4 mx-auto py-3 rounded-lg text-center font-semibold text-xl my-2 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              Statistics
            </li>
            <li
              className="w-[80%] text-white bg-blue-500 p-4 mx-auto py-3 rounded-lg text-center font-semibold text-xl my-2 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500"
              onClick={logout}>
              Log Out
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full border p-4">
          <h2 className="text-center text-2xl font-semibold">Electronics</h2>
          <input
            type="text"
            className="border border-gray-200 p-2 rounded-xl w-1/2"
            placeholder="Search"
          />
          <div className="w-1/5 flex justify-between">
            <button className="border p-3 rounded-lg">
              <IoMoonOutline />
            </button>
            <button className="border p-3 rounded-lg">
              <IoMdNotifications />
            </button>
            <button className="border p-3 rounded-lg">
              <IoPersonSharp />
            </button>
          </div>
        </div>
        <div className="flex justify-evenly flex-wrap w-[90%] mx-auto py-2 ">
          {/* console.log(data) */}
          {data.map((e) => (
            <div className="w-1/4  p-4 border m-2 rounded-lg shadow-lg">
             {/* { console.log(e)} */}
              <h1 className="font-semibold text-3xl ">{e.name}</h1>
              {/* <p>{e.id}</p> */}
              <p className="font-medium text-gray-700">Price: Rs {e.price}</p>
              <p className="font-semibold text-gray-700">Rating: {e.review}</p>
              <p className="font-medium text-gray-700">
                Description: {e.description}
              </p>
              <button className="border rounded-lg p-2 mt-2 mr-2 font-medium text-green-600 border-green-600" onClick={()=> getItemById(e.id)}>
                Update
              </button>
              <button
                className="border rounded-lg p-2 mt-2 mr-2 font-medium text-red-500 border-red-500"
                onClick={() => deleteItem(e.id)}
              >
                Delete
              </button>
            </div>
          ))}

          <div className="w-1/4  p-4 border m-2 rounded-lg shadow-lg">
            {/* <h1 className="font-semibold text-3xl "></h1> */}

            <input
              className="border border-gray-200 p-1 rounded-xl mb-2"
              name="id"
              value={show ? updatedItemData.id: newItem.id}
              type="number"
              onChange={show? handleUpdateChange: handleChange}
              placeholder="Enter product Id"
            />
            <input
              className="border border-gray-200 p-1 rounded-xl mb-2"
              name="name"
              value={show ? updatedItemData.name: newItem.name}
              type="text"
              onChange={ show? handleUpdateChange: handleChange}
              placeholder="Enter product name"
            />
            <input
              className="border border-gray-200 p-1 rounded-xl mb-2"
              type="number"
              name="price"
              value={show ? updatedItemData.price: newItem.price}
              onChange={show ? handleUpdateChange: handleChange}
              placeholder="Enter product price"
            />
            <input
              className="border border-gray-200 p-1 rounded-xl mb-2"
              type="number"
              name="review"
              onChange={show? handleUpdateChange: handleChange}
              value={show ? updatedItemData.review: newItem.review}
              placeholder="Enter product rating"
            />
            <input
              className="border border-gray-200 p-1 rounded-xl mb-2"
              type="text"
              name="description"
              value={show ? updatedItemData.description: newItem.description}
              onChange={ show ? handleUpdateChange: handleChange}
              placeholder="Enter product description"
            />
           {show ? <div>
            <button
            className="border rounded-lg p-2 px-4 mr-2 font-medium text-blue-500 border-blue-500"
            onClick={()=>updateItem(updatedItemData.id)}
            >Yes</button>   
            <button
            className="border rounded-lg p-2 px-4 mr-2 font-medium text-blue-500 border-blue-500"
            onClick={()=>setShow(!show)}
            >No</button> 
           </div>:  <button
              className="border rounded-lg p-2 px-4 mr-2 font-medium text-blue-500 border-blue-500"
              onClick={addItem}
            >
              Add
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
