window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQA0JKQ4OccoSqfAKRhKX0EFaceN3kMYcv-gEiw_0bUCpEH-xmYojl9dCg9nYwAdLz8jQpM7ntxB6RmTV7SeifoJM-4gWKDoOWGmxSEcO2qOYoEjQ_Ge7NTZhp4woODqcw7_sizGLdPk3BvN9ulbgtDosn9px-A84KKfULmhnWpuoHNi9lwbNZQ';
    const player = new Spotify.Player({
        name: 'Meu programa',
        getOAuthToken: cb => {
            cb(token);
        }
    });

    // Error handling
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

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log(state)
        let art = ""
        const music = state.track_window.current_track.name
        const artista = state.track_window.current_track.artists
        artista.forEach(artista => {
            art = artista.name
        })
        const p = document.querySelector('p')
        p.innerHTML = `${music} - ${art}`
    });

    // Ready
    player.addListener('ready', ({
        device_id
    }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({
        device_id
    }) => {
        console.log('Device ID has gone offline', device_id);
    });
    // Connect to the player!
    player.connect();


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
    const next = document.querySelector('[data-buttonNext]')
    next.addEventListener('click', ()=>{
        player.nextTrack()
    })
    const previus = document.querySelector('[data-buttonPrevius]')
    previus.addEventListener('click', ()=>{
        player.previousTrack()
    })

};