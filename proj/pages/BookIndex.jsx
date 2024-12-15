const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { CollapsedEl } from "../cmps/CollapsedEl.jsx"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onSetFilter(newFilter) {
        setFilterBy(prevFilter => ({...prevFilter, ...newFilter}))
    }

    return (
        <section className="book-index">
            <h2 className="title">Your index</h2>
            <CollapsedEl className="filter"
                colHeader="Filter"
                ExtState={<BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter}/>} />
            <div className="buttons">
                <button className="add-button"><Link to={`/book/edit`}><div>Add Personal Book</div></Link></button>
                <button className="add-button"><Link to={`/book/add`}><div>Find More Books</div></Link></button>
            </div>
            <BookList books={books} onRefresh={loadBooks}/>
       </section>
    )
}