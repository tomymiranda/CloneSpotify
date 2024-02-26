import { Pause,Play } from "./Player"
import { usePlayStore } from "../store/playStore"
export const CardPlayButton = ({id}) => {
    const {currentMusic, 
        isPlaying, 
        setCurrentMusic, 
        setIsPlaying } = usePlayStore(state => state)
    
    const handleClick = () => {
     setCurrentMusic({
            playlist: {
             id
            }
     })
     setIsPlaying(!isPlaying)       
    }

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id
    
    return (
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4">
            {isPlayingPlaylist
            ? <Pause onClick={() => setIsPlaying(false)} />
            : <Play onClick={() => {
                setIsPlaying(true)
            }} />
            }
        </button>
    )
}