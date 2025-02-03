import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { Influencer } from './components/Influencer';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { VideoEditingSection } from './components/VideoEditingSection';
import ServicesPage from './pages/Services';
import Contact from './pages/Contact';
import VideoEditing from './pages/VideoEditing';
import Auth from './pages/Auth';
import QuoteSuccess from './pages/QuoteSuccess';
import Admin from './pages/Admin';
import OrderTracking from './pages/OrderTracking';
import Portfolio from './pages/Portfolio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/video-editing" element={<VideoEditing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quote-success" element={<QuoteSuccess />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
          <Route path="/" element={
            <main>
              <Hero />
              <Process />
              <Services />
              <VideoEditingSection />
              <Influencer />
              <Testimonials />
              <FAQ />
            </main>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}