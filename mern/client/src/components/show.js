import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Rabbi from "./entity-view";

export default function Show() {

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
      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);


  const myObject = {
    form: form,
    setForm: setForm,
  };
  return (
      <div>
        <h3> רשומה</h3>
        <Rabbi myProp={myObject}/>
      </div>

  );
}


