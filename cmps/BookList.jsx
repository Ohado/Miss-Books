const { useState, useEffect, useReducer } = React
const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"

export function BookList({books, onRefresh}) {

    function onRemove(book) {
        return () =>
            bookService.remove(book.id).then( () => {
                onRefresh()
                showSuccessMsg("Book removed successfully")
            }
            ).catch(err =>{
                showErrorMsg("Failed to delete book")
                console.log("Failed to delete book: " + err)
            }
        )
    }

    return (
        <ul className="book-list">
            {books.map((book) => 
                <li key={book.id}>
                    <Link to={`/book/${book.id}`}><BookPreview book={book} /></Link>
                    <div className="buttons">
                        <button><Link to={`/book/edit/${book.id}`}>{"✏️"} Edit</Link></button>
                        <button onClick={onRemove(book)}>{"🗑️"} Delete</button>
                    </div>
                </li>
            )}
        </ul>
    )
}

