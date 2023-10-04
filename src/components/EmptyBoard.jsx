import { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Button from "./Button";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h3 className="mx-3 text-center text-2xl">
        {type === "edit"
          ? "This Board Is Empty Create A New Column To Get Started!"
          : "There Are No Boards Available. Create A New Board To Get Started! "}
      </h3>
      <Button onClick={() => setIsBoardModalOpen(true)} styles="mt-4">
        {type === "edit" ? "" : "Add New Column"}
      </Button>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
