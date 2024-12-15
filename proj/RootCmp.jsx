
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"

const { Routes, Route, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/book" />}></Route>
                        <Route path="/home" element={<HomePage />}></Route>
                        <Route path="/about" element={<AboutUs />}></Route>
                        <Route path="/book" element={<BookIndex />}></Route>
                        <Route path="/book/:bookId" element={<BookDetails />}></Route>
                        <Route path="/book/edit" element={<BookEdit />}></Route>
                        <Route path="/book/edit/:bookId" element={<BookEdit />}></Route>
                        <Route path="/book/add" element={<BookAdd />}></Route>
                    </Routes>
                    <UserMsg/>
                </main>
            </section>
        </Router>
    )
}