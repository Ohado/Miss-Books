const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filter, setFilter] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filter])

    function loadBooks() {
        bookService.query(filter).then(setBooks)
    }

    function onSetFilter(newFilter) {
        setFilter(prevFilter => ({...prevFilter, ...newFilter}))
    }

    return (
        <section className="book-index">
            <h2 className="title">Your index</h2>
            <BookFilter defaultFilter={filter} onSetFilter={onSetFilter}/>
            <BookList books={books}/>
       </section>
    )
}

