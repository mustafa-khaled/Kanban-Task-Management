import { useState } from "react";
import { v4 as v4Uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addBoard, editBoard } from "../redux/features/boardsSlice";

import crossImage from "../assets/icon-cross.svg";
import Button from "../components/Button";

function AddEditBoard({ setBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: v4Uuid() },
    { name: "Doing", task: [], id: v4Uuid() },
  ]);

  const handleChange = (id, newValue) => {
    setNewColumns((prev) => {
      const newSate = [...prev];
      const column = newSate.find((col) => col.id === id);
      column.name = newValue;
      return newSate;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prev) => prev.filter((el) => el.id !== id));
  };

  const addNewInputColumn = () => {
    setNewColumns((prev) => [...prev, { name: "", task: [], id: v4Uuid() }]);
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = () => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(addBoard({ name, newColumns }));
    } else {
      dispatch(editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-20 
      flex items-center justify-center overflow-scroll bg-[#00000080] px-2 py-4 scrollbar-hide"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      <div
        className="mx-auto max-h-[95vh] w-full max-w-md 
        overflow-y-scroll rounded-xl bg-contentBgc px-8 py-8 font-bold shadow-md shadow-[#364e7e1a] scrollbar-hide"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm">Board Name</label>
          <input
            type="text"
            className="input"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Board Columns */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm">Board Columns</label>
          {newColumns?.map((col) => {
            return (
              <div key={col.id} className="flex w-full items-center gap-[10px]">
                <input
                  type="text"
                  className="input"
                  value={col?.name}
                  onChange={(e) => handleChange(col.id, e.target.value)}
                />
                <img
                  src={crossImage}
                  alt="CrossImage"
                  className="cursor-pointer"
                  onClick={() => onDelete(col.id)}
                />
              </div>
            );
          })}
        </div>

        <Button
          styles="w-full mt-4"
          type="secondary"
          onClick={addNewInputColumn}
        >
          + Add New Column
        </Button>

        <Button
          styles="w-full mt-4"
          onClick={() => {
            const valid = validate();
            if (valid === true) onSubmit(type);
          }}
        >
          {type === "add" ? "Create New Board" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default AddEditBoard;
