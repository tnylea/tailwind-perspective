import { useState } from 'react'
import './App.css'
import { Stage } from './components/stage'
import { Controls } from './components/controls'
import { Toaster } from "@/components/ui/toaster"

type Perspective = 'dramatic' | 'near' | 'normal' | 'midrange' | 'distant' | 'none'
type AspectRatio = 'auto' | 'square' | 'video'

type Rotations = {
  rotateX: number
  rotateY: number
  rotateZ: number
}

type Size = {
  width: number
  height: number
}

type Transforms = {
  translateX: number
  translateY: number
  scaleX: number
  scaleY: number
  skewX: number
  skewY: number
}

function App() {
  const [perspective, setPerspective] = useState<Perspective>('normal')
  const [rotations, setRotations] = useState<Rotations>({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  })
  const [transforms, setTransforms] = useState<Transforms>({
    translateX: 0,
    translateY: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
  })
  const [backfaceVisible, setBackfaceVisible] = useState(true)
  const [size, setSize] = useState<Size>({ width: 256, height: 256 })
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('square')

  // Calculate height based on aspect ratio
  const calculatedHeight = aspectRatio === 'auto' 
    ? size.height 
    : aspectRatio === 'square' 
      ? size.width 
      : Math.round(size.width * (9/16)) // 16:9 video ratio

  return (
    <div className="fixed inset-0 overflow-hidden">
      <main>
        <Stage 
          perspective={perspective} 
          rotations={rotations}
          transforms={transforms}
          backfaceVisible={backfaceVisible}
          width={size.width}
          height={calculatedHeight}
        />
        <Controls 
          perspective={perspective} 
          onPerspectiveChange={setPerspective}
          rotations={rotations}
          onRotationsChange={setRotations}
          transforms={transforms}
          onTransformsChange={setTransforms}
          backfaceVisible={backfaceVisible}
          onBackfaceVisibleChange={setBackfaceVisible}
          size={size}
          onSizeChange={setSize}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
        />
        <Toaster />
      </main>
    </div>
  )
}

export default App
