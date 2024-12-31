'use client'

import { useState } from 'react'
import Header from '@/components/header'
import LandingPage from '@/components/landing-page'
import Dashboard from '@/components/dashboard'
import AuthModals from '@/components/auth-modals'
import SettingsModal from '@/components/settings-modal'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')

  return (
    <main className="flex min-h-screen flex-col">
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
        setShowSettings={setShowSettings}
        setShowAuth={setShowAuth}
        setAuthTab={setAuthTab}
      />
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <LandingPage setShowAuth={setShowAuth} setAuthTab={setAuthTab} />
      )}
      <AuthModals 
        setIsAuthenticated={setIsAuthenticated}
        initialTab={authTab}
        showAuth={showAuth}
        setShowAuth={setShowAuth}
      />
      <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings} />
    </main>
  )
}

