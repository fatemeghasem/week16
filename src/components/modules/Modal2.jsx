import styles from "./Modal.module.css"

function Modal2({setContacts,contacts,setShowM ,contactId}) {
   
    const deleteContact = (id) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
        setShowM(false)
      };


  return (
        <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>Are you sure ?</h1>
        <button onClick={()=>setShowM(false)}>No</button>
        <button onClick={()=>deleteContact(contactId)}>Yes</button>
      </div>
    </div>
  )
}

export default Modal2