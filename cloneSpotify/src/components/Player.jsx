import { useState,useRef, useEffect } from 'react';
import { usePlayStore } from '../store/playStore';
import { Slider } from './Slider';

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
    const {isPlaying, setIsPlaying, currentMusic, setCurrentMusic} = usePlayStore(state => state)//el state state es para traerme todo del usePlayStpre
    const audioRef = useRef()
    const volumeRef = useRef(1)

    useEffect(() => {
        isPlaying ? audioRef.current.play() : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        const {playlist, song, songs} = currentMusic
        if(song){
            const src = `/music/${playlist?.id}/0${song.id}.mp3`
            audioRef.current.volume = volumeRef.current
            audioRef.current.src = src
            audioRef.current.play()
        }
    }, [currentMusic])

    const CurrentSong = ({ image,title,artists }) => {
        console.log(image, title)
        return (
         <div className="flex items-center gap-5 relative overflow-hidden">
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>
            <div className="flex flex-col">
            <h3 className="font-bold block">
                {title}
            </h3>
            <span className="text-xs opacity-80">
                {artists?.join(', ')}
            </span>
            </div>
         </div>   
        )
    }

    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <div>
                <CurrentSong {...currentMusic.song} />
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="p-2 bg-gray-200 rounded-full" onClick={handleClick}  >
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>

            <div className='grid place-content-center'>
                <Slider 
                    defaultValue={[100]}
                    min={0}
                    max={100}
                    className="w-24"
                    onValueChange={(value) => {
                        const [newValue] = value
                        const volumeValue = newValue / 100
                        volumeRef.current = volumeValue
                        audioRef.current.volume = volumeValue
                    }}
                    
                
                />
            </div>
            <audio ref={audioRef}/>
        </div>
    );
}