'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'

interface PricingPlan {
  name: string; price: string; period: string; credits: number
  features: string[]; notIncluded: string[]; popular: boolean
  stripePriceId: string | null; color: string; icon: any
}

interface PricingCardsProps { plans: PricingPlan[]; lang: string }

export function PricingCards({ plans, lang }: PricingCardsProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!plan.stripePriceId || !session) { router.push(`/${lang}/auth/signin`); return }
    setLoadingPlan(plan.name)
    try {
      const response = await fetch('/api/payment/create-checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripePriceId: plan.stripePriceId }),
      })
      const data = await response.json()
      if (data.url) window.location.href = data.url
    } catch (error) { console.error('Subscription error:', error) } finally { setLoadingPlan(null) }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => {
        const Icon = plan.icon
        const isCurrentPlan = session?.user?.plan === plan.name.toLowerCase()
        return (
          <Card key={plan.name} className={`relative bg-dark-2 border-dark-3 transition-all duration-300 hover:scale-105 ${plan.popular ? 'border-primary ring-2 ring-primary/50 shadow-xl shadow-primary/20' : 'hover:border-primary/50'}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 shadow-lg">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="text-center pb-0">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}><Icon className="w-8 h-8 text-white" /></div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4"><span className="text-4xl font-bold">{plan.price}</span><span className="text-muted-foreground ml-1">{plan.period}</span></div>
              <p className="text-sm text-muted-foreground mt-2">{plan.credits.toLocaleString()} credits</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-sm">{feature}</span></div>
                ))}
              </div>
              {plan.notIncluded.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-dark-3">
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-muted-foreground"><X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" /><span className="text-sm">{feature}</span></div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubscribe(plan)} disabled={loadingPlan === plan.name || isCurrentPlan} className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' : 'bg-dark-3 hover:bg-dark-4'}`}>
                {loadingPlan === plan.name ? (<span className="loader w-5 h-5"></span>) : isCurrentPlan ? 'Current Plan' : plan.stripePriceId ? 'Subscribe Now' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}