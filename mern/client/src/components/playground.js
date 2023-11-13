import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./search";
import CytoscapeComponent from 'react-cytoscapejs';
// import dagre from 'cytoscape-dagre';
// import Cytoscape from 'cytoscape';
import VisualGraph from "./VisualGraphVis";
import { elements } from "./mock2";

// Cytoscape.use(dagre);
//
const Record = (props) => (
    <tr>
        <td>
            <Link className="btn btn-link" to={`/show/${props.record._id}`}> {props.record.name}</Link> |
        </td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>{props.record.born}</td>
        <td>
            {props.record.books ?
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
            {props.students ?
                <ul>
                    {props.students.map(student => (

                        <li key={student._id}>
                            <Link className="btn btn-link" to={`/show/${student._id}`}>{student.name}</Link> |
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

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = records.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
    }, [records.length]);

    async function deleteRecord(id) {
        await fetch(`http://localhost:5050/record/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    function find_by_name(student){
        const res = records.filter((el) =>el.name === student.name);
        return res? res.at(0) : null;
    }

    function recordList() {
        return filteredItems.map((record) => {
            const students_ids = record.students?record.students.map((student) => find_by_name(student)):null;
            record.students=students_ids

            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                    students={students_ids}
                />
            );
        });
    }

    function getElement(rabbi, student){
        const res = [
            { data: { id: rabbi._id, label: rabbi.name }},
            { data: { id: student._id, label: student.name} },
            { data: { source: rabbi._id, target: student._id, label: 'Edge from Node1 to Node2' } }
        ];
        return res;
    }
    function getAllElements(rabbi){
        return rabbi.students.reduce((total, student)=> total.concat(getElement(rabbi, student)), [])
    }

    // const elements = records.reduce((total, rabbi)=> total.concat(getAllElements(rabbi)), [])




    // const layout = { name: 'dagre' };

    return (
        <div >
            <h3>רבנים</h3>
            {/*<SearchBox value={searchTerm} onChange={handleChange} />*/}
            <div className="App">
                <VisualGraph elements={elements} />
            </div>
            {/*<CytoscapeComponent elements={elements} style={{ width: '1200px', height: '600px' }} layout={layout} />*/}
            {/*<table className="table table-striped" style={{ marginTop: 20 }}>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>שם</th>`*/}
            {/*        <th>כינוי</th>*/}
            {/*        <th>דור</th>*/}
            {/*        <th>נולד</th>*/}
            {/*        <th>ספרים</th>*/}
            {/*        <th>תלמידים</th>*/}
            {/*        <th>פעולה</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>{recordList()}</tbody>*/}
            {/*</table>*/}
        </div>
    );
}
