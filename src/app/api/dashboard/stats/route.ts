import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get all generations
    const generations = await prisma.generation.findMany({
      where: { userId },
    })

    // Get current month's generations
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const monthlyGenerations = await prisma.generation.findMany({
      where: {
        userId,
        createdAt: { gte: startOfMonth },
      },
    })

    const imagesCount = generations.filter(g => g.type === 'image').length
    const videosCount = generations.filter(g => g.type === 'video').length
    const creditsUsed = generations.reduce((sum, g) => sum + g.creditUsed, 0)
    const monthlyCreditsUsed = monthlyGenerations.reduce((sum, g) => sum + g.creditUsed, 0)

    return NextResponse.json({
      imagesCount,
      videosCount,
      totalGenerations: generations.length,
      creditsUsed,
      monthlyCreditsUsed,
      thisMonth: monthlyGenerations.length,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
