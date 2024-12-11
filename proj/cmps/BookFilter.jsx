const { useState, useEffect } = React
import { categories } from "../services/book.service.js"

export function BookFilter({defaultFilter, onSetFilter}) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className="filter">
            <form onSubmit={onSubmitFilter}>
                {/* <label htmlFor="txt"></label> */}
                <div className="txt">
                    <input onChange={handleChange} type="text" name="txt" id="txt" />
                    <div>
                        <label htmlFor="fliter-by">Filter By:</label>
                        <select onChange={handleChange} name="filterTxtBy" id="filterTxtBy">
                            <option value="title">Book Title</option>
                            <option value="author">Author</option>
                            <option value="publishedDate">Year Published</option>
                            <option value="free">Free Search</option>
                        </select>
                    </div>
                </div>
                <label htmlFor="category">Category:</label>
                    <select onChange={handleChange} name="category" id="category">
                        <option value=''></option>
                        {categories.map(cat => (<option key={cat.toLowerCase()} value={cat.toLowerCase()}>{cat}</option>))}
                    </select>
                <div className="checkbox">
                    <input onChange={handleChange} type="checkbox" name="on-sale" id="on-sale"  />
                    <label htmlFor="on-sale">On Sale</label>
                </div>
                <label htmlFor="maxPrice">Price up to: {filterByToEdit.maxPrice}</label>
                <input onChange={handleChange} type="range" value={filterByToEdit.maxPrice} min={0} max={200} name="maxPrice" id="maxPrice" />
                <button>Filter</button>
            </form>
        </section>
    )
}

 /*   {
    "id": "0j1k2l3m4n5o",
    "title": "The Rise of the Russian Empire",
    "subtitle": "A Historical Fiction Masterpiece",
    "authors": [
      "Dmitry Ivanov",
      "Elena Petrova"
    ],
    "publishedDate": 2018,
    "description": "'The Rise of the Russian Empire' reimagines Russia's ascension as a global superpower. This sweeping historical fiction blends political intrigue, military strategy, and unforgettable characters, painting a vivid picture of power struggles and the resilience of those who shape history. It’s a riveting tale that will captivate lovers of history and storytelling alike.",
    "pageCount": 670,
    "categories": [
      "Historical Fiction",
      "Politics"
    ],
    "thumbnail": "assets/img/booksimages/10.jpg",
    "language": "ru",
    "listPrice": {
      "amount": 900.00,
      "currencyCode": "RUB",
      "isOnSale": false
    }
  }*/