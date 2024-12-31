'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from '@/lib/supabase'
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react'

interface UserProfile {
  email: string
  displayName: string
  phone: string
}

interface SettingsModalProps {
  showSettings: boolean
  setShowSettings: (value: boolean) => void
}

export default function SettingsModal({ showSettings, setShowSettings }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    displayName: '',
    phone: ''
  })
  const [isEditing, setIsEditing] = useState({
    displayName: false,
    phone: false
  })

  useEffect(() => {
    if (showSettings) {
      loadUserProfile()
    }
  }, [showSettings])

  const loadUserProfile = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      if (user) {
        setProfile({
          email: user.email || '',
          displayName: user.user_metadata.display_name || '',
          phone: user.phone || ''
        })
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      setMessage('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (field: 'displayName' | 'phone') => {
    try {
      setLoading(true)
      setError(null)
      let updateData = {}
      
      if (field === 'displayName') {
        updateData = { data: { display_name: profile.displayName } }
      } else if (field === 'phone') {
        updateData = { phone: profile.phone }
      }

      const { error } = await supabase.auth.updateUser(updateData)
      if (error) throw error
      
      setMessage(`${field === 'displayName' ? 'Display name' : 'Phone number'} updated successfully`)
      setIsEditing({ ...isEditing, [field]: false })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.rpc('delete_user')
      if (error) throw error
      await supabase.auth.signOut()
      setShowSettings(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 text-green-800 text-sm p-3 rounded-md">
            {message}
          </div>
        )}
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="space-y-4 py-4">
              <div className="grid w-full gap-2">
                <Label>Email</Label>
                <Input value={profile.email} disabled />
              </div>
              <div className="grid w-full gap-2">
                <Label>Display Name</Label>
                <div className="flex gap-2">
                  <Input
                    value={profile.displayName}
                    disabled={!isEditing.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  />
                  {isEditing.displayName ? (
                    <Button
                      onClick={() => handleUpdateProfile('displayName')}
                      disabled={loading}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing({ ...isEditing, displayName: true })}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid w-full gap-2">
                <Label>Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    value={profile.phone}
                    disabled={!isEditing.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                  {isEditing.phone ? (
                    <Button
                      onClick={() => handleUpdateProfile('phone')}
                      disabled={loading}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing({ ...isEditing, phone: true })}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-destructive">Danger Zone</h4>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? 'Deleting Account...' : 'Delete Account'}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <form onSubmit={handlePasswordChange} className="space-y-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="appearance">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setTheme('system')}
                  >
                    <span className="h-4 w-4 mr-2">💻</span>
                    System
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

