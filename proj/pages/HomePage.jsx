const { useState, useEffect } = React

export function HomePage() {
    return (
        <section className="home">
            <h1 className="title">Miss Books</h1>
            <h2 className="title">Your personal book manager</h2>
            <br />
            <p>
            Welcome to Miss Books: Your Personal Book Manager!
            </p>
            <p className="fa">
            Easily track, organize, and discover your next great read. With Miss Books, managing your book collection has never been simpler or more fun. Start exploring today!
            </p>
       </section>
    )
}

