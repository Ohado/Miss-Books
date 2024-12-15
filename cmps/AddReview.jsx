import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function AddReview({ book, onSubmit }) {

    const [ review, setReview ] = useState({fullname: '', rating: 0, content: ''})
    // const { bookId } = useParams()

    function onSaveReview(ev) {
        ev.preventDefault()

        review.id = utilService.makeId()
        review.readAt = new Date().toDateString().split(' ').slice(1).join(' ');
        review.rating = parseInt(review.rating)
        book.reviews.push(review)

        bookService.save(book)
        .then(() => {
            showSuccessMsg("Review saved!")
            setReview({fullname: '', content: ''})
            onSubmit()})
        .catch(err => {
            showErrorMsg("Failed to add review");
            console.log("Failed to add review - " + err)
        })
    }

    function handleChange({ target }){
        let {value, name: field} = target
        setReview((prevReview) => ({...prevReview, [field]:value}))
    }

    return (
        <section className="add-review">
            <form onSubmit={onSaveReview} >
                <label htmlFor="fullname" className='name title'>Reviewer Name:</label>
                <input value={review.fullname} onChange={handleChange} type="text" name="fullname" id="fullname" required  className='name input' />
                <label htmlFor="rating" className='rating title'>Rating:</label>
                <select value={review.rating} onChange={handleChange} name="rating" id="rating" required  className='rating input'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="content" className='content title'>Your Review:</label>
                <textarea value={review.content} onChange={handleChange} name="content" id="content" className='content input' />
                <button>Add Review</button>

            </form>
        </section>
    )
}

