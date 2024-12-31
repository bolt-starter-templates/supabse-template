'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from '@/lib/supabase'

interface UserData {
  email: string
  lastSignInAt: string
  createdAt: string
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        if (user) {
          setUserData({
            email: user.email || '',
            lastSignInAt: new Date(user.last_sign_in_at || '').toLocaleDateString(),
            createdAt: new Date(user.created_at).toLocaleDateString()
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    getUserData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>Quick summary of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Email: {userData?.email}</p>
            <p>Account created: {userData?.createdAt}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Last sign in: {userData?.lastSignInAt}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security Status</CardTitle>
            <CardDescription>Your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Email verified: {userData?.email ? 'Yes' : 'No'}</p>
            <p>Two-factor authentication: Not enabled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

