const { useState, useEffect, useReducer } = React

export function ReviewList({ reviews }) {

    return (
        <ul className="review-list">
            {reviews.map((review) => 
                <li className="box" key={review.id}>
                    <h3>{review.fullname}</h3>
                    {review.readAt}
                    <h4>Rating: {'⭐'.repeat(review.rating)}</h4>
                    <hr />
                    <p>{review.content}</p>
                </li>
            )}
        </ul>
    )
}

