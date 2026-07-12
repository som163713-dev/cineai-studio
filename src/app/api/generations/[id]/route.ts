import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'Generation ID required' }, { status: 400 })
    }

    // Check if generation belongs to user
    const generation = await prisma.generation.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!generation) {
      return NextResponse.json({ error: 'Generation not found' }, { status: 404 })
    }

    await prisma.generation.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete generation error:', error)
    return NextResponse.json(
      { error: 'Failed to delete generation' },
      { status: 500 }
    )
  }
}
