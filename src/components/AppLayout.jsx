import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../redux/boardsSlice";

import Header from "./Header";
import Home from "./Home";
import EmptyBoard from "./EmptyBoard";

function AppLayout() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  if (!activeBoard && boards.length > 0) dispatch(setBoardActive({ index: 0 }));

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="overflow-hidden overflow-x-auto bg-bgc text-textColor">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
            <Home
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default AppLayout;
