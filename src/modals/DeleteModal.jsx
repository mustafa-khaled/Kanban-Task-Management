import Button from "../components/Button.jsx";

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
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown">
      {/* Delete Modal  */}

      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto bg-contentBgc  font-bold
        shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8 py-8 rounded-xl">
        <h3 className="font-bold text-red-500 text-xl">Delete this {type}?</h3>
        {type === "task" ? (
          <p className="font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
          <Button variation="danger" styles="w-full" onClick={onDeleteBtnClick}>
            Delete
          </Button>
          <Button
            variation="secondary"
            styles="w-full"
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
