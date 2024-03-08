import { Maximize, Minimize } from "lucide-react";


interface FullScreenInterface{
    isFullScreen: boolean;
    onToggle: () => void;
}


const FullScreenControl = ({isFullScreen , onToggle}: FullScreenInterface) => {
    const Icon = isFullScreen ? Minimize : Maximize 
    const Label = isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"
  return (
    <div className="flex items-center justify-center gap-4">
            <button  onClick={onToggle} className="text-white p-1.5 rounded-lg">
            <Icon className= "h-5 w-5" />
            </button>
    </div>
  )
}

export default FullScreenControl