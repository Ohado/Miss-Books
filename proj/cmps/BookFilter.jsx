const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function BookFilter({defaultFilter, onSetFilter}) {

    const [filter, setFilter] = useState(defaultFilter)

    useEffect(() => {
        
    }, [filter])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilter((prevFilter) => ({...prevFilter, [field]: value}))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filter)
    }

    return (
        <section className="filter">
            <form onSubmit={onSubmitFilter}>
                {/* <label htmlFor="txt"></label> */}
                <input onChange={handleChange} value={filter.txt} type="text" name="txt" id="txt" />
                <label htmlFor="maxPrice">Price up to: {filter.maxPrice}</label>
                <input onChange={handleChange} type="range" value={filter.maxPrice} min={0} max={200} name="maxPrice" id="maxPrice" />
                <button>Filter</button>
            </form>
        </section>
    )
}

 