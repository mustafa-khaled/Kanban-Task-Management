import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as v4Uuid } from "uuid";
import { addTask, editTask } from "../redux/features/boardsSlice";

import crossIcon from "../assets/icon-cross.svg";
import Button from "../components/Button";

function AddEditTask({
  type,
  device,
  setOpenAddEditTask,
  prevColIndex = 0,
  taskIndex,
}) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: v4Uuid(),
    },
    {
      title: "",
      isCompleted: false,
      id: v4Uuid(),
    },
  ]);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive,
  );

  const columns = board.columns;
  const col = columns.find((co, index) => index === prevColIndex);
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prev) => {
      const newSate = [...prev];
      const subtasks = newSate.find((task) => task.id === id);
      subtasks.title = newValue;
      return newSate;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onDelete = (id) => {
    setSubtasks((prev) => prev.filter((el) => el.id !== id));
  };

  const addNewInputTask = () => {
    setSubtasks((prev) => [
      ...prev,
      { title: "", isCompleted: false, id: v4Uuid() },
    ]);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks?.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = () => {
    setOpenAddEditTask(false);
    if (type === "add") {
      dispatch(addTask({ title, description, subtasks, status, newColIndex }));
    } else {
      dispatch(
        editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          newColIndex,
          prevColIndex,
        }),
      );
    }
  };

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

        <Button styles="w-full mt-4" type="secondary" onClick={addNewInputTask}>
          + Add New Subtasks
        </Button>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm text-gray-500 dark:text-white">
            Current Status
          </label>

          <select
            value={status}
            onChange={onChangeStatus}
            className="select-status input"
          >
            {columns?.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>

          <Button
            styles="w-full mt-4"
            onClick={() => {
              const valid = validate();
              if (valid) onSubmit(type);
            }}
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTask;
