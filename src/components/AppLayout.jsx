import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../redux/features/boardsSlice";
import { useEffect, useState } from "react";

import Home from "./Home";
import Header from "./header/Header";
import EmptyBoard from "./EmptyBoard";

function AppLayout() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((b) => b.isActive);
  if (!activeBoard && boards?.length > 0) {
    dispatch(setBoardActive({ index: 0 }));
  }

  const [boardModalOpen, setBoardModalOpen] = useState(false);

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
      {boards?.length > 0 ? (
        <>
          <Header
            boardModalOpen={boardModalOpen}
            setBoardModalOpen={setBoardModalOpen}
          />
          <Home />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default AppLayout;
