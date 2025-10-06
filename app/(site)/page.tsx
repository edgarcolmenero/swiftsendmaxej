import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Portfolio } from './sections/Portfolio';
import { Labs } from './sections/Labs';
import { Packs } from './sections/Packs';
import { Process } from './sections/Process';
import { Contact } from './sections/Contact';

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Labs />
      <Packs />
      <Process />
      <Contact />
    </>
  );
}
