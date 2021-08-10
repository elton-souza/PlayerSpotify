export function funcoesPlayer(player){
    
    // Pausar ou continuar musica
    const buttonPlayer = document.querySelector('[data-buttonPlayer]')
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
    
    // Musica anterior
    const previus = document.querySelector('[data-buttonPrevius]')
    previus.addEventListener('click', ()=>{
        player.previousTrack()
    })

    //Volume player
    const range = document.querySelector('[data-volume]') 
    range.addEventListener('input', (input)=>{
        let volume = input.target.value
        let volumePlayer = volume / 100
        player.setVolume(volumePlayer)
    })
    player.getVolume().then(volume => range.value = volume * 100)  
}