import { allPlaylists, songs as allSongs } from "../../lib/data"

export async function GET(req, res) {
    console.log("antes de ejecutar")
    const { url } = req
    console.log("url", url)
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')
    console.log("id", id)
    //busco la playlist con la q se obtuvo el id
    const playlist = allPlaylists.find(playlist => playlist.id === id)
    const songs = allSongs.filter(song => song.albumId === playlist?.albumId)

    console.log("playlist aPI", playlist)
    console.log("songs API", songs)

    return new Response(JSON.stringify({ playlist, songs }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}