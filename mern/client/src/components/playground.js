import React, { useState } from "react";
import {useNavigate } from "react-router";
import Rabbi from "./entity-play";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        born: "",
        books: [],
        students: [],
    });

    const navigate = useNavigate();

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
            });

        setForm({ name: "", position: "", level: "" , born: "" ,books: [], students: []});
        navigate("/");
    }

    const myObject = {
        form: form,
        setForm: setForm,
        onSubmit: onSubmit,
        title: "הוסף רשומה"
    };
    return (
        <div>
            <h3>הוסף רשומה</h3>
            <Rabbi myProp={myObject}/>
        </div>
    );
}

