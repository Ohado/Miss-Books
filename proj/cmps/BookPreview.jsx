import { LongTxt } from "./LongTxt.jsx"

const { useState, useEffect } = React

export function BookPreview({ book }) {

    useEffect(() => {
        
    }, [])

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
            <img src={thumbnail} alt="book cover" />
            {subtitle ? <LongTxt txt={subtitle} length={20} > {subtitle} </LongTxt> : ''}
        </article>
    )
}

