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
            <CollapsedEl
                colHeader={<h2>Filter</h2>}
                extState={<BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter}/>} />
            <button><Link to={`/book/edit`}>Add Book</Link></button>
            <BookList books={books}/>
       </section>
    )
}

/* 
Bonuses todo:
1. <BookEdit> - allow the user to add books using a form.
Start with a simple form which has inputs for a title and a price and hard
code the rest of the data.
2. Refactor the <BookFilter> component to add more filtering options.
4. More edit options
4. More information shown in both list and details
*/