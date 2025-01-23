export function Info() {
    return (
        <div className="absolute top-0 left-0 z-50 p-4">
            <div className="flex flex-col pl-3 pr-5 py-2 bg-white rounded-full shadow-md text-sm font-semibold">
                <div className="flex items-center space-x-2">
                    <img src="/tailwind.svg" alt="Tailwind CSS logo" className="w-8 h-8" />
                    <div className="flex flex-col">
                    <h1>Tailwind Perspective</h1>
                    <p className="text-[9px] opacity-60 leading-none font-light">simple tailwind perspective tool</p>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}