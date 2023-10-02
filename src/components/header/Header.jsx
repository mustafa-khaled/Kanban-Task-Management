import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard, setBoardActive } from "../../redux/features/boardsSlice";

import logo from "/logo.jpg";
import iconDown from "../../assets/icon-chevron-down.svg";
import iconUp from "../../assets/icon-chevron-up.svg";
import Button from "../Button";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoard from "../../modals/AddEditBoard";
import AddEditTask from "../../modals/AddEditTask";
import EllipsisMenu from "./EllipsisMenu";
import DeleteModal from "../../modals/DaleteModal";

function Header({ boardModalOpen, setBoardModalOpen }) {
  const dispatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteBoard());
    dispatch(setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setBoardType("add");
    setOpenDropDown((prev) => !prev);
    setIsEllipsisOpen(false);
  };

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
              onClick={() => onDropdownClick()}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Button onClick={() => setOpenAddEditTask((prev) => !prev)}>
            <span className="hidden md:block">+ Add New Task</span>
            <span className="block md:hidden">+</span>
          </Button>
          {/* Ellipsis Image */}
          <div
            className="w-[30px] cursor-pointer"
            onClick={() => {
              setBoardType("edit");
              setOpenDropDown(false);
              setIsEllipsisOpen((prev) => !prev);
            }}
          >
            <img src={ellipsis} alt="ellipsis" className="mx-auto h-6" />
          </div>
          {isEllipsisOpen && (
            <EllipsisMenu
              type="Boards"
              setIsEllipsisOpen={setIsEllipsisOpen}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
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
        <AddEditTask
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board?.name}
          type="Board"
        />
      )}
    </header>
  );
}

export default Header;
