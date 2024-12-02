import styles from "./Modal.module.css";

const Modal = ({ deleteSelectedContacts,setShowModal,setIsVisible }) => {

  const accept = () => {
    deleteSelectedContacts();
    setShowModal(false)
  };

  const onCancel=()=>{
    setShowModal (false)
    setIsVisible (false)
    return
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>Are you share ?</h1>
        <button onClick={onCancel}>No</button>
        <button onClick={accept}>Yes</button>
      </div>
    </div>
  );
};

export default Modal;
