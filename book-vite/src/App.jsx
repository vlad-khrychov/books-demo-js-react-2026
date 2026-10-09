import { useState } from "react";

import "./App.css";
import { useEffect } from "react";

function Paragraph({ paragraphClassName, textContent }) {
  return <p className={paragraphClassName}>{textContent}</p>;
}

function Book({ id, title, author, year, genre, description }) {
  return (
    <article id={id} className="book-card">
      <Paragraph paragraphClassName="genre" textContent={genre} />
      <h2>{title}</h2>
      <Paragraph paragraphClassName="author" textContent={author} />
      <Paragraph paragraphClassName="description" textContent={description} />
      <Paragraph paragraphClassName="year" textContent={year} />
    </article>
  );
}

function useBooks() {
  const [books, setBooks] = useState([]);

  useEffect(function () {
    (async function () {
      const response = await fetch("http://localhost:3000/api/books");
      const { books } = await response.json();
      setBooks(books);
    })();
  }, []);
  return books;
}

function BookList() {
  const books = useBooks();

  return (
    <>
      {books.map(function ({ id, title, author, year, genre, description }) {
        return (
          <Book
            key={id}
            id={id}
            title={title}
            author={author}
            year={year}
            genre={genre}
            description={description}
          />
        );
      })}
    </>
  );
}

function App() {
  return <BookList />;
}

export default App;
