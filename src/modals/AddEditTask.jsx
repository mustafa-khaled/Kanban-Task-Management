import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";

function AddEditTask({ type, device, setOpenAddEditTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
  ]);

  const onChangeSubtasks = () => {};

  const onDelete = () => {};

  return (
    <div
      className={
        device === "mobile"
          ? " dropdown  absolute bottom-[-100vh] left-0 right-0  top-0 flex  overflow-y-scroll bg-[#00000080]  px-6 py-6 pb-40 scrollbar-hide "
          : "  dropdown absolute bottom-0  left-0 right-0  top-0 flex  overflow-y-scroll px-6 py-6 pb-40 "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" mx-auto my-auto max-h-[95vh] w-full  max-w-md  overflow-y-scroll rounded-xl bg-contentBgc px-8
       py-8 font-bold shadow-md  shadow-[#364e7e1a]  scrollbar-hide"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm">Task Name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className="input"
            placeholder=" e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm text-gray-500 dark:text-white">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className="input  min-h-[200px]"
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        {/* Subtasks */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm text-gray-500 dark:text-white">
            Subtasks
          </label>

          {subtasks?.map((subtask, index) => (
            <div key={index} className=" flex w-full items-center ">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className="input"
                placeholder=" e.g Take coffee break"
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(subtask.id);
                }}
                className=" m-4 cursor-pointer "
                alt="cross icon"
              />
            </div>
          ))}
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm text-gray-500 dark:text-white">
            Current Status
          </label>

          {/* <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-2  text-sm outline-none focus:border-0 focus:outline-[#635fc7]"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select> */}
        </div>
      </div>
    </div>
  );
}

export default AddEditTask;
