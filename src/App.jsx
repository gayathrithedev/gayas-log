import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import Writing from "./sections/Writing";
import Life from "./sections/Life";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="grain min-h-screen">
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Writing />
        <Life />
      </main>
      <Footer />
    </div>
  );
}
