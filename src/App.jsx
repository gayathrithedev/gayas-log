import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Books from "./sections/Books";
import Life from "./sections/Life";
import Footer from "./sections/Footer";

export default function App() {
  const networking = window.location.pathname === "/networking.html";
  const books = window.location.pathname === "/books.html";
  return (
    <div className="grain min-h-screen">
      <Nav networking={networking} books={books} />
      <main id="main">
        {books ? <Books /> : networking ? <Life /> : <>
        <Hero />
        <About />
        </>}
      </main>
      {!books && <Footer />}
    </div>
  );
}
