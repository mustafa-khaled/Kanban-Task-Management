function EllipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className={`absolute
      ${type === "Boards" ? "top-16  right-5" : "top-6  right-4"}`}>
      <div className="flex justify-end items-center">
        <div
          className=" w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a]
         bg-bgc space-y-4 py-5 px-4 rounded-lg  h-auto pr-12">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer">
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500">
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EllipsisMenu;
