import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import InvitationPage from './components/InvitationPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/invite/:slug" element={<InvitationPage />} />
      </Routes>
    </Router>
  )
}

export default App
