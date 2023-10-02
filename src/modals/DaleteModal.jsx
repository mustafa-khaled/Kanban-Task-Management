import Button from "../components/Button";

function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    // Modal Container
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className="dropdown fixed bottom-0 left-0 right-0 top-0 z-50  flex items-center justify-center overflow-scroll px-2 py-4 scrollbar-hide"
    >
      {/* Delete Modal  */}

      <div
        className=" mx-auto my-auto max-h-[95vh]  w-full  max-w-md overflow-y-scroll rounded-xl  
        bg-contentBgc px-8 py-8  font-bold  shadow-md 
        shadow-[#364e7e1a]  scrollbar-hide "
      >
        <h3 className=" text-xl font-bold text-red-500  ">
          Delete this {type}?
        </h3>
        {type === "task" ? (
          <p className="pt-6 text-xs font-[600] tracking-wide ">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="pt-6 text-xs font-[600] tracking-wide">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className=" mt-4 flex w-full items-center justify-center space-x-4 ">
          <Button variation="danger" styles="w-full" onClick={onDeleteBtnClick}>
            Delete
          </Button>

          <Button
            styles="w-full"
            variation="secondary"
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
