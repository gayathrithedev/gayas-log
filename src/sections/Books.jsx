import { useState } from "react";
import "@fontsource/instrument-serif/400.css";
import "./books.css";

const reads = [
  { title: "Who Moved My Cheese?", cover: "who-moved-my-cheese.jpg", author: "Spencer Johnson" },
  { title: "The Art of Doing Things You Hate", cover: "art-of-doing-things-you-hate.jpg", author: "Peter Hollins" },
  { title: "Psycho-Cybernetics", cover: "psycho-cybernetics.jpg", author: "Maxwell Maltz" },
];

function Book({ book }) {
  return <article className="shelf-book">
    <h3 className="sr-only">{book.title}</h3>
    <img src={`/books/${book.cover}`} alt={`${book.title} by ${book.author} — book cover`} />
  </article>;
}

function Firefly({ className }) {
  return <span className={`firefly ${className}`} aria-hidden="true"><span className="firefly-body" /></span>;
}

export default function Books() {
  const [still, setStill] = useState(false);
  return <div className={`books-page shell ${still ? "books-still" : ""}`}>
    <h1 className="sr-only">Books</h1>
    <button className="books-motion" onClick={() => setStill(!still)} aria-pressed={still} aria-label={still ? "Resume animations" : "Pause animations"} title={still ? "Resume animations" : "Pause animations"}>
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {still ? <path d="m7 4 9 6-9 6Z" /> : <path d="M7 4v12M13 4v12" />}
      </svg>
    </button>
    <div className="bookshelves">
      <Firefly className="fly-one" /><Firefly className="fly-two" /><Firefly className="fly-three" />
      <section className="book-row" aria-labelledby="completed-books">
        <h2 id="completed-books"><span>01</span>Completed</h2>
        <div className="shelf-scene completed-scene">
          <Book book={reads[0]} />
          <p className="reading-note">Finished in 1h 25m.<br />So happy about this one.<span>♡</span></p>
          <div className="shelf-cat"><span aria-hidden="true" className="cat-zzz">z z z</span><img src="/books/sleeping-ginger-cat.png" alt="A sleepy ginger cat curled up on the bookshelf" width="1536" height="1024" /></div>
        </div>
        <div className="wood-shelf" aria-hidden="true" />
      </section>
      <section className="book-row" aria-labelledby="progress-books">
        <h2 id="progress-books"><span>02</span>In progress</h2>
        <div className="shelf-scene progress-scene">
          <Book book={reads[2]} />
          <svg className="shelf-toy" viewBox="0 0 90 100" fill="none" aria-hidden="true"><path d="M33 43 27 87Q45 97 63 87L57 43" fill="#e9dcc0" stroke="#b7a484" strokeWidth="1.5"/><path d="M8 47C8 28 29 8 45 8S82 28 82 47C67 56 23 56 8 47Z" fill="#b96e50"/><ellipse cx="31" cy="28" rx="7" ry="5" fill="#f6e5ce"/><ellipse cx="61" cy="35" rx="6" ry="4" fill="#f6e5ce"/><ellipse cx="39" cy="45" rx="5" ry="3" fill="#f6e5ce"/><path d="M39 71v3m12-3v3m-10 6q4 4 8 0" stroke="#655344" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <div className="wood-shelf" aria-hidden="true" />
      </section>
      <section className="book-row" aria-labelledby="future-books">
        <h2 id="future-books"><span>03</span>Want to read</h2>
        <div className="shelf-scene"><Book book={reads[1]} /></div>
        <div className="wood-shelf" aria-hidden="true" />
      </section>
    </div>
    <p className="books-signoff">Same girl, more good books.<span aria-hidden="true">♡</span></p>
  </div>;
}
