import { useState } from "react";
import { v4 as v4Uuid } from "uuid";

function AddEditBoard({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
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

  return (
    <div
      className="scrollbar-hide fixed bottom-0 left-0 right-0 
      top-20 flex items-center justify-center overflow-scroll bg-[#00000080] px-2 py-4"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      <div
        className="scrollbar-hide mx-auto max-h-[95vh] w-full 
        max-w-md overflow-y-scroll rounded-xl bg-contentBgc px-8 py-8 font-bold shadow-md shadow-[#364e7e1a]"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm">Board Name</label>
          <input
            type="text"
            className=" rounded-md border border-textColor bg-transparent 
            px-4 py-2 text-sm  outline-none ring-1  focus:border-colorBrand"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Board Columns */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm">Board Columns</label>
          {newColumns.map((col) => {
            return (
              <div key={col.id} className="flex w-full items-center">
                <input
                  type="text"
                  className=" rounded-md border border-textColor bg-transparent 
                  px-4 py-2 text-sm  outline-none focus:border-colorBrand"
                  value={col?.name}
                  onChange={(e) => handleChange(col.id, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddEditBoard;
