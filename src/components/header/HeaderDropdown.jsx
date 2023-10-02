import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../../assets/icon-board.svg";
import ThemeToggle from "./ThemeToggle";
import { setBoardActive } from "../../redux/features/boardsSlice";

function HeaderDropdown({ setOpenDropDown, setBoardModalOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="absolute bottom-[-100vh] left-0 right-0 top-20 bg-[#00000080] px-6 py-10"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropDown(false);
      }}
    >
      {/* Dropdown Modal */}
      <div className="w-full rounded-xl bg-contentBgc py-4 shadow-md shadow-[#364e7e1a]">
        <h3 className="mx-4 mb-8 font-semibold">
          All Boards ({boards?.length})
        </h3>
        <div>
          {boards?.map((board, index) => {
            return (
              <div
                key={index}
                className={`flex cursor-pointer items-baseline space-x-2 px-5 py-4 ${
                  board?.isActive &&
                  "mr-8 rounded-r-full  bg-colorBrand text-white"
                }`}
                onClick={() => dispatch(setBoardActive({ index }))}
              >
                <img src={boardIcon} alt="" className="h-4" />
                <p className="text-lg font-bold">{board?.name}</p>
              </div>
            );
          })}

          <div
            className={`flex cursor-pointer items-baseline space-x-2 px-5 py-4 text-colorBrand`}
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropDown(false);
            }}
          >
            <img src={boardIcon} alt="" className="h-4" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
