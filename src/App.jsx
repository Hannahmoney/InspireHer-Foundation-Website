import React, { useState } from 'react';
import './App.css';

// Stat Card Component
const StatCard = ({ number, label }) => (
  <div className="stat-card">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

// Program Card Component
const ProgramCard = ({ icon, title, description }) => (
  <div className="program-card">
    <div className="program-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Gallery Modal Component
const GalleryModal = ({ image, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <img src={image} alt="Gallery" />
    </div>
  </div>
);

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>InspireHer</h1>
          </div>
          <nav className="nav">
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('programs')}>Programs</button>
            <button onClick={() => scrollToSection('impact')}>Impact</button>
            <button onClick={() => scrollToSection('partners')}>Partners</button>
            <button onClick={() => scrollToSection('gallery')}>Gallery</button>
            <button onClick={() => scrollToSection('get-involved')}>Get Involved</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h2>Empowering Girls to Lead Today</h2>
          <p className="hero-subtitle">
            Building confidence, creating opportunities, and inspiring the next generation of changemakers.
          </p>
          <div className="hero-buttons">
            <a href="https://forms.google.com/forms/placeholder-mentor" className="btn btn-primary">
              Become a Mentor
            </a>
            <a href="https://forms.google.com/forms/placeholder-mentee" className="btn btn-secondary">
              Become a Mentee
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/gallery/hero.jpg" alt="Girls empowerment" />
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>About InspireHer</h2>
          <p>
            InspireHer Empowerment Initiative is dedicated to empowering girls through mentorship, education, and community support. We believe every girl deserves the opportunity to reach her full potential and become a leader in her community.
          </p>
          <p>
            Our holistic approach combines mentorship, skill-building workshops, and scholarship opportunities to create lasting change in the lives of girls and their families.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs" id="programs">
        <div className="container">
          <h2>Our Programs</h2>
          <div className="programs-grid">
            <ProgramCard
              icon="👥"
              title="Mentorship Program"
              description="Connect with experienced mentors who provide guidance, support, and inspiration to help you navigate your journey."
            />
            <ProgramCard
              icon="🌍"
              title="Community Outreach"
              description="Engaging workshops and awareness campaigns that reach girls in underserved communities across multiple regions."
            />
            <ProgramCard
              icon="🎓"
              title="Scholarship Fund"
              description="Financial support for deserving girls to pursue higher education and achieve their academic dreams."
            />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact" id="impact">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <StatCard number="5,000+" label="Girls Reached" />
            <StatCard number="800+" label="Active Mentors" />
            <StatCard number="45+" label="Communities" />
            <StatCard number="250+" label="Workshops Conducted" />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners" id="partners">
        <div className="container">
          <h2>Our Partners</h2>
          <div className="partners-grid">
            <div className="partner-logo">
              <img src="/partners/logo1.png" alt="Partner 1" />
            </div>
            <div className="partner-logo">
              <img src="/partners/logo2.png" alt="Partner 2" />
            </div>
            <div className="partner-logo">
              <img src="/partners/logo3.png" alt="Partner 3" />
            </div>
            <div className="partner-logo">
              <img src="/partners/logo4.png" alt="Partner 4" />
            </div>
            <div className="partner-logo">
              <img src="/partners/logo5.png" alt="Partner 5" />
            </div>
            <div className="partner-logo">
              <img src="/partners/logo6.png" alt="Partner 6" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <div className="container">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="gallery-item"
                onClick={() => setSelectedImage(`/gallery/outreach${num}.jpg`)}
              >
                <img src={`/gallery/outreach${num}.jpg`} alt={`Gallery ${num}`} />
                <div className="gallery-overlay">
                  <span>View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="get-involved" id="get-involved">
        <div className="container">
          <h2>Get Involved</h2>
          <div className="involved-cards">
            <div className="involved-card">
              <h3>Become a Mentor</h3>
              <p>
                Share your expertise and experience. Guide a girl through her personal and professional journey and make a real difference in her life.
              </p>
              <a href="https://forms.google.com/forms/placeholder-mentor" className="btn btn-primary">
                Apply as Mentor
              </a>
            </div>
            <div className="involved-card">
              <h3>Become a Mentee</h3>
              <p>
                Are you a girl looking for guidance and support? Join our community and gain access to mentorship, resources, and opportunities.
              </p>
              <a href="https://forms.google.com/forms/placeholder-mentee" className="btn btn-secondary">
                Apply as Mentee
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>hello@inspireher.org</p>
              <a href="mailto:hello@inspireher.org" className="btn btn-primary">
                Send Email
              </a>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <a href="tel:+15551234567" className="btn btn-primary">
                Call Us
              </a>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>123 Empowerment Street<br />City, State 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>InspireHer</h4>
              <p>Empowering girls to lead tomorrow.</p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://facebook.com" aria-label="Facebook">f</a>
                <a href="https://twitter.com" aria-label="Twitter">𝕏</a>
                <a href="https://instagram.com" aria-label="Instagram">📷</a>
                <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 InspireHer Empowerment Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Gallery Modal */}
      {selectedImage && <GalleryModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}