// src/app/api/auth/signin/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return NextResponse.json({
      message: 'Sign in successful',
      userId: userCredential.user.uid
    })

  } catch (error: any) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: error.message || 'Sign in failed' },
      { status: 401 }
    )
  }
}