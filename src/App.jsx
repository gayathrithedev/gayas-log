import Nav from "./components/Nav";
import FloatingIcons from "./components/FloatingIcons";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Writing from "./sections/Writing";
import Life from "./sections/Life";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="grain min-h-screen">
      <FloatingIcons />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Writing />
        <Life />
      </main>
      <Footer />
    </div>
  );
}
