import { Gamepad2, TrendingUp } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Link } from './Link';

const services = [
  {
    icon: Gamepad2,
    title: 'Stratégie Gaming',
    description: 'Dominez la scène gaming avec des stratégies marketing sur mesure pour streamers et marques.',
    features: ['Optimisation des streams', 'Engagement communautaire', 'Monétisation']
  },
  {
    icon: TrendingUp,
    title: 'Croissance Social Media',
    description: 'Boostez votre présence sur TikTok, Instagram et Twitch avec des approches basées sur les données.',
    features: ['Stratégie de contenu', 'Analyse de performance', 'Growth hacking']
  }
];

function Card3D({ service, index }: { service: typeof services[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Variables pour le tracking de la souris
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs pour des animations plus fluides
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = (mouseX / width - 0.5);
    const yPct = (mouseY / height - 0.5);

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full perspective-1000"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered 
            ? "0 20px 40px rgba(147, 51, 234, 0.3)" 
            : "0 0 0 rgba(147, 51, 234, 0)"
        }}
        transition={{ duration: 0.3 }}
        className="p-8 rounded-xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-primary/20 h-full transform-gpu"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Effet de brillance en arrière-plan */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
          style={{
            transform: "translateZ(-10px)",
            filter: "blur(20px)"
          }}
        />

        {/* Icône avec effet 3D */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          animate={{
            rotateZ: isHovered ? [0, -10, 10, 0] : 0
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <service.icon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div 
            className="absolute inset-0 bg-primary/30 rounded-full filter blur-xl"
            style={{ transform: "translateZ(-20px)" }}
          />
        </motion.div>

        {/* Contenu avec effet 3D */}
        <motion.div style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
          <p className="text-gray-300 mb-6">{service.description}</p>
          
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-center text-gray-300"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mr-3" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Effet de profondeur sur le bouton */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50" />
          <button className="relative w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
            En savoir plus
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" id="services">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nos <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Des solutions sur mesure pour votre succès digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card3D key={service.title} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 group"
          >
            Découvrir tous nos services
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}