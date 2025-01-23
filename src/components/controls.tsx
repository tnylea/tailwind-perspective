import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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

type ControlsProps = {
    perspective: Perspective
    onPerspectiveChange: (perspective: Perspective) => void
    rotations: Rotations
    onRotationsChange: (rotations: Rotations) => void
    backfaceVisible: boolean
    onBackfaceVisibleChange: (visible: boolean) => void
    size: Size
    onSizeChange: (size: Size) => void
    aspectRatio: AspectRatio
    onAspectRatioChange: (ratio: AspectRatio) => void
    transforms: Transforms
    onTransformsChange: (transforms: Transforms) => void
}

const perspectives = [
    { value: "dramatic", label: "dramatic" },
    { value: "near", label: "near" },
    { value: "normal", label: "normal" },
    { value: "midrange", label: "midrange" },
    { value: "distant", label: "distant" },
    { value: "none", label: "none" },
] as const

const aspectRatios = [
    { value: "auto", label: "Auto" },
    { value: "square", label: "Square" },
    { value: "video", label: "16:9" },
] as const

export function Controls({ 
    perspective, 
    onPerspectiveChange,
    rotations,
    onRotationsChange,
    backfaceVisible,
    onBackfaceVisibleChange,
    size,
    onSizeChange,
    aspectRatio,
    onAspectRatioChange,
    transforms,
    onTransformsChange
}: ControlsProps) {
    const handleRotationChange = (axis: keyof Rotations) => (value: number[]) => {
        onRotationsChange({
            ...rotations,
            [axis]: value[0]
        })
    }

    const handleSizeChange = (dimension: keyof Size) => (value: number[]) => {
        onSizeChange({
            ...size,
            [dimension]: value[0]
        })
    }

    const handleReset = () => {
        onRotationsChange({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        })
        onSizeChange({ width: 256, height: 256 })
        onAspectRatioChange('square')
        onTransformsChange({
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0
        })
    }

    return (
        <div className="absolute bottom-0 right-0 p-4 max-h-screen flex flex-col">
            <div className="flex flex-col relative bg-white/80 backdrop-blur-sm overflow-hidden h-full rounded-lg border border-stone-200 shadow-lg w-full max-w-md">
                <div className="p-4 font-medium border-b text-sm border-stone-200">Controls</div>
                <div className="relative w-full h-full overflow-scroll">
                    {/* Perspective Controls */}
                    <div className="flex flex-col gap-4 mt-1 p-4">
                        <Label>Perspective</Label>
                        <Tabs value={perspective} onValueChange={value => onPerspectiveChange(value as Perspective)} className="w-full">
                            <TabsList className="grid grid-cols-6 w-full">
                                {perspectives.map((p) => (
                                    <TabsTrigger
                                        key={p.value}
                                        value={p.value}
                                        className="text-sm"
                                    >
                                        {p.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>

                    <Separator />

                    {/* Backface Visibility Control */}
                    <div className="flex items-center justify-start space-x-1 p-4 gap-2">
                        <Label>Backface Visible</Label>
                        <Switch
                            checked={backfaceVisible}
                            onCheckedChange={onBackfaceVisibleChange}
                        />
                    </div>

                    <Separator />

                    {/* Rotation Controls */}
                    <div className="space-y-5 p-4">
                        <div className="flex flex-col gap-3">
                            <Label>Rotate X: {rotations.rotateX}°</Label>
                            <Slider
                                min={-180}
                                max={180}
                                step={1}
                                value={[rotations.rotateX]}
                                onValueChange={handleRotationChange('rotateX')}
                            />
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <Label>Rotate Y: {rotations.rotateY}°</Label>
                            <Slider
                                min={-180}
                                max={180}
                                step={1}
                                value={[rotations.rotateY]}
                                onValueChange={handleRotationChange('rotateY')}
                            />
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <Label>Rotate Z: {rotations.rotateZ}°</Label>
                            <Slider
                                min={-180}
                                max={180}
                                step={1}
                                value={[rotations.rotateZ]}
                                onValueChange={handleRotationChange('rotateZ')}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-start space-x-6 p-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>More Options</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-5 pt-2">
                                        {/* Transform Controls */}
                                        <div className="space-y-5">
                                            <div className="flex flex-col gap-3">
                                                <Label>Translate X: {transforms.translateX}px</Label>
                                                <Slider
                                                    min={-500}
                                                    max={500}
                                                    step={1}
                                                    value={[transforms.translateX]}
                                                    onValueChange={value => onTransformsChange({ ...transforms, translateX: value[0] })}
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col gap-3">
                                                <Label>Translate Y: {transforms.translateY}px</Label>
                                                <Slider
                                                    min={-500}
                                                    max={500}
                                                    step={1}
                                                    value={[transforms.translateY]}
                                                    onValueChange={value => onTransformsChange({ ...transforms, translateY: value[0] })}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <Label>Scale X: {transforms.scaleX}</Label>
                                                <Slider
                                                    min={0}
                                                    max={5}
                                                    step={0.1}
                                                    value={[transforms.scaleX]}
                                                    onValueChange={value => onTransformsChange({ ...transforms, scaleX: value[0] })}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <Label>Scale Y: {transforms.scaleY}</Label>
                                                <Slider
                                                    min={0}
                                                    max={5}
                                                    step={0.1}
                                                    value={[transforms.scaleY]}
                                                    onValueChange={value => onTransformsChange({ ...transforms, scaleY: value[0] })}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <Label>Skew X: {transforms.skewX}°</Label>
                                                <Slider
                                                    min={-180}
                                                    max={180}
                                                    step={1}
                                                    value={[transforms.skewX]}
                                                    onValueChange={value => onTransformsChange({ ...transforms, skewX: value[0] })}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <Label>Skew Y: {transforms.skewY}°</Label>
                                                <Slider
                                                    min={-180}
                                                    max={180}
                                                    step={1}
                                                    value={[transforms.skewY]}
                                                    onValueChange={value => onTransformsChange({ ...transforms, skewY: value[0] })}
                                                />
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Size Controls */}
                                        <div className="flex flex-col gap-3">
                                            <Label>Width: {size.width}px</Label>
                                            <Slider
                                                min={1}
                                                max={1500}
                                                step={1}
                                                value={[size.width]}
                                                onValueChange={handleSizeChange('width')}
                                            />
                                        </div>
                                        
                                        <div className={`flex flex-col gap-3 ${aspectRatio !== 'auto' ? 'opacity-50' : ''}`}>
                                            <Label>Height: {aspectRatio === 'auto' ? size.height : (aspectRatio === 'square' ? size.width : Math.round(size.width * (9/16)))}px</Label>
                                            <Slider
                                                min={1}
                                                max={1500}
                                                step={1}
                                                value={[aspectRatio === 'auto' ? size.height : (aspectRatio === 'square' ? size.width : Math.round(size.width * (9/16)))]}
                                                onValueChange={handleSizeChange('height')}
                                                disabled={aspectRatio !== 'auto'}
                                            />
                                        </div>

                                        {/* Aspect Ratio Control */}
                                        <div className="flex flex-col gap-3">
                                            <Label>Aspect Ratio</Label>
                                            <Tabs value={aspectRatio} onValueChange={value => onAspectRatioChange(value as AspectRatio)} className="w-full">
                                                <TabsList className="grid grid-cols-3 w-full">
                                                    {aspectRatios.map((ratio) => (
                                                        <TabsTrigger
                                                            key={ratio.value}
                                                            value={ratio.value}
                                                            className="text-sm"
                                                        >
                                                            {ratio.label}
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </Tabs>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="p-4 border-t border-stone-200 bg-white w-full">
                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}