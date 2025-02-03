import { AnimatePresence, motion } from 'framer-motion';
import { Link } from './Link';
import { ArrowRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        when: "beforeChildren",
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  const menuItems = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/video-editing", label: "Montage Vidéo" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-gray-900/95 backdrop-blur-md z-[101] shadow-2xl"
          >
            {/* Orbes lumineux en arrière-plan */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-32 -right-32 w-64 h-64 bg-primary/30 rounded-full mix-blend-screen filter blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/30 rounded-full mix-blend-screen filter blur-3xl"
              />
            </div>

            <div className="h-full flex flex-col relative z-10">
              <div className="flex-1 py-12 px-6">
                <nav className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      custom={index}
                      className="border-b border-gray-800"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-primary transition-colors group"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
              
              <motion.div
                variants={itemVariants}
                className="p-6 border-t border-gray-800 bg-gradient-to-b from-transparent to-gray-900/50"
              >
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block w-full py-3 px-6 bg-gradient-to-r from-primary via-secondary to-accent text-white font-medium rounded-lg text-center hover:opacity-90 transition-opacity relative overflow-hidden group"
                >
                  <span className="relative z-10">Contactez-nous</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ mixBlendMode: 'overlay' }}
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}