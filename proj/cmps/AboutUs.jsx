const { useState, useEffect } = React

export function AboutUs() {
    return (
        <section className="home">
            <h1 className="title">Miss Books</h1>
            <p>
                At Miss Books, we're passionate about books and the joy of reading. 
                Our mission is to help you organize, manage, and discover your favorite reads with ease.
                Whether you're an avid bookworm or just starting your reading journey, we provide the tools to keep track of your collection, set reading goals, and explore new titles.
            </p>
            <p>
                Founded by a team of book lovers, Miss Books combines technology with a love for literature to offer a seamless experience. Our goal is to create a personal space where you can manage your book library, discover new genres, and share your literary adventures with others.
            </p>
            <p>
                Join us and make your reading journey unforgettable—one book at a time.
            </p>
            <img src="./assets/img/team-img.webp" alt="The Team sits together" title="the Miss Books Team (for real!)" />
       </section>
    )
}

