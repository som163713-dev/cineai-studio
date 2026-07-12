'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthErrorPage({ params }: { params: { lang: string } }) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-6xl mb-4">😅</div>
          <CardTitle className="text-2xl text-red-400">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-6">
            Something went wrong while trying to sign in. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={`/${params.lang}/auth/signin`}>
              <Button>Try Again</Button>
            </Link>
            <Link href={`/${params.lang}`}>
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
