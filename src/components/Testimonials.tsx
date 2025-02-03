import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Streameuse Twitch',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    content: 'Grâce à leur expertise, ma communauté Twitch a doublé en 3 mois. Leur approche du gaming est vraiment unique !',
    rating: 5
  },
  {
    name: 'Thomas Dubois',
    role: 'Créateur TikTok',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150',
    content: "Leur stratégie m'a permis d'atteindre 1M d'abonnés en moins de 6 mois. Une expertise exceptionnelle !",
    rating: 5
  },
  {
    name: 'Marie Lambert',
    role: 'Marque Lifestyle',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150',
    content: 'Leur compréhension du lifestyle et leur créativité ont transformé notre présence sur Instagram.',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Parallax Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl animate-parallax" 
             style={{ transform: 'translateY(var(--parallax-y))' }} />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-parallax-delayed"
             style={{ transform: 'translateY(var(--parallax-y))' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Ils Nous Font Confiance
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all group"
              style={{ 
                transform: 'translateY(var(--card-y))',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-accent">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-gray-300 italic">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}