import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
function Update({ display, update }) {
  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body,
    });
  }, [update]);

  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    display("none");
    
    await axios
      .put(`http://localhost:1000/api/v2/updateTask/${update._id}`, Inputs)
      .then((response) => {
        toast.success("Your Task is Updated Successfully");
      });
  };
  return (
    <div className="p-20  flex flex-col mx-24  space-y-6 justify-center items-start w-full bg-white bg-opacity-40 backdrop-blur-xl rounded-lg drop-shadow-lg">
      <h3 className="text-5xl font-bold  text-white ">Update Your Task</h3>
      <input
        onChange={change}
        name="title"
        className="rounded-md p-4 text-black w-full"
        type="text"
        placeholder="TITLE"
        value={Inputs.title}
      />
      <textarea
        onChange={change}
        name="body"
        className="rounded-md p-4 text-lg w-full"
        placeholder="BODY"
        value={Inputs.body}
      ></textarea>
      <div>
        <button
          onClick={submit}
          className=" bg-teal-950 hover:bg-teal-300 py-3 px-10    text-white rounded-lg text-2xl font-bold"
        >
          Update
        </button>
        <button
          onClick={() => {
            display("none");
          }}
          className="ml-10 bg-red-600 hover:bg-red-300 py-3 px-10    text-white rounded-lg text-2xl font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Update;
