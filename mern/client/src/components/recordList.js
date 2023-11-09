import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>{props.record.born}</td>
        <td>
            {props.record.books ?
                // className="w-50"
                <ul>
                    {props.record.books.map(book => (
                        <li key={book.title}>
                            <input
                                type="text"
                                className="form-control"
                                id="book"
                                value={book.title}
                            />
                        </li>
                    ))}
                </ul> : ""
            }
        </td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>ערוך</Link> |
            <button className="btn btn-link"
                    onClick={() => {
                        props.deleteRecord(props.record._id);
                    }}
            >
                מחק
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5050/record/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div >
            <h3>רבנים</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>שם</th>
                    <th>כינוי</th>
                    <th>דור</th>
                    <th>נולד</th>
                    <th>ספרים</th>
                    <th>פעולה</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}
