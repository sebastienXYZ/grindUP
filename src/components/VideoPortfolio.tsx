import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from './Link';
import { VideoPlayer } from './VideoPlayer';

export function VideoPortfolio() {
  const videos = [
    {
      src: '/assets/videos/tiktok-montage.mp4',
      poster: '/assets/videos/tiktok-montage-poster.jpg',
      title: 'Montage TikTok',
      views: '1.2M'
    },
    {
      src: '/assets/videos/youtube-short.mp4',
      poster: '/assets/videos/youtube-short-poster.jpg',
      title: 'Short Format',
      views: '850K'
    },
    {
      src: '/assets/videos/youtube-long.mp4',
      poster: '/assets/videos/youtube-long-poster.jpg',
      title: 'Long Format',
      views: '2.1M'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nos Réalisations
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez nos dernières créations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {videos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <VideoPlayer {...video} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all group"
          >
            Voir plus de réalisations
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}