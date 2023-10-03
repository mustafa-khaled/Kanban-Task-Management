import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../redux/features/boardsSlice";

import boardIcon from "../assets/icon-board.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import AddEditBoard from "../modals/AddEditBoard";
import ThemeToggle from "./header/ThemeToggle";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={`${isSideBarOpen ? "bg-contentBgc" : "bg-colorBrand"}    ${
          isSideBarOpen
            ? `fixed left-0 top-[72px] z-20 h-screen min-w-[261px] items-center`
            : `fixed bottom-10 top-auto h-[48px] w-[56px] 
            transform cursor-pointer items-center justify-center rounded-r-full 
            p-0 transition duration-300
            hover:opacity-80 `
        }`}
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className="w-full rounded-xl  py-4">
              <h3 className=" mx-4 mb-8 font-semibold ">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="  dropdown-board flex h-[70vh] flex-col justify-between  ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`mr-8 flex cursor-pointer items-baseline space-x-2 
                      rounded-r-full px-5 py-4 duration-500 ease-in-out ${
                        board.isActive && "mr-8 rounded-r-full bg-colorBrand"
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                      }}
                    >
                      <img
                        src={boardIcon}
                        className="  filter-white  h-4 "
                        alt="boardIcon"
                      />
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" mr-8  flex cursor-pointer  items-baseline space-x-2 rounded-r-full 
                    px-5 py-4  text-colorBrand duration-500 
                    ease-in-out"
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img
                      src={boardIcon}
                      className="   filter-white  h-4 "
                      alt="boardIcon"
                    />
                    <p className=" text-lg font-bold  ">Create New Board </p>
                  </div>
                </div>

                <ThemeToggle />
              </div>
            </div>
          )}

          {/* Sidebar hide/show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className=" absolute  bottom-16 my-4  mb-8 mr-6  mt-2 flex 
               cursor-pointer items-center justify-center space-x-2 rounded-r-full 
               px-8 py-4 text-lg font-bold  
               hover:text-colorBrand "
            >
              <img
                className=" min-w-[20px]"
                src={hideSidebarIcon}
                alt=" side bar show/hide"
              />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div className=" absolute p-5  " onClick={() => toggleSidebar()}>
              <img src={showSidebarIcon} alt="showSidebarIcon" />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoard type="add" setBoardModalOpen={setIsBoardModalOpen} />
      )}
    </div>
  );
}

export default Sidebar;
