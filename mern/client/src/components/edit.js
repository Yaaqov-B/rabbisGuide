import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Rabbi from "./entity";

export default function Edit() {

  const [form, setForm] = useState({});

  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      // setBooks(record.books)

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);


  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      position: form.position,
      level: form.level,
      born: form.born,
      books: form.books,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  const myObject = {
    form: form,
    setForm: setForm,
    onSubmit: onSubmit,
    title: "עדכן רשומה"
  };
  return (
      <div>
        <h3>עדכן רשומה</h3>
        <Rabbi myProp={myObject}/>

      </div>

  );
}


