import { bookService } from "../services/book.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookEdit() {

    const [ book, setBook ] = useState(bookService.getEmptyBook())
    // const [ book, setBook ] = useState({title:0})
    const { bookId } = useParams()    
    const Navigate = useNavigate()
    
    useEffect(() => {
        if(bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
        .then(setBook)
        .catch(err => {
            console.log('Problem getting book', err);
            showErrorMsg("Book failed to load")
        })

    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(book)
        .then(() => {
            showSuccessMsg("Book succesfully " + (bookId ? "edited" : "added"))
            Navigate('/book')
        })
    }

    function handleChange({ target }){
        let {value, name: field} = target
        switch(field){
            case 'author':
                value = [value, ...book.authors.slice(1)]
                field = 'authors'
                break
            case 'amount':
                value = {...book.listPrice, amount:Number(value)}
                field = 'listPrice'
                break
        }
        setBook((prevBook) => ({...prevBook, [field]:value}))
    }

    return (
        <section className="book-edit">
            <h2> { bookId ? "Edit" : "Add" } Book </h2>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Book Title</label>
                <input value={book.title} onChange={handleChange} type="text" name="title" id="title" required />
                <label htmlFor="author">Book Author</label>
                <input value={book.authors.join(', ')}  onChange={handleChange} type="text" name="author" id="author" />
                <label htmlFor="publishedDate">Published Year</label>
                <input value={book.publishedDate}  onChange={handleChange} type="number" name="publishedDate" id="publishedDate" />
                <label htmlFor="description">Description</label>
                <textarea value={book.description}  onChange={handleChange} name="description" id="description" />
                <label htmlFor="pageCount">Number of Pages</label>
                <input value={book.pageCount}  onChange={handleChange} type="number" name="pageCount" id="pageCount" />
                <label htmlFor="amount">Price</label>
                <input value={book.listPrice.amount} max={200} onChange={handleChange} type="number" name="amount" id="amount" />
                <button>Add</button>

            </form>
        </section>
    )
}

