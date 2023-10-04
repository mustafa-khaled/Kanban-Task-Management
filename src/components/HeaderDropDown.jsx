import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../redux/boardsSlice";

import boardIcon from "../assets/icon-board.svg";
import ThemeToggle from "./ThemeToggle";

function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}>
      {/* DropDown Modal */}

      <div className="bg-contentBgc shadow-md shadow-[#364e7e1a] w-full  py-4 rounded-xl">
        <h3 className="font-semibold mx-4 mb-8">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={`flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive && "bg-blue rounded-r-full  mr-8"
              } `}
              key={index}
              onClick={() => {
                dispatch(setBoardActive({ index }));
              }}>
              <img
                src={boardIcon}
                className="filter-white h-4"
                alt="boardIcon"
              />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className="flex items-baseline space-x-2  text-blue px-5 py-4">
            <img src={boardIcon} className="filter-white h-4" alt="boardIcon" />
            <p className=" text-lg font-bold  ">Create New Board </p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
