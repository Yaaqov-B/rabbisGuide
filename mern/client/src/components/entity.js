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
                    <ul  class="list-group">
                        {props.myProp.form.books.map(book => (
                            <li class="list-group-item  " key={book.title}>
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
                {/*<button onClick={addBook}>הוסף ספר</button>*/}
                <input
                    type="button"
                    value="הוסף ספר"
                    className="btn btn-secondary"
                    onClick={addBook}
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
