import { useState,useRef, useEffect } from 'react';
import { usePlayStore } from '../store/playStore';
export const Pause = () => (<svg 
height="24"
width="24"
role="img" 
aria-hidden="true" 
viewBox="0 0 16 16" 
fill="currentColor"
color='black' 

><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
);

export const Play = () => (<svg 
height="24"
width="24"
role="img" 
aria-hidden="true" 
viewBox="0 0 16 16" 
fill="currentColor"
color='black'  

><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>);

export const Player = ({}) => {
    //con esto remplazo el estado local por uno global y sincronizo estado de dos componentes
    const {isPlaying, setIsPlaying} = usePlayStore(state => state)//el state state es para traerme todo del usePlayStpre
    const audioRef = useRef()
    const [audio, setAudio] = useState(null)

    useEffect(() => {
        audioRef.current.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    }, [])

    const handleClick = () => {
        if(isPlaying) {
            audioRef.current.pause()
        } else {
        
        audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <div>
                cancion actual...
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="p-2 bg-gray-200 rounded-full" onClick={handleClick}  >
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>

            <div className='grid place-content-center'>
                Volumen
            </div>

            <audio ref={audioRef}/>
        </div>
    );
}