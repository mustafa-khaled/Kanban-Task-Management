import { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ taskIndex, colIndex }) {
  const boards = useSelector((state) => state?.boards);
  const board = boards?.find((b) => b?.isActive);
  const columns = board?.columns;
  const col = columns?.find((c, i) => i === colIndex);
  const task = col?.tasks?.find((c, i) => i === taskIndex);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  let completed = 0;
  const subtasks = task?.subtasks;

  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = () => {};

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] cursor-pointer rounded-lg   bg-contentBgc px-3 py-6
        shadow-lg shadow-[#364e7e1a] first:my-5 hover:text-colorBrand"
      >
        <p className="font-bold tracking-wide">{task?.title}</p>
        <p className="mt-2 text-xs font-bold tracking-tighter">
          {completed} of {subtasks?.length} completed tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
