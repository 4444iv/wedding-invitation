import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InvitationTemplate from './InvitationTemplate'

const invitationData = {
  groomName: 'Hassan Ali',
  brideName: 'Nimra Amin',
  message: "We're getting married",
  weddingDate: '2026-08-01',
  weddingTime: '19:00',
  venueName: 'Qasr e Ambala Event Complex',
  venueAddress: 'Club Road, Sargodha',
  musicEnabled: true,
  musicTrack: 'track1',
  musicUrl: './music/track1.mp3',
  backgroundImage:
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&q=80',
  programTimeline: [
    { title: 'Reception of Guests', time: 'Aug 01, 2026, 7:00 PM' },
    { title: 'Dinner', time: 'Aug 01, 2026, 8:00 PM' },
  ],
}

function InvitationPage() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 400)

    document.documentElement.style.backgroundColor = 'hsl(160, 25%, 8%)'
    document.body.style.backgroundColor = 'hsl(160, 25%, 8%)'
    document.documentElement.style.colorScheme = 'dark'

    return () => {
      document.documentElement.style.backgroundColor = ''
      document.body.style.backgroundColor = ''
      document.documentElement.style.colorScheme = ''
      clearTimeout(timer)
    }
  }, [slug])

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'hsl(160, 25%, 8%)' }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 animate-spin"
            style={{
              border: '3px solid hsl(40, 50%, 55%)',
              borderTopColor: 'transparent',
            }}
          />
          <p style={{ color: 'hsl(40, 30%, 85%)' }}>Loading invitation...</p>
        </div>
      </div>
    )
  }

  return <InvitationTemplate data={invitationData} />
}

export default InvitationPage
