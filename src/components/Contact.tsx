import { Mail, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Prêt à transformer votre présence digitale ? Parlons de votre projet
            !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                <span>Envoyer le message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#25F4EE] mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Email
                  </h3>
                  <p className="text-gray-300">contact@grindup.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#25F4EE] mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Téléphone
                  </h3>
                  <p className="text-gray-300">+33 1 27 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
