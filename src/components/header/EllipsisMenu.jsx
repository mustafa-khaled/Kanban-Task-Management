function EllipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className={`absolute ${
        type === "Boards" ? "right-5  top-16" : "right-4  top-6"
      }`}
    >
      <div className=" flex items-center justify-end">
        <div
          className=" z-50 h-auto w-40 space-y-4 rounded-lg 
        bg-contentBgc px-4 py-5 pr-12 text-sm font-medium  shadow-md"
        >
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className=" cursor-pointer"
          >
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className=" cursor-pointer text-red-500"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EllipsisMenu;
