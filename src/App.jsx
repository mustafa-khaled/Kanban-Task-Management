import Header from "./components/header/Header";
import Center from "./components/Center";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const { theme } = useSelector((state) => state.theme);

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
    <div className="h-[100vh] bg-bgc text-textColor">
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />
      <Center />
    </div>
  );
}

export default App;
