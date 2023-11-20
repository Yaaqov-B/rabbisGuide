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
                <label htmlFor="alias">כינוי: </label>
                <input
                    type="text"
                    className="form-control"
                    id="alias"
                    value={props.myProp.form.alias}
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
                <label htmlFor="died">נפטר: </label>
                <input
                    type="text"
                    className="form-control"
                    id="died"
                    value={props.myProp.form.died}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="birthPlace">מקום לידה: </label>
                <input
                    type="text"
                    className="form-control"
                    id="birthPlace"
                    value={props.myProp.form.birthPlace}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="deathPlace">מקום פטירה: </label>
                <input
                    type="text"
                    className="form-control"
                    id="deathPlace"
                    value={props.myProp.form.deathPlace}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="description">תיאור: </label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={props.myProp.form.description}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="externalLinks">קישורים: </label>
                <input
                    type="text"
                    className="form-control"
                    id="externalLinks"
                    value={props.myProp.form.externalLinks}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="books">ספריו: </label>
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
                <label htmlFor="teachers">רבותיו: </label>
                {props.myProp.form.teachers ?
                    <ul className="list-group">
                        {props.myProp.form.teachers.map(teacher => (
                            <li className="list-group-item  " key={teacher.name}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="teacher"
                                    value={teacher.name}
                                />
                            </li>
                        ))}
                    </ul> : ""
                }
            </div>
            <div className="form-group w-25">
                <label htmlFor="students">תלמידיו: </label>
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
