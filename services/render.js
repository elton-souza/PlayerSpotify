export function render(album, art, music, state){
    document.querySelector('[data-container]').classList.add('bloco-player')

    const divPlayer = document.querySelector('[data-player="music"]')
    const divFuncoesPlayer = document.querySelector('[data-player="funcoes"]')

    const info = `<img class="music-album" src="${album}">
                <span class="music-name">${music} - ${art}<span>`
                
    const functions = 
    `<button class="button button-previus" data-buttonPrevius></button>
    <button class="button" data-buttonPlayer></button>
    <button class="button button-next" data-buttonNext></button>
    <div class="functionVolume">
        <img src="./img/icon-speaker.svg" class="speaker">
        <input class="volume" type="range" min="0" max="100"  data-volume>
        <img src="./img/icon-speaker2.svg" class="speaker">
    </div>
    `
    divPlayer.innerHTML = info  
    divFuncoesPlayer.innerHTML = functions

    //Alterando estilo do botao de acordo com o estado do player
    const buttonPlayer = document.querySelector('[data-buttonPlayer]')
    if(state.paused){
        buttonPlayer.classList.add('button-play')
        buttonPlayer.dataset.buttonplayer = "play"
    }else{
        buttonPlayer.classList.add('button-pause')
        buttonPlayer.dataset.buttonplayer = "pause"
    } 
}