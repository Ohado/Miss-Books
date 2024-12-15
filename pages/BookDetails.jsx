const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { LongTxt } from "../cmps/LongTxt.jsx"
import { CollapsedEl } from "../cmps/CollapsedEl.jsx"

import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"

const languageNames = {en: "English", he: "Hebrew", fr: "French", es: "Spanish", ru: "Russian"}

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        console.log('load')
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
            <h2>{title}</h2>
            <h3>{authors}</h3>
            <div className={"price "+ priceRating}>{amount} {currencyCode}</div>
            <hr />
            <div className="main-content">
                <div className="data">
                    <p className="centered"><b>Categories</b>: {categories.join(', ')}</p>
                    <p className="centered">published {publishedDate}, {pageCount} pages, {languageNames[language] || language}</p>
                    <br/><br/>
                    <p className="subtitle">{subtitle}</p>
                    <br/>
                    <p className="description"><LongTxt txt={description} /></p>
                </div>
                <div className="img">
                    {isOnSale &&
                        <div className='sale-banner'>On Sale!</div> }
                    <img src={thumbnail} alt="book cover" />
                </div>
            </div>
            <br />
            <CollapsedEl className="add-review-container" colHeader={"Add Review"} 
                ExtState={<AddReview book={book} onSubmit={loadBook}/>}/>
            <ReviewList reviews={book.reviews} />
            
            <div className="bottom-buttons">
                <button><Link to={`/book/${book.prevBookId}`}>Previous Book</Link></button>
                <button onClick={onBack}>Back</button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </div>
       </section>
    )
}

