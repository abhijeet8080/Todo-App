import React from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
export default function Todocards({ title, body, id, delid, display,updateId,tobeUpdate }) {
  return (
    <div className=" rounded-lg  shadow-lg border-x-4 border-red-600 outline-4 outline-black  p-10 flex flex-col space-y-5 justify-start  ">
      <div>
        <h5 className="text-3xl  text-black  font-bold">{title}</h5>
        <p className=" text-xl text-black  ">{body.split("", 40)}...</p>
      </div>
      <div className="mt-10 flex justify-between  text-black bottom-0">
        <div
          className="flex cursor-pointer items-center hover:text-gray-500 p-2"
          onClick={() => {
            display("block");
            tobeUpdate(updateId);
          }}
        >
          <GrDocumentUpdate className=" text-2xl" />
          Update
        </div>
        <div
          className="flex cursor-pointer items-center hover:text-gray-500 p-2"
          onClick={() => {
            delid(id);
          }}
        >
          <MdDelete className=" text-3xl text-red-500" />
          Delete
        </div>
      </div>
    </div>
  );
}
