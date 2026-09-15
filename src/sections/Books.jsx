import { useId, useState } from "react";
import "@fontsource/instrument-serif/400.css";
import "./books.css";
import BookshelfCat from "../components/BookshelfCat";
import BookshelfMushroom from "../components/BookshelfMushroom";
import { PhotoFrame, ShelfClock, ZZPlant } from "../components/BookshelfDecor";

const reads = [
  { title: "Anxious People", cover: "anxious-people.jpg", author: "Fredrik Backman", href: "https://www.simonandschuster.com/books/Anxious-People/Fredrik-Backman/9781501160844" },
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

function Butterfly({ className }) {
  const id = useId();
  return <span className={`butterfly ${className}`} aria-hidden="true">
    <span className="butterfly-drift">
      <svg viewBox="0 0 80 72" fill="none" className="butterfly-art">
        <defs>
          <linearGradient id={`${id}-wing`} x1="12" y1="8" x2="40" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7de4df" /><stop offset=".38" stopColor="#85bdf3" /><stop offset=".7" stopColor="#b491df" /><stop offset="1" stopColor="#f3b0bc" />
          </linearGradient>
          <g id={`${id}-half`}>
            <path d="M39 34C33 18 16 3 8 7C0 11 7 35 21 40C6 38 7 52 15 59C22 65 33 58 39 41Z" fill={`url(#${id}-wing)`} stroke="#655079" strokeWidth="1.5" />
            <path d="M38 35 10 12M38 36 11 24M38 38 20 36M38 41 15 49M38 42 22 57M23 22 19 12M24 29 13 30M27 47 17 43" stroke="#66517f" strokeOpacity=".55" strokeWidth=".8" />
            <path d="M11 10Q14 9 18 13M8 17l2 5M12 29l3 4M13 47l2 5M19 56l4 1M28 54l3-3" stroke="#fff0de" strokeWidth="2.3" strokeLinecap="round" />
            <ellipse cx="23" cy="46" rx="4" ry="3" transform="rotate(-30 23 46)" fill="#75609c" />
            <ellipse cx="23" cy="46" rx="2.1" ry="1.6" fill="#f9d9b8" />
          </g>
        </defs>
        <g className="butterfly-wing"><use href={`#${id}-half`} /></g>
        <g className="butterfly-wing butterfly-wing-right"><use href={`#${id}-half`} transform="translate(80 0) scale(-1 1)" /></g>
        <path d="M38 27Q31 16 29 20M42 27Q49 16 51 20" stroke="#665379" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="40" cy="38" rx="2.4" ry="13" fill="#574461" />
        <path d="M40 31v14" stroke="#dcb9c8" strokeWidth="1" />
        <circle cx="40" cy="27" r="2.7" fill="#675071" />
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
      <Butterfly className="butterfly-one" /><Butterfly className="butterfly-two" />
      <section className="book-row" aria-labelledby="completed-books">
        <h2 id="completed-books"><span>01</span>Completed</h2>
        <div className="shelf-scene completed-scene">
          <Book book={reads[1]} />
          <PhotoFrame photo={{ file: "hazel-selfie.png", alt: "Gayathri and little Hazel wearing matching sunglasses", position: "center 65%" }} />
          <BookshelfCat />
        </div>
        <div className="wood-shelf" aria-hidden="true" />
      </section>
      <section className="book-row" aria-labelledby="progress-books">
        <h2 id="progress-books"><span>02</span>Reading</h2>
        <div className="shelf-scene progress-scene">
          <Book book={reads[3]} />
          <ZZPlant />
          <PhotoFrame photo={{ file: "hazel-desk.png", alt: "Hazel keeping company on a laptop", position: "center 65%" }} />
          <PhotoFrame photo={{ file: "hazel-nap.png", alt: "Little Hazel napping on her favourite shelf", position: "center 22%", zoom: 2.5 }} />
          <BookshelfMushroom still={still} />
        </div>
        <div className="wood-shelf" aria-hidden="true" />
      </section>
      <section className="book-row" aria-labelledby="future-books">
        <h2 id="future-books"><span>03</span>Want to read</h2>
        <div className="shelf-scene future-scene"><Book book={reads[2]} /><Book book={reads[0]} /><img className="snake-plant" src="/books/snake-plant.png" alt="A tiny snake plant in an ivory pot" width="1024" height="1536" /><PhotoFrame photo={{ file: "hazel-cuddle.png", alt: "Sleepy Hazel cuddling Gayathri's arm" }} /><ShelfClock /></div>
        <div className="wood-shelf" aria-hidden="true" />
      </section>
    </div>
  </div>;
}
