import { useState } from "react";
import "@fontsource/instrument-serif/400.css";
import "./books.css";
import BookshelfCat from "../components/BookshelfCat";
import BookshelfMushroom from "../components/BookshelfMushroom";
import { FairyLights, PhotoFrame, ShelfClock, ZZPlant } from "../components/BookshelfDecor";

const reads = [
  { title: "Who Moved My Cheese?", cover: "who-moved-my-cheese.jpg", author: "Spencer Johnson", href: "https://www.penguin.co.uk/books/341689/who-moved-my-cheese-by-johnson-spencer/9780091816971" },
  { title: "The Art of Doing Things You Hate", cover: "art-of-doing-things-you-hate.jpg", author: "Peter Hollins", href: "https://www.jaicobooks.com/shop/self-help/the-art-of-doing-things-you-hate/" },
  { title: "Psycho-Cybernetics", cover: "psycho-cybernetics.jpg", author: "Maxwell Maltz", href: "https://www.penguinrandomhouse.com/books/318795/psycho-cybernetics-by-maxwell-maltz-md-fics/" },
];

function Book({ book }) {
  return <article className="shelf-book">
    <h3 className="sr-only">{book.title}</h3>
    <a className="book-link" href={book.href} target="_blank" rel="noopener noreferrer" aria-label={`${book.title} by ${book.author} — official book page (opens in a new tab)`}>
      <img src={`/books/${book.cover}`} alt={`${book.title} by ${book.author} — book cover`} />
    </a>
  </article>;
}

function Firefly({ className }) {
  return <span className={`firefly ${className}`} aria-hidden="true">
    <span className="firefly-drift">
      <span className="firefly-lantern" />
      <svg viewBox="0 0 32 36" fill="none" className="firefly-art">
        <path d="M14 9 11 5m7 4 3-4" stroke="#8c754c" strokeWidth="1" strokeLinecap="round" />
        <g className="firefly-wing firefly-wing-left"><ellipse cx="10" cy="17" rx="5" ry="9" transform="rotate(-32 10 17)" fill="#e9e3c4" fillOpacity=".75" stroke="#c9bf92" strokeWidth=".6" /><path d="m7 12 6 10" stroke="#fffdf0" strokeWidth=".7" /></g>
        <g className="firefly-wing firefly-wing-right"><ellipse cx="22" cy="17" rx="5" ry="9" transform="rotate(32 22 17)" fill="#e9e3c4" fillOpacity=".75" stroke="#c9bf92" strokeWidth=".6" /><path d="m25 12-6 10" stroke="#fffdf0" strokeWidth=".7" /></g>
        <ellipse cx="16" cy="20" rx="3.2" ry="7" fill="#827149" />
        <path d="M13 23q3-2 6 0v2a3 3 0 0 1-6 0Z" fill="#ffe79a" />
        <ellipse cx="16" cy="13" rx="3" ry="3.5" fill="#ae8850" />
        <circle cx="16" cy="9" r="2.3" fill="#64573d" />
      </svg>
    </span>
  </span>;
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
      <Firefly className="fly-one" /><Firefly className="fly-two" />
      <section className="book-row" aria-labelledby="completed-books">
        <h2 id="completed-books"><span>01</span>Completed</h2>
        <div className="shelf-scene completed-scene">
          <Book book={reads[0]} />
          <p className="reading-note">Finished in 1h 25m.<br />So happy about this one.<span>♡</span></p>
          <PhotoFrame photos={[{ file: "hazel-selfie.png", alt: "Gayathri and little Hazel wearing matching sunglasses", position: "center 65%" }, { file: "hazel-nap.png", alt: "Little Hazel napping on her favourite shelf", position: "center 22%", zoom: 2.5 }]} />
          <BookshelfCat />
        </div>
        <div className="wood-shelf" aria-hidden="true"><FairyLights /></div>
      </section>
      <section className="book-row" aria-labelledby="progress-books">
        <h2 id="progress-books"><span>02</span>In progress</h2>
        <div className="shelf-scene progress-scene">
          <Book book={reads[2]} />
          <ZZPlant />
          <PhotoFrame photos={[{ file: "hazel-desk.png", alt: "Hazel keeping company on a laptop", position: "center 65%" }]} />
          <BookshelfMushroom still={still} />
        </div>
        <div className="wood-shelf" aria-hidden="true"><FairyLights /></div>
      </section>
      <section className="book-row" aria-labelledby="future-books">
        <h2 id="future-books"><span>03</span>Want to read</h2>
        <div className="shelf-scene future-scene"><Book book={reads[1]} /><img className="snake-plant" src="/books/snake-plant.png" alt="A tiny snake plant in an ivory pot" width="1024" height="1536" /><PhotoFrame photos={[{ file: "hazel-cuddle.png", alt: "Sleepy Hazel cuddling Gayathri's arm" }]} /><ShelfClock /></div>
        <div className="wood-shelf" aria-hidden="true"><FairyLights /></div>
      </section>
    </div>
    <p className="books-signoff">Same girl, more good books.<span aria-hidden="true">♡</span></p>
  </div>;
}
