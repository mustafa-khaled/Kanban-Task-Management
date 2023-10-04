import Modal from "../Modal";
import BoardForm from "./BoardForm";

function AddEditBoard({ type, openBtn }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="userForm">{openBtn}</Modal.Open>
        <Modal.Window name="userForm">
          <BoardForm type={type} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddEditBoard;
