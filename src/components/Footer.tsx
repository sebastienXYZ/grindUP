import { Instagram, Linkedin } from 'lucide-react';
import { Link } from './Link';

const links = {
  Légal: ['Mentions légales', 'Politique de confidentialité', 'Cookies'],
};

export function Footer() {
  return (
    <footer className="bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 block">
              <img
                src="/assets/images/logo-grindup.png"
                alt="Grindup Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Transformez votre présence digitale avec notre expertise en
              marketing gaming et lifestyle.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Grindup!. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}