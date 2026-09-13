import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Writing from "./sections/Writing";
import Life from "./sections/Life";
import Footer from "./sections/Footer";

export default function App() {
  const networking = window.location.pathname === "/networking.html";
  return (
    <div className="grain min-h-screen">
      <Nav networking={networking} />
      <main id="main">
        {networking ? <Life /> : <>
        <Hero />
        <About />
        <Writing />
        </>}
      </main>
      <Footer />
    </div>
  );
}
