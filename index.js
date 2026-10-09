function createP(className, textContent) {
  const p = document.createElement("p");
  p.className = className;
  p.textContent = textContent;
  return p;
}

function createBookCard({ id, title, author, year, genre, description }) {
  const article = document.createElement("article");
  article.id = id;
  article.className = "book-card";
  const genreP = createP("genre", genre);
  const bookNameP = document.createElement("h2");
  bookNameP.textContent = title;
  const authorP = createP("author", author);
  const descriptionP = createP("description", description);
  const yearP = createP("year", year);
  article.appendChild(genreP);
  article.appendChild(bookNameP);
  article.appendChild(authorP);
  article.appendChild(descriptionP);
  article.appendChild(yearP);
  return article;
}

const section = document.getElementById("book-section");

async function start() {
  const response = await fetch("http://localhost:3000/api/books");
  const { books } = await response.json();
  books.forEach(function (book) {
    const bookCard = createBookCard(book);
    section.appendChild(bookCard);
  });
}
start();
