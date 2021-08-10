import { funcoesPlayer } from "./services/playerFunctions.js";
import { render } from "./services/render.js";

(()=>{
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQDAUruCcazpOjL_oBj0pk75K4bidiZZKBsHnafIHZiewrvE0YK-C6ZeClju-w9zLQeqUwswAtyIudm3ySgYEzT1CIQ3x7tkb9T44GCy3sWpub6tRNnBrSL__HoaLg4mU41Si04VyO2TOCcBC2k43u8LnjaZKFC6-hgw5ij4yFw_x3WXW_PDvHo';
        const player = new Spotify.Player({
            name: 'App',
            getOAuthToken: cb => {
                cb(token);
            }
        })
        player.addListener('authentication_error', ({ message }) => { console.error(message); }); //Mensagem caso ocorra erro na autenticação
        player.addListener('ready', ({ device_id }) => {console.log('Ready with Device ID', device_id);})
        
        // Conectar player!
        player.connect()
        // Alterações no player
        player.addListener('player_state_changed', state => {
            console.log(state)
            let artistsName = ""
            const music = state.track_window.current_track.name
            const artists = state.track_window.current_track.artists
            const album = state.track_window.current_track.album.images[0].url
            
            artists.forEach(artists => {
                artistsName += ` ${artists.name}`
            })

            render(album, artistsName, music, state)
            funcoesPlayer(player)
        });
    };
})()