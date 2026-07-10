import { styles, videoStyles } from './styles'

export const defaultNegativePrompt = 'low quality, blurry, distorted, ugly, bad anatomy, deformed, disfigured, watermark, text, logo, signature'
export const defaultVideoNegativePrompt = 'low quality, blurry, distorted, jittery, flickering, watermark, text, logo'

export function getStylePrompt(style: string, type: 'image' | 'video' = 'image'): string {
  const styleMap = type === 'image' ? styles : videoStyles
  const selectedStyle = styleMap[style]
  if (!selectedStyle) {
    console.warn(`Style "${style}" not found, using default`)
    return type === 'image' ? styles.realistic.prompt : videoStyles.realistic.prompt
  }
  return selectedStyle.prompt
}

export const creditCosts = {
  image: { standard: 1, hd: 2, ultra: 3 },
  video: { short: 3, medium: 5, long: 8 },
}

export function calculateVideoCredits(duration: number): number {
  if (duration <= 5) return creditCosts.video.short
  if (duration <= 10) return creditCosts.video.medium
  return creditCosts.video.long
}

export const generationLimits: Record<string, any> = {
  free: { maxDailyGenerations: 10, maxResolution: '1024x1024', allowedStyles: ['realistic', 'anime', 'digital_art'], videoEnabled: false },
  basic: { maxDailyGenerations: 100, maxResolution: '2048x2048', allowedStyles: 'all', videoEnabled: true, maxVideoDuration: 5 },
  pro: { maxDailyGenerations: 500, maxResolution: '4096x4096', allowedStyles: 'all', videoEnabled: true, maxVideoDuration: 10 },
  premium: { maxDailyGenerations: Infinity, maxResolution: '8192x8192', allowedStyles: 'all', videoEnabled: true, maxVideoDuration: 15 },
}