import Header from "./components/header/Header";
import Center from "./components/Center";
import { useState } from "react";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

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
