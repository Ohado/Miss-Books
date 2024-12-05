const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

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
                <input onChange={handleChange} value={filterByToEdit.txt} type="text" name="txt" id="txt" />
                <label htmlFor="maxPrice">Price up to: {filterByToEdit.maxPrice}</label>
                <input onChange={handleChange} type="range" value={filterByToEdit.maxPrice} min={0} max={200} name="maxPrice" id="maxPrice" />
                <button>Filter</button>
            </form>
        </section>
    )
}

 