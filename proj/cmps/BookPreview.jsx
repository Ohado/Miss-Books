import { LongTxt } from "./LongTxt.jsx"

const { useState, useEffect } = React

export function BookPreview({ book }) {

    const { id, title, subtitle, authors, publishedDate, description, 
        pageCount, categories, thumbnail, language, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice
    const priceRating = amount > 150 ? "expansive" 
    : amount < 20 ? "cheap" 
    : ""

    return (
        <article className="book-preview">
            <h3>{title}</h3>
            <h4>{authors}</h4>
            <div className={"price "+ priceRating}>{amount} {currencyCode}</div>
            <hr />
            {isOnSale &&
                <div className='sale-banner'>On Sale!</div> }
            <img src={thumbnail} alt="book cover" />
        </article>
    )
}

