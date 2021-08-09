(()=>{
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQCZk3V5fz9suNfc9FO9STMxHWPwbadx71fXePk4NtAKIkiSzcTprya0-hDjIBF8TA7Q53DEnBww9Xa0y3dYAnNP1r7j0uyWHYYN--IeWUMmsL4Xz06oR08IHmH61aX5CO8huQMBKgacZWN5EkQceIylt_hcLsA7ulwT5iuNUJlRl4OaGifM1DM';
        const player = new Spotify.Player({
            name: 'App',
            getOAuthToken: cb => {
                cb(token);
            }
        });
        // Conectar player!
        player.connect()
        // Alterações no player e renderizar musicas do player
        player.addListener('player_state_changed', state => {
            let art = ""
            const music = state.track_window.current_track.name
            const artista = state.track_window.current_track.artists
            const album = state.track_window.current_track.album.images[0].url
            artista.forEach(artista => {
                art += ` ${artista.name}`
            })
            render(album, art, music)
            funcoesPlayer()

            if(state.paused){
                document.querySelector('[data-buttonPlayer]').classList.add('button-play')
            }else{
                document.querySelector('[data-buttonPlayer]').classList.add('button-pause')
            } 
            
        });

        function funcoesPlayer(){
            // Ações de avançar ou retrocer a musica
            const buttonPlayer = document.querySelector('[data-buttonPlayer]')
            console.log(buttonPlayer)
            buttonPlayer.addEventListener('click', (btn)=>{
            const botao = btn.target
            console.log(botao)
            if(botao.dataset.buttonplayer == "pause"){
                botao.dataset.buttonplayer = "play"
                player.pause()
            }
            else if(botao.dataset.buttonplayer == "play"){
                botao.dataset.buttonplayer = "pause"
                player.resume()
            }
            })

        // Pausar ou continuar a música
            const next = document.querySelector('[data-buttonNext]')
            next.addEventListener('click', ()=>{
            player.nextTrack()
            })
            const previus = document.querySelector('[data-buttonPrevius]')
            previus.addEventListener('click', ()=>{
            player.previousTrack()
            })
        }
    };
    
    function render(album, art, music){
        const content1 = `<img class="music-album" src="${album}">
                    <span class="music-name">${music} - ${art}<span>`
                    
        const content2 = `<button class="button button-previus" data-buttonPrevius></button>
        <button class="button" data-buttonPlayer="pause"></button>
        <button class="button button-next" data-buttonNext></button>`
    
    
        const divPlayer = document.querySelector('[data-player="music"]')
        divPlayer.innerHTML = content1
        
        const divFuncoesPlayer = document.querySelector('[data-player="funcoes"]')
        divFuncoesPlayer.innerHTML = content2
    }
})()