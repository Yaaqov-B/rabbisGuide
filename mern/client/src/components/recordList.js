import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./search";

const Record = (props) => (
    <tr>
        <td>
            <Link className="btn btn-link" to={`/show/${props.record._id}`}> {props.record.name}</Link>
        </td>
        <td>{props.record.alias}</td>
        <td>{props.record.born}</td>
        <td>{props.record.died}</td>
        <td>{props.record.birthPlace}</td>
        <td>{props.record.deathPlace}</td>
        <td>{props.record.description}</td>
        <td>
            {props.record.externalLinks ?
                <Link className="btn btn-link" to={props.record.externalLinks}>עוד מידע</Link>
                : ""
            }
        </td>
        <td>
            {props.record.books ?
                <ul>
                    {props.record.books.map(book => (
                        <li key={book.title}>{book.title}</li>
                    ))}
                </ul> : ""
            }
        </td>
        <td>
            {props.teachers ?
                <ul>
                    {props.teachers.filter(teacher=>teacher != null && teacher._id  != null).map(teacher => (

                        <li key={teacher._id}>
                            <Link className="btn btn-link" to={`/show/${teacher._id}`}>{teacher.name}</Link>
                        </li>
                    ))}
                </ul> : ""
            }
        </td>
        <td>
            {props.students ?
                <ul>
                    {props.students.filter(student=>student != null && student._id  != null).map(student => (

                        <li key={student._id}>
                            <Link className="btn btn-link" to={`/show/${student._id}`}>{student.name}</Link>
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

    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedData = records.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return sortOrder === 'asc' ? -1 : 1;
        } else

        if (a[sortField] > b[sortField]) {
            return sortOrder === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    });

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
        if (!student) return null;
        const res = records.filter((el) =>el.name === student.name);
        return res? res.at(0) : null;
    }

    function recordList() {
        return filteredItems.map((record) => {
            const students_ids = record.students?record.students.map((student) => find_by_name(student)):null;
            record.students=students_ids;
            const teachers_ids = record.teachers?record.teachers.map((teacher) => find_by_name(teacher)):null;
            record.teachers=teachers_ids

            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                    teachers={teachers_ids}
                    students={students_ids}
                />
            );
        });
    }

    return (
        <div >
            <h3>רבנים</h3>
            <SearchBox value={searchTerm} onChange={handleChange} />

            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th  onClick={() => handleSort('name')}>
                            שם
                            {sortField === 'name' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'name' && sortOrder === 'desc' && <span>▾</span>}

                    </th>
                    <th  onClick={() => handleSort('alias')}>
                        כינוי
                            {sortField === 'alias' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'alias' && sortOrder === 'desc' && <span>▾</span>}

                    </th>
                    <th  onClick={() => handleSort('born')}>
                        נולד
                        {sortField === 'born' && sortOrder === 'asc' && <span> ▴</span>}
                        {sortField === 'born' && sortOrder === 'desc' && <span>▾</span>}

                    </th>
                    <th  onClick={() => handleSort('died')}>
                        נפטר
                        {sortField === 'died' && sortOrder === 'asc' && <span> ▴</span>}
                        {sortField === 'died' && sortOrder === 'desc' && <span>▾</span>}

                    </th>
                    <th  onClick={() => handleSort('birthPlace')}>
                        מקום לידה
                        {sortField === 'birthPlace' && sortOrder === 'asc' && <span> ▴</span>}
                        {sortField === 'birthPlace' && sortOrder === 'desc' && <span>▾</span>}

                    </th>
                    <th  onClick={() => handleSort('deathPlace')}>
                        מקום פטירה
                        {sortField === 'deathPlace' && sortOrder === 'asc' && <span> ▴</span>}
                        {sortField === 'deathPlace' && sortOrder === 'desc' && <span>▾</span>}

                    </th>
                    <th>תיאור</th>
                    <th>קישורים</th>
                    <th>ספריו</th>
                    <th>רבותיו</th>
                    <th>תלמידיו</th>
                    <th>פעולה</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}
