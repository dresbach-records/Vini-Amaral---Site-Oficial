import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Quote from '../components/Quote';
import Player from '../components/Player';
import Lyrics from '../components/Lyrics';
import Plataformas from '../components/Plataformas';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Stats />
      <About />
      <Quote />
      <Player />
      <Lyrics />
      <Plataformas />
      <Contact />
      <Footer />
    </main>
  );
}
