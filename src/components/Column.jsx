import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffle } from "lodash";
import Task from "./Task";

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-sky-500",
];

function Column({ colIndex }) {
  const dispatch = useDispatch();
  const [color, setColor] = useState(null);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);
  const col = board.columns.find((c, i) => i === colIndex);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleOnDrop = () => {};

  const handleOnDragOver = () => {};

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="mx-5   min-w-[280px] pt-[90px] scrollbar-hide "
    >
      <p className="flex items-center gap-2 font-semibold tracking-widest md:tracking-[.2em]">
        <span className={`h-4 w-4 rounded-full ${color}`} />
        {col.name} ({col?.tasks?.length})
      </p>

      {col?.tasks?.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
