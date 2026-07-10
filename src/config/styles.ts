export interface StyleConfig { label: string; icon: string; prompt: string }

export const styles: Record<string, StyleConfig> = {
  realistic: { label: 'Realistic', icon: '📷', prompt: 'Highly detailed, photorealistic, professional photography, 8K, sharp focus' },
  anime: { label: 'Anime', icon: '🎌', prompt: 'Anime style, vibrant colors, detailed character art, studio ghibli inspired' },
  oil_painting: { label: 'Oil Painting', icon: '🖼️', prompt: 'Oil painting on canvas, classical art, visible brush strokes, artistic' },
  cyberpunk: { label: 'Cyberpunk', icon: '🌆', prompt: 'Cyberpunk style, neon colors, futuristic city, dark atmosphere, rain' },
  watercolor: { label: 'Watercolor', icon: '🎨', prompt: 'Watercolor painting, soft colors, flowing brush strokes, artistic illustration' },
  digital_art: { label: 'Digital Art', icon: '💻', prompt: 'Digital art, modern illustration, vibrant colors, clean lines, stylized' },
  pixel_art: { label: 'Pixel Art', icon: '👾', prompt: 'Pixel art style, retro gaming aesthetic, 16-bit inspired, clean pixels' },
  cinematic: { label: 'Cinematic', icon: '🎬', prompt: 'Cinematic shot, film grain, dramatic lighting, movie poster quality' },
  fantasy: { label: 'Fantasy', icon: '🧙', prompt: 'Fantasy art, magical atmosphere, ethereal lighting, mythical creatures' },
  minimalist: { label: 'Minimalist', icon: '⚪', prompt: 'Minimalist design, clean lines, simple shapes, modern aesthetic' },
  sketch: { label: 'Sketch', icon: '✏️', prompt: 'Pencil sketch, hand-drawn, detailed linework, artistic drawing' },
  '3d_render': { label: '3D Render', icon: '🎯', prompt: '3D render, octane render, realistic materials, studio lighting' },
}

export const videoStyles: Record<string, StyleConfig> = {
  realistic: { label: 'Cinematic', icon: '🎥', prompt: 'Cinematic video, smooth camera movement, professional lighting' },
  anime: { label: 'Anime', icon: '🎌', prompt: 'Anime style animation, fluid motion, vibrant colors' },
  cyberpunk: { label: 'Cyberpunk', icon: '🌆', prompt: 'Cyberpunk aesthetic, neon lights, futuristic atmosphere' },
  nature: { label: 'Nature', icon: '🌿', prompt: 'Nature documentary style, smooth panning, natural lighting' },
  abstract: { label: 'Abstract', icon: '🌀', prompt: 'Abstract animation, geometric shapes, colorful transitions' },
}