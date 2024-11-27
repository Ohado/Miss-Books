const { useState, useEffect } = React

export function BookPreview({ book }) {

    useEffect(() => {
        
    }, [])

    const { id, title, description, thumbnail, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <article className="book-preview flex flex-column">
            <h3>{title}</h3>
            <div className="price">{amount} {currencyCode}</div>
            <hr />
            <img src={thumbnail} alt="book cover" />
        </article>
    )
}

