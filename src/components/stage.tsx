type StageProps = {
    perspective: 'dramatic' | 'near' | 'normal' | 'midrange' | 'distant' | 'none'
    rotations: {
        rotateX: number
        rotateY: number
        rotateZ: number
    }
    transforms: {
        translateX: number
        translateY: number
        scaleX: number
        scaleY: number
        skewX: number
        skewY: number
    }
    backfaceVisible: boolean
    width: number
    height: number
}

export function Stage({ perspective, rotations, transforms, backfaceVisible, width, height }: StageProps) {
    return (
        <div id="stage" className={`relative w-full h-full min-h-screen bg-gray-50 grid place-items-center perspective-${perspective}`}>
            {/* Grid background */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div id="container">
                {/* Centered block */}
                <div 
                    id="box" 
                    style={{ 
                        width: `${width}px`, 
                        height: `${height}px`,
                        transform: `
                            translate(${transforms.translateX}px, ${transforms.translateY}px)
                            scale(${transforms.scaleX}, ${transforms.scaleY})
                            skew(${transforms.skewX}deg, ${transforms.skewY}deg)
                            rotateX(${rotations.rotateX}deg)
                            rotateY(${rotations.rotateY}deg)
                            rotateZ(${rotations.rotateZ}deg)
                        `
                    }}
                    className={`relative rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg ${backfaceVisible ? 'backface-visible' : 'backface-hidden'}`}
                ></div>
            </div>
        </div>
    )
}