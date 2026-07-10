import { User as NextAuthUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; name?: string | null; email?: string | null; image?: string | null
      credits: number; plan: string; language: string
    }
  }
  interface User { credits: number; plan: string; language: string }
}

declare module 'next-auth/jwt' {
  interface JWT { id: string; credits: number; plan: string; language: string }
}

export interface UserProfile {
  id: string; name: string | null; email: string | null; image: string | null
  credits: number; plan: PlanType; language: string; createdAt: Date; updatedAt: Date
}

export type PlanType = 'free' | 'basic' | 'pro' | 'premium'
export type GenerationType = 'image' | 'video'
export type GenerationStatus = 'processing' | 'completed' | 'failed'
export type SupportedLanguage = 'fa' | 'en' | 'ar' | 'tr' | 'de'

export interface Generation {
  id: string; userId: string; type: GenerationType; style: string; prompt: string
  negativePrompt?: string | null; imageUrl?: string | null; videoUrl?: string | null
  status: GenerationStatus; creditUsed: number; createdAt: Date; updatedAt: Date
  user?: UserProfile
}

export interface Subscription {
  id: string; userId: string; plan: PlanType; status: 'active' | 'cancelled' | 'expired'
  stripeId: string; currentPeriodStart: Date; currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean; createdAt: Date; updatedAt: Date
}

export interface PricingPlan {
  name: string; price: string; credits: number; features: string[]
  notIncluded: string[]; popular: boolean; stripePriceId: string | null; color: string; icon: any
}

export interface GenerateImageRequest { prompt: string; negativePrompt?: string; style: string; imageUrl?: string | null }
export interface GenerateVideoRequest { prompt: string; negativePrompt?: string; style: string; duration: number; fps: number }

export interface GenerateResponse {
  id: string; type: GenerationType; status: GenerationStatus; imageUrl?: string
  videoUrl?: string; prompt: string; style: string; creditUsed: number; createdAt: Date
}

export interface ApiResponse<T> {
  data?: T; error?: string; message?: string
  pagination?: { page: number; limit: number; total: number; totalPages: number; hasMore: boolean }
}

export interface DashboardStats {
  totalGenerations: number; imagesCount: number; videosCount: number
  completedCount: number; failedCount: number; successRate: string
  creditsUsed: number; creditsUsedLastMonth: number; totalCreditsUsed: number
  recentGenerations: Generation[]
}

export interface NavItem { href: string; label: string; icon?: React.ComponentType<any>; active?: boolean }
export interface Style { label: string; icon: string; prompt: string }
export interface UploadResponse { url: string; publicId: string; width?: number; height?: number; format?: string; size?: number }