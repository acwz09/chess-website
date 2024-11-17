// src/app/auth/signin/page.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { FaGoogle } from 'react-icons/fa'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (provider: string) => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/auth/signin/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in with provider failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">Sign In</h1>

        {searchParams.get('registered') && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 rounded p-3 mb-4">
            Registration successful! Please sign in.
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium block mb-2">
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium block mb-2">
              Password
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => signIn('google')}
            className="mt-4 w-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center"
          >
            <FaGoogle className="mr-2" />
            Google
          </Button>
        </div>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-green-500 hover:text-green-400">
            Sign up
          </Link>
        </p>

        <p className="mt-2 text-center text-gray-400">
          <Link href="/auth/forgot-password" className="text-green-500 hover:text-green-400">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  )
}