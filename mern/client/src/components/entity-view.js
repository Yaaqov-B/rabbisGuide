import React, {useState} from "react";


export default function Rabbi(props){
    return(

        <form>
            <div className="form-group w-25">
                <label htmlFor="name">שם: </label>
                <input
                    type="text"
                    className="form-control "
                    id="name"
                    value={props.myProp.form.name}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="position">כינוי: </label>
                <input
                    type="text"
                    className="form-control"
                    id="position"
                    value={props.myProp.form.position}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="level">שלב: </label>
                <input
                    type="text"
                    className="form-control"
                    id="level"
                    value={props.myProp.form.level}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="born">נולד: </label>
                <input
                    type="text"
                    className="form-control"
                    id="born"
                    value={props.myProp.form.born}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="books">ספרים: </label>
                {props.myProp.form.books ?
                    <ul className="list-group">
                        {props.myProp.form.books.map(book => (
                            <li className="list-group-item  " key={book.title}>
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
            </div>
            <div className="form-group w-25">
                <label htmlFor="students">תלמידים: </label>
                {props.myProp.form.students ?
                    <ul className="list-group">
                        {props.myProp.form.students.map(student => (
                            <li className="list-group-item  " key={student.name}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="student"
                                    value={student.name}
                                />
                            </li>
                        ))}
                    </ul> : ""
                }
            </div>
            <br />

        </form>
    );

}
