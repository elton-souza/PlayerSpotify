(()=>{
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQDKOXfzCbbc0kNF4R2_UXZ3QrCQKWwzGaCEj14wx5xnw_mMNl8DODS2woH8DUNLN2FhYCvMutsQJ2eAQjt39jD_I-hf8KZ3CiM49wRQ6jxYm76dZYPh4D71XzhhUlnGPz5MA8kQcIcJRhOPv-jw7U7PbnMrlsxgDwNiOL3D--le6FcuYe-EMoo';
        const player = new Spotify.Player({
            name: 'App',
            getOAuthToken: cb => {
                cb(token);
            }
        });
        console.log(player)
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('ready', ({ device_id }) => {console.log('Ready with Device ID', device_id);});
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
            const buttonPlayer = document.querySelector('[data-buttonPlayer]')
            if(state.paused){
                document.querySelector('[data-buttonPlayer]').classList.add('button-play')
                buttonPlayer.dataset.buttonplayer = "play"
            }else{
                document.querySelector('[data-buttonPlayer]').classList.add('button-pause')
                buttonPlayer.dataset.buttonplayer = "pause"
            } 
            
        });

        function funcoesPlayer(){
            // Ações de avançar ou retrocer a musica
            const buttonPlayer = document.querySelector('[data-buttonPlayer]')
            buttonPlayer.addEventListener('click', (btn)=>{
            const botao = btn.target
            console.log(botao)
            if(botao.dataset.buttonplayer == "pause"){
                player.pause()
            }
            else if(botao.dataset.buttonplayer == "play"){
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
        <button class="button" data-buttonPlayer></button>
        <button class="button button-next" data-buttonNext></button>`
    
    
        const divPlayer = document.querySelector('[data-player="music"]')
        divPlayer.innerHTML = content1
        
        const divFuncoesPlayer = document.querySelector('[data-player="funcoes"]')
        divFuncoesPlayer.innerHTML = content2
    }
})()