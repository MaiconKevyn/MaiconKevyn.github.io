import { lazy, Suspense, useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';

const FluidBackground = lazy(() => import('./components/FluidBackground'));
const NeuralNetworkEasterEgg = lazy(() => import('./components/NeuralNetworkEasterEgg'));

const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 min-h-screen text-white">
      <SpeedInsights />
      <ScrollProgress />
      <Suspense fallback={null}>
        <FluidBackground />
      </Suspense>
      <Navigation />
      <Hero />

      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Chatbot />
      </Suspense>
      <Suspense fallback={null}>
        <NeuralNetworkEasterEgg />
      </Suspense>
    </div>
  );
}

export default App;
