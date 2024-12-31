import { Button } from "@/components/ui/button"

interface LandingPageProps {
  setShowAuth: (value: boolean) => void
  setAuthTab: (value: 'signin' | 'signup') => void
}

export default function LandingPage({ setShowAuth, setAuthTab }: LandingPageProps) {
  const handleLogin = () => {
    setAuthTab('signin')
    setShowAuth(true)
  }

  const handleRegister = () => {
    setAuthTab('signup')
    setShowAuth(true)
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Auth WebApp</h1>
      <p className="text-xl mb-8 max-w-md">
        Securely manage your account and access exclusive features. Join us today!
      </p>
      <div className="space-x-4">
        <Button variant="outline" onClick={handleLogin}>Login</Button>
        <Button onClick={handleRegister}>Register Now</Button>
      </div>
    </div>
  )
}

