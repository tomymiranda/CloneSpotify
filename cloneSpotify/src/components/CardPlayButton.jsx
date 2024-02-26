import { Pause,Play } from "./Player"
import { usePlayStore } from "../store/playStore"
export const CardPlayButton = ({id}) => {
    const {currentMusic, 
            isPlaying, 
            setCurrentMusic, 
            setIsPlaying } = usePlayStore(state => state)
    
    
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id
    
    const handleClick = () => {
        if(isPlayingPlaylist){
            setIsPlaying(false)
            return
        }
        // hacerlo despues con async await 
        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const {songs, playlist} = data
            setIsPlaying(true)
            setCurrentMusic({songs, playlist, song: songs[0]})

        })
        
        console.log("songs", songs)
        console.log("playlist", playlist)
    }

    
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