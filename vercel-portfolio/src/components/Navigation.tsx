import { useState, useEffect } from 'react';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'STACK', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(() => !document.documentElement.classList.contains('light'));

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['home', 'experience', 'projects', 'skills', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };



  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(6,182,212,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="font-bold text-white tracking-widest"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem' }}
          >
            MAICONKEVYN<span style={{ color: '#06b6d4' }}>.AI</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative h-full text-xs tracking-widest transition-all duration-300 group flex items-center ${
                    isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                  }`}
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {item.label}
                  {/* Active Underline */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 transition-all duration-300 transform ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Right side: theme + download */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="text-gray-400 hover:text-cyan-500 transition-colors text-lg"
              title="Toggle theme"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? '☀' : '🌙'}
            </button>
            <a
              href="https://github.com/MaiconKevyn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded transition-all hover:bg-cyan-500 hover:text-black cursor-pointer"
              style={{
                background: 'rgba(6,182,212,0.1)',
                border: '1px solid rgba(6,182,212,0.5)',
                color: '#22d3ee',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.05em',
              }}
            >
              GITHUB
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 space-y-3"
          style={{ background: 'rgba(5,5,5,0.97)', borderTop: '1px solid rgba(6,182,212,0.2)' }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href + item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`block w-full text-left py-2 transition-colors text-xs tracking-widest ${
                  isActive ? 'text-cyan-400 font-bold border-l-2 border-cyan-400 pl-2' : 'text-gray-300 hover:text-cyan-400'
                }`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="https://github.com/MaiconKevyn"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center py-2 text-xs font-bold rounded hover:bg-cyan-500 hover:text-black transition-colors"
            style={{
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.5)',
              color: '#22d3ee',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            GITHUB
          </a>
        </div>
      )}
    </nav>
  );
}
