import { motion } from 'framer-motion';
import { VideoPlayer } from '../components/VideoPlayer';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { useState } from 'react';

const categories = ['Tous', 'TikTok', 'YouTube', 'Instagram', 'Gaming', 'Lifestyle'];

const videos = [
  {
    src: '/assets/videos/tiktok-montage.mp4',
    poster: '/assets/videos/tiktok-montage-poster.jpg',
    title: 'Montage TikTok',
    views: '1.2M',
    category: 'TikTok'
  },
  {
    src: '/assets/videos/youtube-short.mp4',
    poster: '/assets/videos/youtube-short-poster.jpg',
    title: 'Short Format',
    views: '850K',
    category: 'YouTube'
  },
  {
    src: '/assets/videos/youtube-long.mp4',
    poster: '/assets/videos/youtube-long-poster.jpg',
    title: 'Long Format',
    views: '2.1M',
    category: 'YouTube'
  },
  {
    src: '/assets/videos/gaming-montage.mp4',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=600',
    title: 'Gaming Highlights',
    views: '3.4M',
    category: 'Gaming'
  },
  {
    src: '/assets/videos/lifestyle-vlog.mp4',
    poster: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&q=80&w=800&h=600',
    title: 'Lifestyle Vlog',
    views: '920K',
    category: 'Lifestyle'
  },
  {
    src: '/assets/videos/instagram-reel.mp4',
    poster: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800&h=600',
    title: 'Instagram Reel',
    views: '1.5M',
    category: 'Instagram'
  }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'Tous' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
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
                transform: `translate(-50%, -50%)`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="block text-white">Nos</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Réalisations
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Découvrez nos meilleures créations et laissez-vous inspirer
          </motion.p>
        </div>
      </section>

      {/* Filtres et Recherche */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>
          </div>

          {/* Grille de vidéos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <VideoPlayer {...video} />
              </motion.div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Aucune vidéo trouvée</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Prêt à créer votre vidéo ?
            </span>
          </h2>
          
          <a
            href="/video-editing#order"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all group"
          >
            Commander maintenant
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}