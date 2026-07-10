'use client'
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Clock, Film, Gauge, Info } from 'lucide-react'

export function VideoGenerator({ onSettingsChange }: { onSettingsChange: (settings: any) => void }) {
  const [duration, setDuration] = useState(5)
  const [fps, setFps] = useState(24)
  const [motionIntensity, setMotionIntensity] = useState(127)
  const [loopVideo, setLoopVideo] = useState(false)
  const [condAug, setCondAug] = useState(0.02)

  const handleSettingsUpdate = () => { onSettingsChange({ duration, fps, motionIntensity, loopVideo, condAug }) }
  const creditCost = duration <= 5 ? 3 : duration <= 10 ? 5 : 8

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold flex items-center gap-2"><Clock className="w-4 h-4" />Duration</label>
          <span className="text-sm font-semibold text-primary">{duration}s</span>
        </div>
        <Slider value={[duration]} onValueChange={([value]) => { setDuration(value); handleSettingsUpdate() }} min={3} max={15} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>3 seconds</span><span>15 seconds</span></div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold flex items-center gap-2"><Film className="w-4 h-4" />FPS</label>
          <span className="text-sm font-semibold text-primary">{fps} FPS</span>
        </div>
        <Slider value={[fps]} onValueChange={([value]) => { setFps(value); handleSettingsUpdate() }} min={15} max={60} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>15 FPS (Low)</span><span>60 FPS (High)</span></div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold flex items-center gap-2"><Gauge className="w-4 h-4" />Motion Intensity</label>
          <span className="text-sm font-semibold text-primary">{motionIntensity}</span>
        </div>
        <Slider value={[motionIntensity]} onValueChange={([value]) => { setMotionIntensity(value); handleSettingsUpdate() }} min={0} max={255} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>Subtle</span><span>Intense</span></div>
      </div>
      <div className="flex items-center justify-between py-2">
        <label className="text-sm font-semibold">Loop Video</label>
        <input type="checkbox" checked={loopVideo} onChange={(e) => { setLoopVideo(e.target.checked); handleSettingsUpdate() }} className="w-5 h-5" />
      </div>
      <div className="bg-dark-3 rounded-lg p-4 space-y-3">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Video Generation Info</p>
            <div className="space-y-1 text-muted-foreground">
              <p>• Cost: <span className="text-primary font-semibold">{creditCost} credits</span></p>
              <p>• Estimated time: {Math.round(duration * 1.5)}-{Math.round(duration * 2.5)} minutes</p>
              <p>• Total frames: {duration * fps}</p>
              <p>• Format: MP4 with H.264 codec</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}