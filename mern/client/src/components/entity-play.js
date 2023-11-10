import React, {useState} from "react";


export default function Rabbi(props){
    function updateForm(value) {
        return props.myProp.setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const [newBookTitle, setNewBookTitle] = useState(
        ""
    );

    function addBook() {
        const newBook = {
            title: newBookTitle,
        };
        return props.myProp.form.books ?
             updateForm({ books: [...props.myProp.form.books, newBook]})
            :updateForm({ books: [ newBook]})
    }

    function removeBook(item){
        const newBooks = props.myProp.form.books.filter(value => value.title !== item)
        updateForm({books:newBooks})
    }

    const [newStudentName, setNewStudentName] = useState(
        ""
    );

    function addStudent() {
        const newStudent = {
            name: newStudentName,
        };
        return props.myProp.form.students ?
             updateForm({ students: [...props.myProp.form.students, newStudent]})
            :updateForm({ students: [ newStudent]})
    }

    function removeStudent(item){
        const newStudents = props.myProp.form.students.filter(value => value.title !== item)
        updateForm({newStudent:newStudents})
    }

    return(

        <form onSubmit={props.myProp.onSubmit}>
            <div className="form-group w-25">
                <label htmlFor="name">שם: </label>
                <input
                    type="text"
                    className="form-control "
                    id="name"
                    value={props.myProp.form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="position">כינוי: </label>
                <input
                    type="text"
                    className="form-control"
                    id="position"
                    value={props.myProp.form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="level">שלב: </label>
                <input
                    type="text"
                    className="form-control"
                    id="level"
                    value={props.myProp.form.level}
                    onChange={(e) => updateForm({ level: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="born">נולד: </label>
                <input
                    type="text"
                    className="form-control"
                    id="born"
                    value={props.myProp.form.born}
                    onChange={(e) => updateForm({ born: e.target.value })}
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
                                <button onClick={() => removeBook(book.title)}>X</button>
                            </li>
                        ))}
                    </ul> : ""
                }
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                />
                <input
                    type="button"
                    value="הוסף ספר"
                    className="btn btn-secondary"
                    onClick={addBook}
                />
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
                                <button onClick={() => removeBook(student.name)}>X</button>
                            </li>
                        ))}
                    </ul> : ""
                }
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                />
                <input
                    type="button"
                    value="הוסף תלמיד"
                    className="btn btn-secondary"
                    onClick={addStudent}
                />
            </div>
            <br />

            <div className="form-group">
                <input
                    type="submit"
                    value={props.myProp.title}
                    className="btn btn-primary"
                />
            </div>
        </form>
    );

}
