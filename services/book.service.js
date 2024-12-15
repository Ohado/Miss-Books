import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
// import { books } from '../../books.js'
import { books as jsonBooks, reviews as dummyReviews } from '../../books_data_generic.js'

const MAX_PRICE = 200
const BOOK_KEY = 'bookDB'
const smapleBooks = [
    {},
    {title: "Gwent", description: "A thrilling dive into the world of competitive card games, where strategy, deception, and luck collide in the high-stakes tournaments of a post-apocalyptic future."},
    {title: "Between Here and Gone", description: "A soul-searching journey that follows a young woman as she navigates the complexities of life, love, and loss, while trying to find her way back to the life she left behind."},
    {title: "Magic Lantern", description: "A historical mystery about an antique projector that reveals forgotten memories, unlocking secrets from the past that change the course of a family’s future."},
    {title: "It’s Just a Dog", description: "A heartwarming yet humorous story of a misfit dog who teaches an entire town the true meaning of unconditional love and friendship."},
    {title: "Unbored", description: "The ultimate guide for people stuck in a rut, offering creative and unconventional ways to break free from the mundane and rediscover passion in everyday life."},
    {title: "Book Title", description: "A satirical, tongue-in-cheek exploration of the absurdity of the publishing industry and the strange world of bestselling authors."},
    {title: "Sith Empire Will Rise Again", description: "In this epic sci-fi saga, an ancient Sith Empire resurfaces, threatening the galaxy with its dark forces, and only a group of unlikely heroes can prevent its return to power."},
    {title: "The Ode Less Travelled", description: "A poetic journey through life's unexpected twists, this book challenges the norms of conventional wisdom with verses that explore the beauty of forging your own path."},
    {title: "The Unsung Hero", description: "The story of a quiet, overlooked figure whose small acts of kindness and courage ultimately save a community from destruction in a time of crisis."},
    {title: "The Rise of the Russian Empire", description: "A detailed historical fiction that reimagines the rise of Russia as a global superpower, blending political intrigue, military strategy, and powerful historical figures."},
    {title: "Holes", description: "A darkly comic novel about a small town built on a network of hidden tunnels, where secrets and lies are buried, and one man’s quest for truth unearths dangerous revelations."},
    {title: "Schisms", description: "In a divided society, this dystopian tale follows a young woman torn between two opposing ideologies, struggling to choose the path that will define her future in a fractured world."},
    {title: "The Face in the Abyss", description: "A gripping psychological thriller where a detective is forced to confront his deepest fears when a series of mysterious disappearances lead him to an eerie, abandoned town."},
    {title: "You Can’t Be an Astronaut", description: "A quirky, inspirational memoir from a woman who dreamed of space exploration but found her true adventure in the small, everyday challenges of life on Earth."},
    {title: "Old Tractors", description: "A nostalgic, heartfelt exploration of rural life, told through the lens of a farmer who restores old tractors and uncovers the hidden stories of generations past."},
    {title: "Beat Your Way to the Top", description: "A motivational guide for aspiring entrepreneurs and creatives, offering unconventional methods and bold strategies to overcome obstacles and achieve success."},
    {title: "Don’t Panic", description: "A humorous survival guide that provides practical advice for navigating life’s unexpected twists, with a focus on staying calm and resilient in the face of chaos."},
    {title: "How to Defend Yourself Against Alien Abduction", description: "A tongue-in-cheek survival manual that combines humor and science fiction, offering readers tips on how to avoid being taken by extraterrestrials—just in case."},
    {title: "How to Start Your Own Country", description: "A tongue-in-cheek, yet informative guide to the steps and challenges involved in founding your own nation, from crafting a constitution to negotiating with world powers."},
    {title: "Akarnae", description: "In this captivating fantasy novel, a young girl discovers she is the heir to a forgotten kingdom, but to claim her throne, she must first navigate deadly trials and face powerful enemies."}
]

export const categories = [
    "Fiction",
    "Satire",
    "Science Fiction",
    "Adventure",
    "Poetry",
    "Philosophy",
    "Inspirational",
    "Historical Fiction",
    "Politics",
    "Self-Help",
    "Creativity"
]

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addReview,
    addGoogleBook,
}


// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                let filterTxtBy = filterBy.filterTxtBy || 'title'
                if (filterTxtBy == "author"){                    
                    books = books.filter(book => regExp.test(book.authors.join()));
                }
                else{
                    books = books.filter(book => regExp.test(book[filterTxtBy]))
                }
            }
            
            if(filterBy.category) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.categories.join()));
            }

            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', authors=[], description = '', publishedDate=0, pageCount=0,thumbnail='', price = 0, currencyCode='', isOnSale=false, reviews=[], categories=[]) {
    return { title, authors, description, publishedDate, pageCount, thumbnail, listPrice: {amount:price, currencyCode, isOnSale}, reviews: dummyReviews, categories }
}

function getDefaultFilter(filterBy = { txt: '', maxPrice: MAX_PRICE }) {
    return { txt: filterBy.txt, maxPrice: filterBy.maxPrice }
}

function addReview(bookId, review) {
    const book = get(bookId);
    review.id = utilService.makeId()
    book.reviews.push(review)
}

function addGoogleBook(item) {
    return query({ txt: item.title })
    .then(filtered => {
        console.log(filtered);
        if (filtered.length > 0) {
            throw new Error('Book already exists')
        }
        const newBook = getEmptyBook(item.title)
        return save(newBook)
    })
}

function _setNextPrevBookId(book) {    
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = jsonBooks
    //     books = []
    //     for (let i = 0; i < 3; i++) {
    //         let idx = utilService.getRandomIntInclusive(1, smapleBooks.length - 1)
    //         const bookDesc = smapleBooks[idx]
    //         books.push(_createBook(bookDesc.title, bookDesc.description, "./assets/img/booksImages/"+idx+".jpg", utilService.getRandomIntInclusive(5, MAX_PRICE)))
    //     }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, description="No description for this book", thumbnail="", price = 250, currency="ILS", isOnSale=false) {
    const book = getEmptyBook(title, description, thumbnail, price, currency, isOnSale)
    book.id = utilService.makeId()
    return book
}
