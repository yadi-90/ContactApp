import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const UserForm = ({
  onSaveContact,
  onUpdateContact,
  editingContact,
  toUpdate,
}) => {
  // create initial state for contacts list

  const [contact, setContact] = useState(
    editingContact || {
      name: "",
      phone_number: "",
      email: "",
     birthday: "",
    }
  );

  //create functions that handle the event of the user typing into the form
  const handleChange = (property) => {
    return (e) => {
      setContact({ ...contact, [property]: e.target.value });
      // console.log(contact);
    };
  };

  const clearForm = () => {
    setContact({
      name: "",
     
      phone_number: "",
      email: "",
      birthday: "",
    });
    toUpdate(null);

    // window.location = "/";
  };

  //A function to handle the post request
  const postContact = (contact) => {
    return fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of Students (the parent) for updating the list
        onSaveContact(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the post request
  const putContact = (toEditContact) => {
    console.log("test");
    return fetch(
      `http://localhost:5000/api/contact/${toEditContact.contact_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toEditContact),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateContact(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = { ...contact };
    for (let property in temp) {
      if (!temp[property]) {
        temp[property] = null;
      }
    }
    console.log("Actual contact variable in this moment", contact);
    console.log("Temp variable with null replacing", temp);
    if (temp.contact_id) {
      putContact(temp);
    } else {
      postContact(temp);
    }
  };

  return (
    <Form className="form-students" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="add-user-name">Name</Form.Label>
        <input
          type="text"
          id="add-user-name"
          placeholder="Name"
          required
          value={contact.name}
          onChange={handleChange("name")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="add-user-phone">Phone Number</Form.Label>
        <input
          type="text"
          id="add-user-phone"
          placeholder="Phone Number"
          required
          value={contact.phone}
          onChange={handleChange("phone")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="add-user-email">Email</Form.Label>
        <input
          type="text"
          id="add-user-email"
          placeholder="Email"
          required
          value={contact.email}
          onChange={handleChange("email")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="add-user-notes">Birthday</Form.Label>
        <textarea
          id="add-user-birthday"
          placeholder="Birthday"
          value={!contact.birthday ? "" : contact.birthday}
          onChange={handleChange("birthday")}
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="outline-success">
          {contact.contact_id ? "Edit Contact" : "Add Contact"}
        </Button>
        {contact.contact_id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default UserForm;
