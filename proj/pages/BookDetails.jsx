const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

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

    const { id, title, subtitle, authors, publishedDate, description, 
        pageCount, categories, thumbnail, language, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice
    
    const lengthRating = pageCount > 500 ? "Serious Reading"
        : pageCount > 200 ? "Descent Reading"
        : pageCount < 100 ? "Light Reading" 
        : ""
    const currentYear = new Date().getFullYear()
    const yearRating = currentYear - publishedDate > 10 ? "Vintage" 
        : currentYear - publishedDate < 1 ? "New" 
        : ""
    const priceRating = amount > 150 ? "expansive" 
        : amount < 20 ? "cheap" 
        : ""

    return (
        <section className="book-details">
            <h2 className="title">{title}</h2>
            <hr />
            <div className="detail-tag">{lengthRating}</div>
            <div className="detail-tag">{yearRating}</div>
            <div className={"price "+ priceRating}>{amount} {currencyCode}</div>
            <hr />
            {isOnSale ?
                <div className='sale-banner'>
                    <img height='22px' src='./assets/img/onSale.png' />
                </div>  : '' }
            <img src={book.thumbnail} alt="book cover" />
            <br />
            {book.description}
            <br />
            <div className="bottom-buttons">
                <button><Link to={`/book/${book.nextBookId}`}>Previous Book</Link></button>
                <button onClick={onBack}>Back</button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </div>
       </section>
    )
}

