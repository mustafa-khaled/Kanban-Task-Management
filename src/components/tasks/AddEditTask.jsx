import Modal from "../Modal";
import TaskForm from "./TaskForm";

function AddEditTask({ type, openBtn }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="userForm">{openBtn}</Modal.Open>
        <Modal.Window name="userForm">
          <TaskForm type={type} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddEditTask;
