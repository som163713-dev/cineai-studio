'use client'
import { useState, useRef, useCallback } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps { onImageSelect: (imageUrl: string | null) => void }

export function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) { setError('Invalid file type. Please use JPEG, PNG, WebP, or GIF.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('File is too large. Maximum size is 5MB.'); return }
    setError(null)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      onImageSelect(data.url)
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image. Please try again.')
      setPreview(null); onImageSelect(null)
    } finally { setIsUploading(false) }
  }

  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file) }, [])
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }, [])
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false) }, [])

  const clearImage = () => {
    setPreview(null); setError(null); onImageSelect(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold">Upload Reference Image <span className="text-xs text-muted-foreground ml-2">(Optional)</span></label>
      <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current?.click()} className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center ${isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-dark-3 hover:border-primary/50 hover:bg-dark-3/50'} ${preview ? 'border-primary/50' : ''}`}>
        {preview ? (
          <div className="relative w-full max-w-xs mx-auto">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            <button onClick={(e) => { e.stopPropagation(); clearImage() }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition shadow-lg"><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-dark-3 flex items-center justify-center mx-auto">
              {isUploading ? <div className="loader w-6 h-6"></div> : <Upload className="w-8 h-8 text-muted-foreground" />}
            </div>
            <div>
              <p className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Click or drag & drop'}</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5MB</p>
            </div>
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file) }} className="hidden" />
      {error && <p className="text-sm text-red-400 flex items-center gap-2"><X className="w-4 h-4" />{error}</p>}
    </div>
  )
}