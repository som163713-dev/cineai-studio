'use client'
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Info, Settings2 } from 'lucide-react'

interface GenerationSettingsProps { generationType: 'image' | 'video' }

export function GenerationSettings({ generationType }: GenerationSettingsProps) {
  const [guidanceScale, setGuidanceScale] = useState(7.5)
  const [steps, setSteps] = useState(50)
  const [duration, setDuration] = useState(5)
  const [fps, setFps] = useState(24)
  const [advancedMode, setAdvancedMode] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Settings2 className="w-4 h-4" />Generation Settings</h3>
        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <span>Advanced</span>
          <input type="checkbox" checked={advancedMode} onChange={(e) => setAdvancedMode(e.target.checked)} className="w-4 h-4" />
        </label>
      </div>
      {advancedMode && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-muted-foreground flex items-center gap-1">Guidance Scale <Info className="w-3 h-3" title="How closely to follow the prompt" /></label>
              <span className="text-xs font-semibold text-primary">{guidanceScale}</span>
            </div>
            <Slider value={[guidanceScale]} onValueChange={([value]) => setGuidanceScale(value)} min={1} max={20} step={0.5} className="w-full" />
            <div className="flex justify-between text-[10px] text-muted-foreground"><span>Creative</span><span>Precise</span></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-muted-foreground flex items-center gap-1">Quality Steps <Info className="w-3 h-3" title="More steps = higher quality but slower" /></label>
              <span className="text-xs font-semibold text-primary">{steps}</span>
            </div>
            <Slider value={[steps]} onValueChange={([value]) => setSteps(value)} min={10} max={100} step={5} className="w-full" />
            <div className="flex justify-between text-[10px] text-muted-foreground"><span>Fast</span><span>Best Quality</span></div>
          </div>
          {generationType === 'video' && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-muted-foreground">Duration (seconds)</label>
                  <span className="text-xs font-semibold text-primary">{duration}s</span>
                </div>
                <Slider value={[duration]} onValueChange={([value]) => setDuration(value)} min={3} max={15} step={1} />
                <div className="flex justify-between text-[10px] text-muted-foreground"><span>3s</span><span>15s</span></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-muted-foreground">Frames Per Second</label>
                  <span className="text-xs font-semibold text-primary">{fps} FPS</span>
                </div>
                <Slider value={[fps]} onValueChange={([value]) => setFps(value)} min={15} max={60} step={1} />
                <div className="flex justify-between text-[10px] text-muted-foreground"><span>15 FPS</span><span>60 FPS</span></div>
              </div>
            </>
          )}
        </div>
      )}
      {!advancedMode && (
        <div className="bg-dark-3 rounded-lg p-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p>Default settings are optimized for best results. Enable advanced mode for more control.</p>
          </div>
        </div>
      )}
    </div>
  )
}