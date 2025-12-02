import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      )
    }

    // TODO: Add your newsletter service integration here
    console.log('Newsletter subscription:', email)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}