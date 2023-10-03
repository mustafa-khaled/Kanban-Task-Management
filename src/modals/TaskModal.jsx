import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setTaskStatus } from "../redux/features/boardsSlice";

import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import Subtask from "../components/Subtask";
import EllipsisMenu from "../components/header/EllipsisMenu";
import DeleteModal from "./DeleteModal";
import AddEditTask from "./AddEditTask";

function TaskModal({ colIndex, taskIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state?.boards);
  const board = boards?.find((b) => b?.isActive);
  const columns = board?.columns;
  const col = columns?.find((c, i) => i === colIndex);
  const task = col?.tasks?.find((c, i) => i === colIndex);
  const subtasks = task?.subtasks;

  let completed = 0;
  subtasks?.forEach((subtask) => {
    if (subtask?.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task?.status);
  const [newColIndex, setNewColIndex] = useState(columns?.indexOf(col));
  const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsEllipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsEllipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      }),
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(deleteTask({ taskIndex, colIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className=" dropdown fixed bottom-0 left-0 right-0 top-0 z-50  flex items-center
       justify-center overflow-scroll px-2 py-4 scrollbar-hide "
    >
      {/* MODAL SECTION */}

      <div
        className=" mx-auto my-auto max-h-[95vh]  w-full  max-w-md overflow-y-scroll rounded-xl
       bg-contentBgc  px-8 py-8 font-bold  shadow-md shadow-[#364e7e1a]
        scrollbar-hide "
      >
        <div className=" relative flex   w-full items-center justify-between">
          <h1 className=" text-lg">{task?.title}</h1>

          <img
            onClick={() => {
              setIsEllipsisMenuOpen((prevState) => !prevState);
            }}
            src={ellipsis}
            alt="ellipsis img"
            className=" h-6 cursor-pointer"
          />
          {isEllipsisMenuOpen && (
            <EllipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="pt-6 text-xs font-[600] tracking-wide">
          {task?.description}
        </p>

        <p className="pt-6 text-sm tracking-widest">
          Subtasks ({completed} of {subtasks?.length})
        </p>

        {/* subtasks section */}

        <div className=" mt-3 space-y-2">
          {subtasks?.map((subtask, index) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm">Current Status</label>
          <select
            className="select-status input"
            value={status}
            onChange={onChange}
          >
            {columns?.map((col, index) => (
              <option className="status-options" key={index}>
                {col?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task?.title}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTask
          setOpenAddEditTask={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
