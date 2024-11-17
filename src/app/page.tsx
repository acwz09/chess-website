'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, Clock, Zap, Trophy, BookOpen, Users, Monitor } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="text-green-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePlayNow = () => {
    router.push('/play')
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-black rounded-full" />
          </div>
          <span className="text-2xl font-bold">ChessMaster</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          {['play', 'learn', 'watch', 'community'].map((item) => (
            <Link key={item} href={`/${item}`} className="hover:text-gray-300">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-gray-900 bg-gray-800"
            onClick={() => router.push('/auth/signin')}
          >
            Log in
          </Button>
          <Button 
            onClick={() => router.push('/auth/register')} 
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Sign up
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Play Chess Online</h1>
          <p className="text-xl mb-8">Free chess for everyone, everywhere, all the time.</p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white" onClick={handlePlayNow}>
              Play Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-gray-900 bg-gray-800"
              onClick={() => router.push('/auth/register')}
            >
              Create Account
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<Clock className="h-8 w-8" />}
            title="Multiple Time Controls"
            description="Play Bullet, Blitz, Rapid, or Classical chess games."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Chess Variants"
            description="Enjoy Chess960, Antichess, King of the Hill, and more."
          />
          <FeatureCard
            icon={<Trophy className="h-8 w-8" />}
            title="Tournaments"
            description="Participate in Swiss and Arena tournaments."
          />
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Learn & Improve"
            description="Access puzzles, opening explorer, and video lessons."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Community"
            description="Join clubs, chat with players, and make friends."
          />
          <FeatureCard
            icon={<Monitor className="h-8 w-8" />}
            title="Analysis Tools"
            description="Analyze your games with powerful chess engines."
          />
        </div>

        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-4">Stay updated with the latest news, tournaments, and features.</p>
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </main>

      <footer className="bg-gray-900 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2023 ChessMaster. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <Link href="/about" className="text-sm text-gray-400 hover:text-white">About</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms</Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy</Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}