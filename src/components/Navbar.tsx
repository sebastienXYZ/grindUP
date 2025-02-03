import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from './Link';
import { MobileMenu } from './MobileMenu';
import { UserMenu } from './UserMenu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/assets/images/logo-grindup.png"
                alt="Grindup"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm hover:text-accent transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/services"
              className="text-sm hover:text-accent transition-colors"
            >
              Services
            </Link>
            <Link
              href="/video-editing"
              className="text-sm hover:text-accent transition-colors"
            >
              Montage Vidéo
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-accent transition-colors"
            >
              Contact
            </Link>
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <UserMenu />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-accent focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              </span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
}