'use client'

import { Button } from "@/components/ui/button"
import { Settings, LogIn, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/ui/logo'

interface HeaderProps {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  setShowSettings: (value: boolean) => void
  setShowAuth: (value: boolean) => void
  setAuthTab: (value: 'signin' | 'signup') => void
}

export default function Header({ 
  isAuthenticated, 
  setIsAuthenticated, 
  setShowSettings,
  setShowAuth,
  setAuthTab
}: HeaderProps) {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setIsAuthenticated(false)
    }
  }

  const handleLogin = () => {
    setAuthTab('signin')
    setShowAuth(true)
  }

  const handleRegister = () => {
    setAuthTab('signup')
    setShowAuth(true)
  }

  return (
    <header className="w-full flex justify-between items-center p-4 bg-background border-b">
      <Logo />
      <div className="flex items-center space-x-2">
        {isAuthenticated ? (
          <>
            <Button variant="outline" size="icon" onClick={handleSignOut}>
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={handleRegister}>
              Register
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

