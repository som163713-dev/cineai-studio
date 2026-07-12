import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-8xl">🔍</div>
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-400 text-lg">Page not found</p>
        <Link href="/fa">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
