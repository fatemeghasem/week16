import { v4 } from "uuid";
import { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";

import inputs from "../Services/inputs";
import styles from "./AddContacts.module.css";

function AddContacts({ addContact, setShowComponent, contact, setContact }) {
  const [alert, setAlert] = useState("");

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setContact((prevContacts) => ({ ...prevContacts, [name]: value }));
  };

  const addHandler = () => {
    if (!contact.name || !contact.email || !contact.job || !contact.phone) {
      setAlert("please enter valid data!");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    addContact(newContact);
    setContact({
      name: "",
      email: "",
      job: "",
      phone: "",
    });
    setShowComponent(false);
  };

  return (
    <div className={styles.container2}>
      <div>
        {inputs.map((input, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? styles.even : styles.odd}
          >
            <label htmlFor={input.id}> {input.label} </label>
            <input
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={changeHandler}
            />
          </div>
        ))}
      </div>
      <button onClick={addHandler}>
        <IoIosPersonAdd fontSize="1.5rem" color="#754608" />
      </button>
      <div>{alert && <p>{alert}</p>}</div>
    </div>
  );
}

export default AddContacts;
