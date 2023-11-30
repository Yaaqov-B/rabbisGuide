import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./search";
import VisualGraph from "./visualGraph";

const API_URL = process.env.API_URL || "http://localhost:5050";

const Record = (props) => (
    <tr>
        <td>
            <Link className="btn btn-link" to={`/show/${props.record._id}`}> {props.record.name}</Link> |
        </td>
        <td>{props.record.alias}</td>
        <td>{props.record.born}</td>
        <td>{props.record.died}</td>
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
    const [filteredRecords, setFilteredRecords] = useState([]);
    // const [elements, setElements] = useState({
    //     'nodes':[],
    //     'edges':[]
    // });

    const [showDiv, setShowDiv] = useState(false);

    const handleToggle = () => {
        setShowDiv((prevShowDiv) => !prevShowDiv);
    };

    const elements = useRef({
            'nodes':[],
            'edges':[]
        });
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        const filteredItems = records.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecords(filteredItems);
    };



    function normalizedRecords(items){
        return items.map((record)=>{
            record.students=record.students? record.students.map((student) => find_by_name(items, student)): null;
            return record
        });
    }

    function removeDuplicates(array) {
        // create a new map to store the seen ids
        const seen = new Map();
        // filter the array and keep only the objects with unique ids
        return array.filter((obj) => {
            // check if the id is already in the map
            const id = obj._id;
            const isDuplicate = seen.has(id);
            // if not, add it to the map
            if (!isDuplicate) {
                seen.set(id, true);
            }
            // return the opposite of isDuplicate
            return !isDuplicate;
        });
    }

    // function getGraphElements(items){
    //     console.log(items)
    //     // console.log('RECORDLIST')
    //     // console.log(elements)
    //     const nodes = items.reduce((total, rabbi)=> total.concat(getAllElements(rabbi,getNodes)), [])
    //     const edges = items.reduce((total, rabbi)=> total.concat(getAllElements(rabbi,getEdges)), [])
    //     // let nodes = items.reduce((total, rabbi)=> new Set(...total, ...getAllElements(rabbi,getNodes)), new Set())
    //     // let edges = items.reduce((total, rabbi)=> new Set(...total,...getAllElements(rabbi,getEdges)), new Set())
    //     // nodes = [...new Set(nodes)]
    //     // edges = [...new Set(edges)]
    //     // nodes = nodes.filter((node, index, nodes) => nodes.findIndex((node) => node._id === node._id) === index);
    //     // nodes = removeDuplicates(nodes)
    //     // edges = removeDuplicates(edges)
    //     console.log(nodes)
    //     console.log(edges)
    //     return {'nodes':nodes.concat([{id:"654dbe8a7e18ebcac42f221f",label:"aa",title:"tn"}]), 'edges':edges}
    //
    // }

    // function getGraphElements(items){
    //     const array = [1, 2, 3, 4];
    //     const transformedArray = array.reduce((accumulator, currentValue, index) => {
    //         accumulator.push({ id: index, label:'index' ,title:'index'});
    //         return accumulator;
    //     }, []);
    //     // console.log(transformedArray); // Output: [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }]
    //     // console.log(items)
    //     // console.log('RECORDLIST')
    //     // console.log(elements)
    //     const nodes = items.reduce((total, rabbi)=> {
    //         total.push({id: rabbi._id, label: rabbi.name, title: rabbi.level});
    //         return total;
    //     }, [])
    //     // const edges = items.reduce((total, rabbi)=> {
    //     //     return total.concat(rabbi.students.reduce((total2, student)=> {
    //     //             console.log(total2)
    //                 // return total2 + {from:rabbi._id, to:student._id}
    //             // }, [])
    //         // )
    //     // }, [])
    //     // console.log(nodes)
    //     // console.log(edges)
    //     const edges = [{from:1, to:2}]
    //     console.log(elements2)
    //     // console.log({'nodes':transformedArray, 'edges':edges})
    //     // return {'nodes':transformedArray, 'edges':edges}
    //     return elements2
    // }

    function setGraph(items){
        const nodes = items.reduce((total, rabbi)=> {
            total.push({id: rabbi._id, label: rabbi.name, title: rabbi.died});
            return total;
        }, [])
        const edges = items.reduce((total, rabbi)=> {
            return total.concat(rabbi.students.reduce((total2, student)=> {
                total2.push({from:rabbi._id, to:student._id});
                return total2
            }, []))
        }, [])
        elements.current = {'nodes':nodes, 'edges':edges}
    }

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(API_URL + `record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const res = await response.json();
            const normalized = normalizedRecords(res);
            setGraph(normalized)

            setRecords(normalized);
            // elements.current = {'nodes':nodes, 'edges':edges}

            // console.log(normalized)
            // setElements(getGraphElements(records))
            // console.log(elements)
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

    function find_by_name(items, student){
        const res = items.filter((el) =>el.name === student.name);
        return res? res.at(0) : null;
    }

    function recordList() {
        return filteredRecords.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                    students={record.students}
                />
            );
        });
    }

    // function getElement(rabbi, student){
    //     const res = [
    //         { data: { id: rabbi._id, label: rabbi.name }},
    //         { data: { id: student._id, label: student.name} },
    //         { data: { source: rabbi._id, target: student._id, label: 'Edge from Node1 to Node2' } }
    //     ];
    //     return res;
    // }

    function getNodes(rabbi, student){
        // console.log(rabbi._id)
        const nodes = [
            {id: rabbi._id, label: rabbi.name, title: rabbi.died},
            // {id: student._id, label: student.name, title: student.level},

            // { data: { id: rabbi._id, label: rabbi.name }},
            // { data: { id: student._id, label: student.name} },
            // { data: { source: rabbi._id, target: student._id, label: 'Edge from Node1 to Node2' } }
        ];
        // const edges = [
        //     {from:rabbi._id, to:student._id}
        // ]
        // return {nodes: nodes, edges:edges};
        return nodes;
    }
    function getEdges(rabbi, student){
        const edges = [
            {from:rabbi._id, to:student._id}
        ]
        return edges
    }
    function getAllElements(rabbi, get_function){
        return rabbi.students.reduce((total, student)=> total.concat(get_function(rabbi, student)), [])
        // const edges = rabbi.students.reduce((total, student)=> total.concat(getEdges(rabbi, student)), [])
        // console.log(nodes)
        // console.log(edges)
        // console.log({'nodes':nodes, 'edges':edges})
        // return {'nodes':nodes, 'edges':edges}

    }
    // recordList()
    // console.log(records)


    // const layout = { name: 'dagre' };

    return (
        <div >
            <h3>רבנים</h3>
            <SearchBox value={searchTerm} onChange={handleChange} />
            <div>
                <button onClick={handleToggle}>גרף</button>
                {showDiv && <div>
                    <VisualGraph elements={elements.current} />
                </div>}
            </div>
            {/*<div className="App">*/}
                {/*<VisualGraph elements={getGraphElements(records)} />*/}
            {/*</div>*/}
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
