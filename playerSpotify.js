window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQDd8oDHwEYApz3jmHFO4H_EP9UqtaPltIHiPxgTX_23Ptqit6wddw6tIVxn41HsJ1EBDXBHLM6SFWZWWB9OAjc04lT0Pq7UnRytirYTIoGElQJOI9MI4lQg78PIKYUYW-J9coeBxEfZDpf-mIVDoOlX2_Ra5_IhFnpBg2utjoFY-_CXw6IHgNk';
    const player = new Spotify.Player({
        name: 'App',
        getOAuthToken: cb => {
            cb(token);
        }
    });

    // Erros Gerados
    player.addListener('initialization_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('authentication_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('account_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('playback_error', ({
        message
    }) => {
        console.error(message);
    });
    // Player pronto para uso
    player.addListener('ready', ({
        device_id
    }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Player não pronto para uso
    player.addListener('not_ready', ({
        device_id
    }) => {
        console.log('Device ID has gone offline', device_id);
    });
    // Conectar player!
    player.connect();

    // Alterações no player e renderizar musicas do player
    player.addListener('player_state_changed', state => {
        console.log(state)
        let art = ""
        const music = state.track_window.current_track.name
        const artista = state.track_window.current_track.artists
        const album = state.track_window.current_track.album.images[0].url
        artista.forEach(artista => {
            art += ` ${artista.name}`
        })
        render(album, art, music)
    });

    // Ações de avançar ou retrocer a musica
    const buttonPlayer = document.querySelector('[data-buttonPlayer]')
    buttonPlayer.addEventListener('click', (btn)=>{
        const botao = btn.target
        console.log(botao.dataset)
        if(botao.dataset.buttonplayer == "play"){
            botao.dataset.buttonplayer = "pause"
            botao.innerText = "Pause"
            player.resume()
        }else if(botao.dataset.buttonplayer == "pause"){
            botao.dataset.buttonplayer = "play"
            botao.innerText = "Play"
            player.pause()
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

};

function render(album, art, music){
    const content1 = `<img src="${album}">
                <span>${music} - ${art}<span>`
                
    const content2 = `<button data-buttonPrevius> < </button>
    <button data-buttonPlayer="play"> Play </button>
    <button data-buttonNext> > </button>`


    const divPlayer = document.querySelector('[data-player="sobre"]')
    divPlayer.innerHTML = content1
    
    const divFuncoesPlayer = document.querySelector('[data-player="funcoes"]')
    divFuncoesPlayer.innerHTML = content2
}