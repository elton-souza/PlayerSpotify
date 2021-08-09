(()=>{
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQDKOXfzCbbc0kNF4R2_UXZ3QrCQKWwzGaCEj14wx5xnw_mMNl8DODS2woH8DUNLN2FhYCvMutsQJ2eAQjt39jD_I-hf8KZ3CiM49wRQ6jxYm76dZYPh4D71XzhhUlnGPz5MA8kQcIcJRhOPv-jw7U7PbnMrlsxgDwNiOL3D--le6FcuYe-EMoo';
        const player = new Spotify.Player({
            name: 'App',
            getOAuthToken: cb => {
                cb(token);
            }
        });
        player.addListener('authentication_error', ({ message }) => { console.error(message); }); //Mensagem caso ocorra erro na autenticação
        player.addListener('ready', ({ device_id }) => {console.log('Ready with Device ID', device_id);})

        // Conectar player!
        player.connect()

        // Alterações no player
        player.addListener('player_state_changed', state => {
            let artistsName = ""
            const music = state.track_window.current_track.name
            const artists = state.track_window.current_track.artists
            const album = state.track_window.current_track.album.images[0].url
            const buttonPlayer = document.querySelector('[data-buttonPlayer]')
            
            artists.forEach(artists => {
                artistsName += ` ${artists.name}`
            })
            
            if(state.paused){
                document.querySelector('[data-buttonPlayer]').classList.add('button-play')
                buttonPlayer.dataset.buttonplayer = "play"
            }else{
                document.querySelector('[data-buttonPlayer]').classList.add('button-pause')
                buttonPlayer.dataset.buttonplayer = "pause"
            } 

            render(album, artistsName, music)
            funcoesPlayer()

        });

        function funcoesPlayer(){
            const buttonPlayer = document.querySelector('[data-buttonPlayer]')
        // Pausar ou continuar musica
            buttonPlayer.addEventListener('click', (btn)=>{
                const button = btn.target
                if(button.dataset.buttonplayer == "pause"){
                    player.pause()
                }
                else if(button.dataset.buttonplayer == "play"){
                    player.resume()
                }
            })

        // Proxima música
            const next = document.querySelector('[data-buttonNext]')
            next.addEventListener('click', ()=>{
                player.nextTrack()
            })
        // Musica anterir
            const previus = document.querySelector('[data-buttonPrevius]')
            previus.addEventListener('click', ()=>{
                player.previousTrack()
            })

        //Volume player
            const range = document.querySelector('[data-volume]')
            range.addEventListener('input', (input)=>{
                const volume = data.target.value
                player.setVolume(volume)
            })
        }
    };
    
    //Renderizar os objetos
    function render(album, art, music){
        document.querySelector('[data-container]').classList.add('bloco-player')

        const info = `<img class="music-album" src="${album}">
                    <span class="music-name">${music} - ${art}<span>`
                    
        const functions = `<button class="button button-previus" data-buttonPrevius></button>
        <button class="button" data-buttonPlayer></button>
        <button class="button button-next" data-buttonNext></button>
        <input class="volume" type="range" min="0" max="100" data-volume >
        `
        
    
        const divPlayer = document.querySelector('[data-player="music"]')
        divPlayer.innerHTML = info
        
        const divFuncoesPlayer = document.querySelector('[data-player="funcoes"]')
        divFuncoesPlayer.innerHTML = functions
    }
})()