const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"

export function BookList({books}) {

    useEffect(() => {
        
    }, [])

    return (
        <ul className="book-list flex justify-around">
            {books.map((book) => 
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button><Link to={`/book/${book.id}`}>More Details {">"}</Link></button>
                </li>
            )}
        </ul>
    )
}

