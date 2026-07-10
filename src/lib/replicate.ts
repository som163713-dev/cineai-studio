import Replicate from 'replicate'

if (!process.env.REPLICATE_API_TOKEN) console.warn('REPLICATE_API_TOKEN is not set. AI generation will not work.')

export const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN || '' })

export const REPLICATE_MODELS = {
  stableDiffusion: 'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
  stableVideoDiffusion: 'stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438',
  realEsrgan: 'nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b',
}

export default replicate