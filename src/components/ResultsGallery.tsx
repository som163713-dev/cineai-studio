'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Eye, ZoomIn, X } from 'lucide-react'

interface ResultsGalleryProps { results: any[]; isLoading: boolean }

export function ResultsGallery({ results, isLoading }: ResultsGalleryProps) {
  const [selectedResult, setSelectedResult] = useState<any>(null)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link); link.click(); document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) { window.open(url, '_blank') }
  }

  if (isLoading && results.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl">✨</span></div>
          </div>
          <div className="space-y-2"><p className="text-lg font-semibold text-white">Generating...</p><p className="text-sm text-muted-foreground">Creating your AI masterpiece</p></div>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <Card className="bg-dark-2 border-dark-3 h-96">
        <CardContent className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-dark-3 flex items-center justify-center"><span className="text-4xl">🎨</span></div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">No Results Yet</h3>
            <p className="text-muted-foreground max-w-md">Enter a prompt and click Generate to create amazing AI-powered images and videos</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Results ({results.length})</h3>
        {results.length > 0 && <p className="text-sm text-muted-foreground">Click on any result to view details</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((result, index) => (
          <Card key={result.id || index} className="bg-dark-2 border-dark-3 overflow-hidden group hover:border-primary/50 transition-all duration-300 animate-fade-in">
            <div className="relative aspect-square bg-dark-3 overflow-hidden">
              {result.imageUrl ? (
                <Image src={result.imageUrl} alt={result.prompt || 'Generated image'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
              ) : result.videoUrl ? (
                <video src={result.videoUrl} className="w-full h-full object-cover" controls poster={result.imageUrl} />
              ) : (
                <div className="flex items-center justify-center h-full"><div className="text-center space-y-2"><div className="loader w-8 h-8 mx-auto"></div><p className="text-sm text-muted-foreground">Processing...</p></div></div>
              )}
              {result.status === 'processing' && <div className="absolute top-3 left-3"><span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 animate-pulse">Processing</span></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm" onClick={() => setSelectedResult(result)}><Eye className="w-4 h-4 ml-2" />View</Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm" onClick={() => { const url = result.imageUrl || result.videoUrl; if (url) handleDownload(url, `cineai-${Date.now()}`) }}><Download className="w-4 h-4 ml-2" />Download</Button>
                  <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm" onClick={() => setZoomedImage(result.imageUrl)}><ZoomIn className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-300 line-clamp-2 mb-2">{result.prompt}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span className="flex items-center gap-1">{result.type === 'image' ? '🖼️ Image' : '🎬 Video'}</span>
                <span>{result.createdAt && new Date(result.createdAt).toLocaleDateString('fa-IR')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedResult && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedResult(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-dark-2 rounded-xl overflow-hidden animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedResult(null)} className="absolute top-4 right-4 z-10 bg-dark-3 hover:bg-dark-4 rounded-full w-10 h-10 flex items-center justify-center transition shadow-lg"><X className="w-5 h-5" /></button>
            {selectedResult.imageUrl ? (
              <div className="relative w-full aspect-square max-h-[70vh]"><Image src={selectedResult.imageUrl} alt={selectedResult.prompt} fill className="object-contain" /></div>
            ) : selectedResult.videoUrl ? (
              <video src={selectedResult.videoUrl} className="w-full max-h-[70vh]" controls autoPlay />
            ) : null}
            <div className="p-6 bg-dark-2 border-t border-dark-3">
              <h3 className="text-lg font-semibold mb-3">{selectedResult.prompt}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span>Style: {selectedResult.style}</span><span>Type: {selectedResult.type}</span><span>Credits: {selectedResult.creditUsed}</span>
                <span>Created: {new Date(selectedResult.createdAt).toLocaleDateString('fa-IR')}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => { const url = selectedResult.imageUrl || selectedResult.videoUrl; if (url) handleDownload(url, `cineai-${selectedResult.id}`) }} className="bg-gradient-to-r from-primary to-secondary"><Download className="w-4 h-4 ml-2" />Download</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {zoomedImage && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setZoomedImage(null)}>
          <button onClick={() => setZoomedImage(null)} className="absolute top-4 right-4 z-10 bg-dark-3 hover:bg-dark-4 rounded-full w-12 h-12 flex items-center justify-center transition shadow-lg"><X className="w-6 h-6" /></button>
          <div className="relative w-full h-full max-w-[95vw] max-h-[95vh]"><Image src={zoomedImage} alt="Zoomed view" fill className="object-contain" /></div>
        </div>
      )}
    </div>
  )
}