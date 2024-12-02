import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { TbUserCancel } from "react-icons/tb";


import styles from "./ContactList.module.css";
import inputs from "../Services/inputs";
import Modal2 from "./Modal2";

function ContactsList({ contacts, setContacts ,toggleContactSelection,search,isVisible}) {
  const [editContactId, setEditContactId] = useState(null);
  const [showM,setShowM]=useState(false);
  const [contactId,setContactId]=useState(null)
  const [editedContact, setEditedContact] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
  });

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editeHandler = (contact) => {
    setEditContactId(contact.id);
    setEditedContact(contact);
  };

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const saveEdit = () => {
    setContacts(
      contacts.map((contact) =>
        contact.id === editContactId ? editedContact : contact
      )
    );
    setEditContactId(null);
    setEditedContact({ name: "", email: "", job: "", Phone: "" });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search) ||
    contact.email.toLowerCase().includes(search) ||
    contact.phone.toString().includes(search)||
    contact.job.toString().includes(search)
  );

  return (
    <div className={styles.container}>
      {editContactId ? (
        <div className={styles.container3}>
          <h3>Edite contact</h3>
          {inputs.map((input, index) => (
            <div
              key={input.id}
              className={index % 2 === 0 ? styles.even : styles.odd}
            >
              <label htmlFor={input.id}>{input.label}</label>
              <input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                name={input.name}
                value={editedContact[input.name]}
                onChange={changeHandle}
              />
            </div>
          ))}
          <div className={styles.btn}>
          <button onClick={saveEdit}><MdOutlineSaveAlt fontSize="1.5rem" color="#754608" /></button>
          <button onClick={() => setEditContactId(null)}><TbUserCancel fontSize="1.5rem" color="#754608"/></button>
          </div>
        </div>
      ) : (
        <>
          {filteredContacts.length ? (
            <ul>
              {filteredContacts.map((contact, index) => (
                <li
                  key={contact.id}
                  className={index % 2 === 0 ? styles.even : styles.odd}
                >
                  <input 
                    type="checkbox" style={{display: isVisible ? "block":"none"}} 
                    onChange={() => toggleContactSelection(contact.id)} 
                  />
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                  <p>{contact.job}</p>
                  <p>{contact.phone}</p>
                  <button onClick={() => {setShowM(true),setContactId(contact.id) }}>
                  <BsTrash fontSize="1.5rem" color="#754608" />
                  </button>
                  <button onClick={() => editeHandler(contact)}><TbUserEdit fontSize="1.5rem" color="#754608" /></button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.listp}>No Contact Yet!</p>
          )}
          {showM&&(
            <Modal2 
            setContacts={setContacts}
            contacts={contacts}
            setShowM={setShowM}
            contactId={contactId}
            />
          )}
        </>
        
      )}
    </div>
  );
}

export default ContactsList;
