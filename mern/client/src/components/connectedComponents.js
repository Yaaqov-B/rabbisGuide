import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./search";

export default function ConnectedComponents() {

    // This method fetches the records from the database.
    useEffect(() => {
        async function getConnectedComponents() {
            const response = await fetch(`http://localhost:5050/record/cc`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            //
            // const records = await response.json();
            // setRecords(records);
        }

        getConnectedComponents();
        });



}
