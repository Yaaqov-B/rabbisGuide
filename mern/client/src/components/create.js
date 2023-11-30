import React, { useState } from "react";
import {useNavigate } from "react-router";
import Rabbi from "./entity";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        alias: "",
        born: "",
        died: "",
        birthPlace: "",
        deathPlace: "",
        description: "",
        externalLinks: "",
        books: [],
        teachers: [],
        students: [],
    });

    const navigate = useNavigate();

    function onChangeForm(value) {
        return setForm((prev) => {
            let newVar = {...prev, ...value};
            // console.log(newVar)
            return newVar;
        })
    }
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        console.log(newPerson)
        await fetch("https://master--toldot.netlify.app/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
            });

        setForm({ name: "", alias: "",  born: "", died: "" , birthPlace: ""  , deathPlace: ""  , description: ""  , externalLinks: ""   ,books: [], teachers: []  , students: []});
        navigate("/");
    }

    const myObject = {
        form: form,
        onChangeForm: onChangeForm,
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

