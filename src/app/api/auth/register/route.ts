// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { z } from 'zod'

const registrationSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const result = registrationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }

    const { username, email, password } = result.data

    // Create Firebase auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
      emailVerified: null,
    })

    return NextResponse.json({
      message: 'Registration successful',
      userId: userCredential.user.uid
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}