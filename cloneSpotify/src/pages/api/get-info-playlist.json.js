import { allPlaylists, songs as allSongs } from "../../lib/data"

export async function GET(req, res) { 
    const { url } = req
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id') 
    //busco la playlist con la q se obtuvo el id
    const playlist = allPlaylists.find(playlist => playlist.id === id)
    const songs = allSongs.filter(song => song.albumId === playlist?.albumId)
    return new Response(JSON.stringify({ playlist, songs }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}