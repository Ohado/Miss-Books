const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
        .then(setBook)
        .catch(err => {console.log("Problem getting book", err)})
    }

    function onBack() {
        navigate('/book')
    }

    if(!book) return <div>Loading your book...</div>

    const { id, title, description, thumbnail, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <section className="book-details">
            <h2 className="title">{title}</h2>
            <hr />
            <div className="price">{amount} {currencyCode}</div>
            <hr />
            <img src={book.thumbnail} alt="book cover" />
            <br />
            {book.description}
            <br />
            <button onClick={onBack}>Back</button>
       </section>
    )
}

