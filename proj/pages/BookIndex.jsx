const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function BookIndex() {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        // loadBooks()
    }, [])

    function loadBooks() {
        books = setBooks(bookService.query())
        
    }

    return (
        <section className="book-index">
            <h1 className="title">Your index</h1>
            
       </section>
    )
}

