import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";

import AddContacts from "../modules/AddContacts";
import inputs from "../Services/inputs";
import ContactsList from "../modules/ContactsList";
import styles from "./Header.module.css";
import Modal from "../modules/Modal";

function Header() {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showModal,setShowModal]=useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
    id: "",
  });

  const addContact = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value.toLowerCase().trim());
  };

  const toggleContactSelection = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedContacts = () => {
    setContacts((prev) =>
      prev.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
    setIsVisible(!isVisible);
  };


  return (
    <>
      <div className={styles.container}>
        <div>
          <p>Searching Contacts:</p>
          <input
            type="text"
            placeholder="search"
            onChange={searchHandler}
            value={search}
          />
          <div className={styles.addbtn}>
            <button  className={styles.btn} onClick={deleteSelectedContacts}>
              <BsTrash fontSize="1.5rem" color="#6db7da" />
            </button>
            <button  className={styles.btn} onClick={() => setShowComponent((prev) => !prev)}>
              <IoIosPersonAdd fontSize="1.5rem" color="#6db7da" />
            </button>
          </div>
        </div>
      </div>
      {showComponent && (
        <AddContacts
          addContact={addContact}
          setShowComponent={setShowComponent}
          contact={contact}
          setContact={setContact}
        />
      )}
      <ContactsList
        contacts={contacts}
        setContacts={setContacts}
        toggleContactSelection={toggleContactSelection}
        search={search}
        isVisible={isVisible}
      />
      <button
        className={styles.btn}
        onClick={() => setShowModal(true)}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <BsTrash fontSize="1.5rem" color="#754608" />
      </button>
      {showModal &&(
        <Modal 
        setShowModal={setShowModal}
        setIsVisible={setIsVisible}
        deleteSelectedContacts={deleteSelectedContacts}
        />
      )}
    </>
  );
}

export default Header;
