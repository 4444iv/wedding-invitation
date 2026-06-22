import { Link } from 'react-router-dom'
import { Heart, Sparkles } from 'lucide-react'

function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fffbeb, #ffffff, #fff1f2)' }}>
      <nav style={{ borderBottom: '1px solid rgba(217, 119, 6, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
          <Link to="/" style={{ fontFamily: '"Dancing Script", cursive', fontSize: '28px', color: '#c9a355', fontWeight: 600 }}>
            Zareqia
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(201, 163, 85, 0.1)', marginBottom: '16px' }}>
            <Heart style={{ width: '32px', height: '32px', color: '#c9a355' }} />
          </div>
          
          <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
            Beautiful Digital Wedding Invitations
          </h1>
          
          <p style={{ fontSize: 'clamp(18px, 2vw, 20px)', color: '#4b5563', maxWidth: '600px', margin: '0 auto' }}>
            Create elegant, interactive wedding invitation webpages with stunning animations and personalized designs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', paddingTop: '32px' }}>
            <Link
              to="/invite/demo"
              style={{ background: 'linear-gradient(135deg, #c9a355 0%, #d4af37 100%)', color: 'white', padding: '16px 32px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', opacity: 1, transition: 'opacity 0.2s', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              View Demo Invitation
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', paddingTop: '64px' }}>
            {[
              {
                icon: Sparkles,
                title: "Premium Design",
                description: "Handcrafted templates with attention to typography and animation"
              },
              {
                icon: Heart,
                title: "Interactive Features",
                description: "Opening animations, music, messaging, and more"
              },
              {
                icon: Sparkles,
                title: "Instantly Shareable",
                description: "One link works on every device. Share via WhatsApp, email, or social media"
              }
            ].map((feature, index) => (
              <div key={index} className="invitation-card" style={{ padding: '24px', textAlign: 'center' }}>
                <feature.icon style={{ margin: '0 auto 12px', color: '#c9a355', width: '32px', height: '32px' }} />
                <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
