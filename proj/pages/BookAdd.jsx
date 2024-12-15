import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const books = [
    {id: 643, title: "48 Laws of Power"},
    {id: 654, title: 'Be Here Now '},
    {id: 985, title: 'Extreme Ownership '},
    {id: 834, title: 'How to Eat '},
    {id: 934, title: 'How to Win Friends & Influence People '},
    {id: 568, title: 'Radical Focus '}
]

function onAddBook(book) {
    bookService.addGoogleBook(book)
    .then(() => {showSuccessMsg("Book added successfully")})
    .catch((err) => {
        console.log(err);
        if (err.message == 'Book already exists'){
            showErrorMsg('Book already exists')
            console.log('Book already exists')
        }
        else {
            throw err
        }
    })
    
}

export function BookAdd() {

    return (
        <section className="book-add flex flex-column centered">
            <h1>Find and Add New Books</h1>
            <ul>
                {books.map( book => 
                    <div key={book.id} className="book-preview">
                        <li className="box">{book.title}</li>
                        <button onClick={() => onAddBook(book)}>+</button>
                    </div>
                 )}
            </ul>
        </section>
    )
}