import { useState } from "react";
import logo from "/logo.jpg";

import iconDown from "../../assets/icon-chevron-down.svg";
import iconUp from "../../assets/icon-chevron-up.svg";
import Button from "../Button";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoard from "../../modals/AddEditBoard";
import { useSelector } from "react-redux";
import AddEditTask from "../../modals/AddEditTask";

function Header({ boardModalOpen, setBoardModalOpen }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [openAddEditTask, setOpenAddEditTask] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  return (
    <header className="fixed left-0 right-0 z-50 bg-contentBgc p-4">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="Logo" className="h-9 w-9" />
          <h3 className="hidden font-bold md:inline-block md:text-4xl">Logo</h3>
          <div className="flex items-center">
            <h3 className="max-w-[200px] truncate text-xl font-bold md:ml-20 md:text-2xl">
              {board?.name}
            </h3>
            <img
              src={openDropDown ? iconUp : iconDown}
              alt="drag drop icon"
              className="ml-2 w-3 cursor-pointer md:hidden"
              onClick={() => setOpenDropDown((prev) => !prev)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Button onClick={() => setOpenAddEditTask((prev) => !prev)}>
            <span className="hidden md:block">+ Add New Task</span>
            <span className="block md:hidden">+</span>
          </Button>
          <img src={ellipsis} alt="ellipsis" className="h-6 cursor-pointer" />
        </div>
      </div>

      {openDropDown && (
        <HeaderDropdown
          setOpenDropDown={setOpenDropDown}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {boardModalOpen && (
        <AddEditBoard type={boardType} setBoardModalOpen={setBoardModalOpen} />
      )}

      {openAddEditTask && (
        <AddEditTask setOpenAddEditTask={setOpenAddEditTask} device="mobile" />
      )}
    </header>
  );
}

export default Header;
