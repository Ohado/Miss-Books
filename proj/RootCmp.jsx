
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

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
                        {/* <Route path="/book/:bookId" element={<BookDetails />}></Route> */}
                        {/* <Route path="/book/edit" element={<BookEdit />}></Route> */}
                    </Routes>
                </main>
            </section>
        </Router>
    )
}