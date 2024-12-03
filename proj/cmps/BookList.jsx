const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"

export function BookList({books}) {

    useEffect(() => {
        
    }, [])

    return (
        <ul className="book-list">
            {books.map((book) => 
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button><Link to={`/book/${book.id}`}>More Details {">"}</Link></button>
                    <button><Link to={`/book/edit/${book.id}`}>Edit {">"}</Link></button>
                </li>
            )}
        </ul>
    )
}

